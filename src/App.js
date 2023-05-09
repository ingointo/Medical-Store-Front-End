import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFromLocalStorage } from './auth/authSlice';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

function App() {
  const user = useSelector(store => store.auth.user);
  const config = {
    headers: {
      'Authorization': 'Bearer ' + (user ? user.token : '')
    }
  };
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function fetchPosts() {
    if (!user || !user.token) {
      // Handle authentication error, navigate to login page, or display an error message
      navigate('/login');
      return;
    }

    axios.get('https://medicalstore.mashupstack.com/api/medicine', config)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }

  function deleteData(id) {
    console.log(id);
    console.log('****************************');
    axios.delete('https://medicalstore.mashupstack.com/api/medicine/'+id, config)
      .then(() => {
        toast.success('Successfully deleted');
        fetchPosts(); // Fetch posts again after successful deletion
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUserFromLocalStorage());
      fetchPosts(); // Fetch posts when component mounts
    } else {
      // Handle authentication error, navigate to login page, or display an error message
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-end">
        <Link to="/medicine/list/search" className="btn btn-info ml-4 mx-1">@Search Medicine</Link>
          <Link to="/create" className="btn btn-primary">
            Add +
          </Link>
        </div>
        <table className="table" id="productsTable">
          <thead>
            <tr>
              <th>id</th>
              <th>Medicine Name</th>
              <th>Med-Company</th>
              <th>Detail View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.company}</td>
                <td>
                  <Link to={`/view/${d.id}`} className="btn btn-sm btn-info ms-1">
                    View
                  </Link>
                </td>
                <td>
                  <Link to={`/update/${d.id}`} className="btn btn-sm btn-success">
                    Update
                  </Link>
                  <button onClick={() => deleteData(d.id)} className="btn btn-sm btn-danger ms-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
