import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"
import axios from 'axios'
import baseUrl from "../api/baseUrl";

export default function Table({ product, index, fetchProducts }) {
    const [rupiah, setRupiah] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function formatedPrice() {
        const formated = product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        setRupiah(formated)
    }
    
    

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${baseUrl}/apis/branded-things/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

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
            fetchProducts()
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        formatedPrice()
    }, [])

    return (
        <>
            {/* Table */}

            <tr key={product.id}>
                <td scope="row">#{index + 1}</td>
                <td className="fw-bold">{product.name}</td>
                <td>
                    <img
                        src={product.imgUrl}
                        className="img-fluid"
                    />
                </td>
                <td>{product.description.length > 75 ? product.description.substring(0, 75) + '...' : product.description}</td>
                <td>{product.stock}</td>
                <td className="fw-bold">{rupiah}</td>
                <td>{product.User.email}</td>
                <td>
                    <span className="d-flex">
                        <button onClick={handleDelete} type="button" className="btn btn-link">
                            <span className="icon material-symbols-outlined text-danger pe-auto">
                                delete
                            </span>
                        </button>

                        <Link to={`/edit/${product.id}`}>
                        <button type="button" className="btn btn-link">
                            <span className="icon material-symbols-outlined text-danger">
                                edit
                            </span>
                        </button>
                        
                        </Link>
                        <button type="button" className="btn btn-link" onClick={() => navigate(`/upload/${product.id}`)}>
                            <span className="icon material-symbols-outlined text-danger">
                                image
                            </span>
                        </button>
                    </span>
                </td>
            </tr>

        </>
    )
}