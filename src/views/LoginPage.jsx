import { useEffect, useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router"
import baseUrl from "../api/baseUrl"


export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     // console.log(email)
    //     // console.log(password)
    // //   console.log(localStorage)
    // })

    useEffect(() => {
        if (localStorage.access_token) {
            Toastify({
                text: "You already logged in",
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
            navigate('/')
        }
    }, [navigate])

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/login`, { email, password })
            localStorage.setItem('access_token', data.data.access_token)

            navigate('/')
            Toastify({
                text: 'Succeed login',
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
            console.log(err.response.data.error)
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

    return (
        <section className="container" id="login-section">
            <div className="row">

                <div className="col-12 text-center">
                    <h1 className="mb-3 mt-5">Feet&Feeds <br />
                        Content Management System
                    </h1>
                </div>

                <div className="col-12 col-lg-8 offset-lg-2 my-5">
                    <div className="row">
                        <div className="col-12 col-md-6 border-end p-5 text-left">
                            <img
                                src="https://res.cloudinary.com/dfgncd6sq/image/upload/v1739978043/FeetNFeeds_Store.png"
                                width="100%"
                                alt="sofa"
                            />
                        </div>
                        <div className="col-12 col-md-6 p-5 text-left">
                            <div className="form-signin m-auto">

                                <form id="login-form" onSubmit={handleLogin}>
                                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                                    <span>
                                        Log in on your profile to autocomplete your purchase order with
                                        your personal data.
                                    </span>
                                    <div className="mb-3 mt-3">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="login-email">Email</label>
                                            <label className="text-danger text-end fw-bold">*</label>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="login-email"
                                            placeholder="Enter email address ..."
                                            autoComplete="off"
                                            required=""
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="login-password">Password</label>
                                            <label className="text-danger text-end fw-bold">*</label>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="login-password"
                                            placeholder="Enter your password ..."
                                            autoComplete="off"
                                            required=""
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                                        type="submit"
                                    >
                                        Log In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}