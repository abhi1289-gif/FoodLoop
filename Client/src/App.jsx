import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import About from './Pages/About'
import Login from './Pages/Login'
import PreRegister from './Pages/PreRegister'
import Hotel from './Pages/Register/Hotel'
import Charity from './Pages/Register/Charity'
import Volunteer from './Pages/Register/Volunteer'
import Food from './Pages/Food'
import AddFood from './Pages/AddFood'
import Main from './Pages/Main'
import Notifications from './Pages/Notifications'

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path='/' element={<Main/> }></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/preregister' element={<PreRegister/>}></Route>
        <Route path='/register/hotel' element={<Hotel/>}></Route>
        <Route path='/register/charity' element={<Charity/>}></Route>
        <Route path='/register/volunteer' element={<Volunteer/>}></Route>
        <Route path='/food' element={<Food/>}></Route>
        <Route path='/add-food' element={<AddFood/>}></Route>
        <Route path="/notifications"element={<Notifications />}></Route>
      </Routes>
    </div>
  )
}
