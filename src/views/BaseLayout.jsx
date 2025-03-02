import { Outlet, useNavigate } from 'react-router'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'


export default function BaseLayout() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.access_token) {
            Toastify({
                text: "Please login first",
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
            navigate('/login')
        }
    }, [navigate])

    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
        </>
    )
}