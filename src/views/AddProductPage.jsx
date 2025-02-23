import { useState } from "react";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { useNavigate } from "react-router";


export default function AddProductPage() {
    const navigate = useNavigate()
    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${baseUrl}/apis/branded-things/products`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data)
            navigate('/')
            Toastify({
                text: `Succeed add new data ${data.data.name}`,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right,rgb(99, 100, 100),rgb(0, 0, 0))",
                },
                onClick: function () { } // Callback after click
            }).showToast();

        } catch (err) {
            console.log(err)
            Toastify({
                text: err.response.data.error,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "red",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            
        }
    }

    return(
        <ProductForm nameProp="Add Product" button="Add" submit={handleSubmit}/>
    )
}