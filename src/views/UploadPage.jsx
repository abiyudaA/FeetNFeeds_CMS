import axios from "axios"
import { useNavigate, useParams } from "react-router"
import baseUrl from "../api/baseUrl"

export default function UploadPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    async function handleUpload(e) {
        e.preventDefault()
        try {
            // console.log(e)
            const images = e.target[0].files[0]
            // console.log(images)
            const formData = new FormData
            formData.append('file', images)

            const { data } = await axios.patch(`${baseUrl}/apis/branded-things/products/${id}`, formData, {
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

            navigate('/')

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

    return (
        <>
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="update-product-section"
            >
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="pt-3 pb-2 mb-3">
                            <form id="register-form" onSubmit={handleUpload}>
                                <h1 className="h3 mb-3 display-1">Update Image</h1>
                                {/* <div class="mb-3"> */}
                                <div className="input-group mb-3">
                                    <input
                                        type="file"
                                        className="form-control pb-2"
                                        id="inputGroupFile02"
                                        autoComplete="off"
                                        required=""
                                    />
                                </div>
                                <button
                                    className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                                    type="submit"
                                >
                                    Update Image
                                </button>
                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}