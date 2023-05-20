import { NavLink, useNavigate } from "react-router-dom";

import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "./auth/authSlice";

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // useEffect(()=>{
    //     let user = sessionStorage.getItem('user');
    //     if (user==='' || user===null){
    //         navigate('/login')
    //     }
    // },[])

    function logout() {
        if (user) {
            axios
                .post('https://medicalstore.mashupstack.com/api/logout', {}, {
                    headers: { 'Authorization': "Bearer " + user.token }
                })
                .then(() => {
                    dispatch(removeUser());
                    navigate('/login');
                })
                .catch(error => {
                    // Handle the error, e.g., display an error message
                });
        }
    }

    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>Medicine Store</h4>
        </div>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
            className="collapse navbar-collapse mr-auto"
            id="navbarNav"
            style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item">
                    <NavLink
                        to={"/"}
                        className={
                            'nav-link ' +
                            (status => status.isActive ? 'active' : '')
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {user ? <li className="nav-item">
                    <NavLink
                        onClick={logout}
                        className={
                            'nav-link ' +
                            (status => status.isActive ? 'active' : '')
                        }
                    >
                        Log Out
                    </NavLink>
                </li> :
                    <li className="nav-item">
                        <NavLink
                            to={"/login"}
                            className={
                                'nav-link ' +
                                (status => status.isActive ? 'active' : '')
                            }
                        >
                            Log In
                        </NavLink>
                    </li>}

            </ul>
        </div>
    </nav>;
}

export default Navbar;