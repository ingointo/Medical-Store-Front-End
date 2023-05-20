import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { setUser } from "./auth/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // useEffect(()=> {
  //   sessionStorage.clear();
  // },[])

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post('https://medicalstore.mashupstack.com/api/login', {
          email: email,
          password: password
        })
        .then((res) => {
          var user = {
            email: email,
            token: res.data.token
          }
          dispatch(setUser(user))
          navigate('/')
        })
        .catch(error => {
          if (error.response.data.errors) {
            toast.warning(Object.values(error.response.data.errors).join(' '))
          } else if (error.response.data.message) {
            toast.warning(error.response.data.message)
          } else {
            toast.warning('Failed to login user. Please contact admin')
          }
        })
    }
  };
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Pleaser Enter User Name");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Pleaser Enter Password");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6 mt-5">
        <form onSubmit={proceedLogin}>
          <div className="card-header">
            <h2>User Login</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="email">
                User Name <span className="errmsg"></span>
              </label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="errmsg"></span>
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-footer mt-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success ms-2" to={"/signup"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
