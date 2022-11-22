import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import Button from '../../atoms/Button'
import Img from '../../atoms/Img/Img'
import {Link, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {getAllBlogs} from '../../../redux/actions/blogs.action';
import Like from '../Like/Like'
import Comment from '../Comment/Comment'
import toast, { Toaster } from 'react-hot-toast'
import { format } from 'date-fns'

export default function Blog({blog}) {
  let contextData = useContext( AuthContext )
  let {id}=useParams()
  let dispatch=useDispatch()
  let userId=parseInt(sessionStorage.getItem("user-id"))
   
  const deleteBlog = async() => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let data = await res.json();

    let res1 = await fetch(`http://localhost:3000/blog_details/${blog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
     
    })
    let data1 = await res1.json();

    data && data1 && toast.success("Blog deleted !")

    dispatch(getAllBlogs("allBlogs",userId))
    dispatch(getAllBlogs("myBlogs",userId))
  }
  
  return ( 
    <div className='flex justify-between p-5 shadow-2xl shadow-slate-400'>
      <Toaster/>
      <div className='w-3/4 min-h-40 m-3'>
        <Link to={"/blog/"+blog.id}>
          <h2 className='text-xl my-3'> {blog.title} </h2>
        </Link>
        <div className='flex gap-4 items-center'>
          <div className='text-sm text-slate-700'>Posted on { format( new Date( blog.date_created ), 'dd-mm-yyyy' ) }</div>
          <div className='flex gap-4'>
            {
              blog.category.map( cat => <span className='px-4 py-1 rounded-full bg-slate-300'>{cat}</span> )
            }
          </div>
        </div>
        <div className='flex gap-4'>
          { contextData.loggedIn && <span><Like blog={blog}></Like> <Comment blog={blog}/></span> }
          { id==="myBlogs" && <Button onClickHandler={deleteBlog} disabled={!contextData.loggedIn}>delete</Button> }
        </div>
      </div>
      <Img src={blog.blog_img} alt={blog.title}  width='200px'/>
    </div>
  )
}