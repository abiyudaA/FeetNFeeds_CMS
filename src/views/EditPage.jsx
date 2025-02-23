import ProductForm from "../components/ProductForm";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";


export default function UpdatePage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState()

    async function fetchProduct(params) {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/branded-things/products/${id}`, {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setProduct(data.data)
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

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${baseUrl}/apis/branded-things/products/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(data)
            navigate('/')
            Toastify({
                text: data.message,
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

    useEffect(() => {
        fetchProduct()
    },[])

    return (
        <ProductForm nameProp="Edit Product" button="Edit" submit={handleSubmit} product={product}/>
    )
}