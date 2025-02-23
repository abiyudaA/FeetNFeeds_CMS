import { useEffect, useState } from "react"
import axios from 'axios'
import baseUrl from "../api/baseUrl"
import { Link } from "react-router"
import Button from "./Button"

export default function ProductForm({ nameProp, button, submit, product }) {

    const [category, setCategory] = useState([])

    const [form, setForm] = useState({
        name: '',
        categoryId: null,
        description: '',
        stock: null,
        price: null,
        imgUrl: ''
    })

    async function handleInput(fieldName, e) {
        let value = e.target.value
        // console.log(value)
        if (fieldName === 'price' || fieldName === 'stock' || fieldName === 'categoryId') {
            value = +e.target.value
        }
        setForm((oldValue) => {
            return {
                ...oldValue,
                [fieldName]: value

            }
        })


    }

    // useEffect(() => {
    //     console.log(form)
    // })

    async function fetchCategories() {

        try {

            const { data } = await axios.get(`${baseUrl}/apis/branded-things/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCategory(data.data)

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (product) {
            delete product?.authorId
            delete product?.createdAt
            delete product?.updatedAt
            delete product?.id
            delete product?.Category
            delete product?.User

            setForm((oldValue) => {
                return {
                    ...oldValue,
                    ...product
                }
            })
        }
    }, [product])

    return (
        <>
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="new-product-section"
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">{nameProp}</h1>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">

                        <form id="product-form" onSubmit={(e) => submit(e, form)}>
                            <div className="mb-3">
                                <label htmlFor="product-name">
                                    Name <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product-name"
                                    placeholder="Enter product name"
                                    autoComplete="off"
                                    required=""
                                    value={form?.name}
                                    onChange={(e) => handleInput("name", e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-category">
                                    Category <span className="text-danger fw-bold">*</span>
                                </label>
                                <select
                                    id="product-category"
                                    className="form-select"
                                    required=""
                                    onChange={(e) => handleInput("categoryId", e)}
                                    value={form?.categoryId}
                                >
                                    <option value="select"
                                        >
                                        -- Select Category --
                                    </option>
                                    {category.map(e => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.name}</option>
                                        )
                                    })}


                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-desc">
                                    Description <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product-desc"
                                    placeholder="Enter product description"
                                    autoComplete="off"
                                    required=""
                                    value={form?.description}
                                    onChange={(e) => handleInput("description", e)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="product-stock">
                                            Stock <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="product-stock"
                                            placeholder="Enter product stock"
                                            value={form?.stock}
                                            onChange={(e) => handleInput("stock", e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="product-price">
                                            Price <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="product-price"
                                            placeholder="Enter product price"
                                            value={form?.price}
                                            onChange={(e) => handleInput("price", e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-image">Image</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product-image"
                                    placeholder="Enter product image url"
                                    autoComplete="off"
                                    value={form?.imgUrl}
                                    onChange={(e) => handleInput("imgUrl", e)}
                                />
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-6">
                                    <Link to={'/'}>
                                    <Button nameProp="Cancel" />
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Button nameProp={button} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}