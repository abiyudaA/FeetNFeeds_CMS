import axios from "axios"
import { useEffect, useState } from "react"
import baseUrl from "../api/baseUrl"
import { useNavigate } from "react-router"
import Button from "../components/Button"


export default function AddUserPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    })
    const navigate = useNavigate()

    function handleInput(fieldName, e) {
        let value = e.target.value

        setForm((oldValue) => {
            return {
                ...oldValue,
                [fieldName]: value

            }
        })
    }

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${baseUrl}/apis/add-user`, form, {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
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
    // useEffect(() => {
    //     console.log(form)
    // })

    return (
        <>
            {/* AddUser */}
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="new-user-section"
            >
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="pt-3 pb-2 mb-3 border-bottom">

                            <form id="register-form" onSubmit={ (e) => handleSubmit(e, form) }>
                                <h1 className="h3 mb-3 display-1">Register User</h1>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="register-username">Username</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="register-username"
                                        placeholder="Enter username ..."
                                        autoComplete="off"
                                        required=""
                                        onChange={(e) => handleInput('username', e)}
                                        value={form.username}

                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="register-email">Email</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="register-email"
                                        placeholder="Enter email address ..."
                                        autoComplete="off"
                                        required=""
                                        onChange={(e) => handleInput('email', e)}
                                        value={form.email}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="register-password">Password</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="register-password"
                                        placeholder="Enter password ..."
                                        autoComplete="off"
                                        required=""
                                        onChange={(e) => handleInput('password', e)}
                                        value={form.password}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-phone">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="register-phone"
                                        placeholder="Enter phone number (optional) ..."
                                        autoComplete="off"
                                        onChange={(e) => handleInput('phoneNumber', e)}
                                        value={form.phoneNumber}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="register-address">Address</label>
                                    <textarea
                                        id="register-address"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Enter address (optional) ..."
                                        autoComplete="off"
                                        defaultValue={""}
                                        onChange={(e) => handleInput('address', e)}
                                        value={form.address}
                                    />
                                </div>
                                <Button nameProp="Add" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}