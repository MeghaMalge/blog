import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import Button from '../../atoms/Button';
import AppContext from '../../../context/AppContext';
import toast, { Toaster } from 'react-hot-toast';
import './navbar.css'

export default function Navbar() {
  let contextData= useContext(AuthContext)
  let contextAppData=useContext(AppContext)
  let navigate = useNavigate()

  const onClickHandler=()=>{
    contextData.setLoggedIn(false)
    sessionStorage.clear("login")
    toast.success("Logged out !")    
  }
  const showAllBlogs=()=>{
    navigate("/allBlogs")
    contextAppData.setMyBlogs(false)
  }
  const showMyBlogs=()=>{
    navigate("/myBlogs")
    contextAppData.setMyBlogs(true)
  }
  const addBlog=()=>{
    navigate("/addBlog")
  }
return (
      <div className='nav'>
        <Toaster/>
        <div className='flex gap-4'>
          <Button className="navLink" onClickHandler={showAllBlogs}>All Blogs</Button>
          {
            contextData.loggedIn && <div className='flex gap-4'>
                                      <Button className="navLink" onClickHandler={showMyBlogs}>My Blogs</Button>
                                      <Button className="navLink" onClickHandler={addBlog}>Add Blog</Button>
                                    </div>
          }
        </div>
        <div>
          {
            contextData.loggedIn ? <Link to="/"><Button className="navLink" onClickHandler={()=>{onClickHandler()}}>Logout</Button></Link>
                                 : <Link to="/auth"><Button className="navLink">Login or Signup</Button></Link>
          }
        </div>
      </div>
  )
}
