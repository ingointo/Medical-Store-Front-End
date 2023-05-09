import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
function Edit() {
  const user = useSelector(store => store.auth.user)
  const config = {
    headers:
      { 'Authorization': 'Bearer ' + user.token }
  }
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine/' + id, config)
      .then(res => {
        setData(res.data);
        console.log(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('https://medicalstore.mashupstack.com/api/medicine/' + id, data, config)
      .then(res => {
        toast.success('Data successfully updated');
        navigate('/');
      })
      .catch(err => {
        console.log(err)
        toast.warning(err.response.data.errors)
      })
  }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center p-5'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>ID:</label>
            <input
              type='text'
              disabled
              name='name'
              value={data.id}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='name'>Medicine Name:</label>
            <input
              type='text'
              name='name'
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='email'>Med-Company</label>
            <input
              type='text'
              name='email'
              value={data.company}
              onChange={e => setData({ ...data, company: e.target.value })}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='email'>Expiry Date</label>
            <input
              type='text'
              name='email'
              value={data.expiry_date}
              onChange={e => setData({ ...data, expiry_date: e.target.value })}
              className='form-control'
            />
          </div>
          <br />
          <button className='btn btn-info'>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Edit;
