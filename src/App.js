import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage/HomePage'
import AuthPage from './components/pages/AuthPage/AuthPage'
import BlogList from './components/organisms/BlogList/BlogList'
import AuthContext from './context/AuthContext'
import BlogPage from './components/pages/BlogPage/BlogPage'

export default function App() {
  let contextData= useContext(AuthContext)

  if(sessionStorage.getItem("login")){
    contextData.setLoggedIn(true)
  }
  return (
    <div className='bg-slate-200 min-h-screen'>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}>
            <Route path='/:id' element={<BlogList/>}/> 
        </Route>
        <Route path='auth' element={<AuthPage/>}/> 
        <Route path="blog/:id" element={<BlogPage/>}/>
      </Routes>
    </div>
  )
}
