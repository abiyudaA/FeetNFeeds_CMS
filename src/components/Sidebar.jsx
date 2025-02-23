import { Link, NavLink, useNavigate } from 'react-router'

export default function Sidebar() {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            {/* sidebar */}
            <nav
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
                id="sidebar-menu"
            >
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <NavLink to={'/'}>
                            <li className="nav-item nav-link" id="nav-product">

                                <span className="icon material-symbols-outlined me-2">
                                    shopping_bag
                                </span>
                                Products

                            </li>
                        </NavLink>

                        <NavLink to={'/categories'} >
                            <li className="nav-item nav-link" id="nav-category">

                                <span className="icon material-symbols-outlined me-2">
                                    category
                                </span>
                                Categories

                            </li>
                        </NavLink>

                        <NavLink to={'/addUser'} >
                            <li className="nav-item nav-link">

                                <span className="icon material-symbols-outlined me-2">
                                    account_circle
                                </span>
                                Add User

                            </li>
                        </NavLink>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <span>Account</span>
                    </h6>
                 
                        <button type="button" className="nav flex-column btn btn-link nav-item nav-link" id="nav-logout" onClick={handleLogout}>

                            <span className="icon material-symbols-outlined me-2">
                                logout
                            </span>
                            Logout

                        </button>


                </div>
            </nav>
        </>
    )
}