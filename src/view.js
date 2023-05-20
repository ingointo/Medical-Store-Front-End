import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import './view.css'
function Edit() {
  const navigate = useNavigate()
  const user = useSelector(store => store.auth.user)
  const config = {
    headers:
      { 'Authorization': 'Bearer ' + user.token }
  }
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!user || !user.token) {
      navigate('/login')
    } else {

      axios
        .get('https://medicalstore.mashupstack.com/api/medicine/' + id, config)
        .then(res => {
          console.log(res)
          setData(res.data);
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const expiry = (expiryDate) => {
    const date = new Date();
    const medExpiry = new Date(expiryDate);
    return medExpiry < date;
  }

  const expiryMedicine = expiry(data.expiry_date) ? "text-danger" : "text-success";


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>Medicine View</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header ">
                <h3 className='text-black'>Med Name: {data.name}</h3>
              </div>
              <div className="card-body text-black">
                Company: {data.company}
              </div>
              <div className={` card-footer card-expiry ${expiryMedicine}`}>
                Expiry-Date: {data.expiry_date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
