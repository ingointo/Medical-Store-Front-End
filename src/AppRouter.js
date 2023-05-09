import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Add from './Add'
import Edit from './Edit'
import Login from './Login'
import Signup from './Register'
import View from './view'
import Search from './Search'



function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/create' element={<Add />} />
                <Route path='/update/:id' element={<Edit />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/view/:id' element={<View/>} />
                <Route path='/medicine/list/search' element={<Search/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter