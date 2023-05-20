import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Add() {

    const [inputData, setInputData] = useState({})
    const user = useSelector(store => store.auth.user)

    console.log(user)
    const navigate = useNavigate()
    const config = {
        headers:
            { 'Authorization': 'Bearer ' + user.token }
    }
    function handleSubmit(event) {
        event.preventDefault()
        axios.post('https://medicalstore.mashupstack.com/api/medicine', inputData, config)
            .then(res => {
                alert('Data added successfully')
                navigate('/')
            }).catch(err => console.log(err.message))
    }
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center p-5'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>ID:</label>
                        <input type='text' disabled name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, id: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='name'>Medicine Name:</label>
                        <input type='text' name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='name'>Medicine Brand</label>
                        <input type='text' name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, company: e.target.value })} />
                    </div><br />
                    <div>
                        <label htmlFor='name'>Medicine Expiry Date</label>
                        <input type='number' name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, expiry_date: e.target.value })} />
                    </div><br />
                    <button className='btn btn-info'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Add