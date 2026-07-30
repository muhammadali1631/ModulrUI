import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyComponents from './pages/MyComponents'
import AllComponents from './pages/AllComponents'
import AdminDashboard from './pages/AdminDashboard'
import Pricing from './pages/Pricing'
import { useDispatch, useSelector } from 'react-redux'
import { setAllComponents, setAllUsers, setUserData } from './redux/userSlice'
import Generate from './pages/Generate'
import axios from 'axios'
import "./App.css";
import FixedIcon from './components/FixedIcon'

export const ServelUrl = "http://localhost:8000"
function App() {
  
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=> state.user)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServelUrl + '/api/user/current-user', {withCredentials:true})
        dispatch(setUserData(res.data))
        setAuthChecked(true)
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
        setAuthChecked(true)
      }
    }
    fetchUser()
  }, [])
  

  useEffect(() => {
    if(!userData) return;
    const fetchAllUser = async () => {
      try {
        const usersRes = await axios.get(ServelUrl + '/api/user/all-users', {withCredentials:true})
        dispatch(setAllUsers(usersRes.data))
        console.log(usersRes.data)
      } catch (error) {
        console.log(error)
        dispatch(setAllUsers(null))
      }
    }


    const fetchAllComponents = async () => {
      try {
        const componentsRes = await axios.get(ServelUrl + '/api/component/all-components', {withCredentials:true})
        dispatch(setAllComponents(componentsRes.data))
        console.log(componentsRes.data)
      } catch (error) {
        console.log(error)
        dispatch(setAllComponents(null))
      }
    }

    fetchAllUser()
    fetchAllComponents()
  }, [userData, dispatch])
  


  return (
    <>
    {!authChecked && <div className='fixed top-0 left-0 w-full h-1 bg-[#35ebff] animate-pulse z-50'>
      </div>}
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/generate' element={<Generate/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/components' element={<AllComponents/>}/>
        <Route path='/my-components' element={<MyComponents/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
      </Routes>
      <FixedIcon/>
    </div>
    </>
  )
}

export default App
