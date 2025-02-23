import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Table from "../components/Table";
import gifLoading from '../components/assets/Double Ring@1x-1.0s-200px-200px.svg'
import { Link, useNavigate } from "react-router";


export default function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/apis/branded-things/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // console.log(data)
            setProducts(data.data)
        } catch (err) {
            console.log(err);
            if (err.response.data.error === 'Access token expired, please re-login'){
                navigate('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <section className="container-fluid" id="home-section">
                <div className="row">
                    <>
                        {/* HomePage */}
                        <section
                            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                            id="product-section"
                        >


                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="display-2">Products</h1>
                                <Link to={'/addProduct'} >
                                    <button className="btn btn-primary rounded-pill" id="new-product">
                                        <span className="icon material-symbols-outlined">add</span>New
                                        Product
                                    </button>
                                </Link>
                            </div>


                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center vh-100">
                                    <img src={gifLoading} className="w-1/5" />
                                </div>

                            ) : (
                                <div className="row">
                                    <div className="col-12 table-responsive">
                                        <table className="table align-middle">
                                            {/* tableHead */}
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col" width="180px">
                                                        Image
                                                    </th>
                                                    <th scope="col" width="250px">
                                                        Description
                                                    </th>
                                                    <th scope="col">Stock</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Author</th>
                                                    <th scope="col" width="50px" />
                                                </tr>
                                            </thead>

                                            <tbody id="table-product">

                                                {/* Data here */}
                                                {products.map((p, idx) => {
                                                    return (
                                                        <Table key={p.id} product={p} index={idx} fetchProducts={fetchProducts} />
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </section>
                    </>
                </div>
            </section>
        </>
    )
}