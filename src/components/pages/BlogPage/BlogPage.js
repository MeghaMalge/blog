import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import Img from '../../atoms/Img/Img';
import Comment from '../../molecules/Comment/Comment';
import Like from '../../molecules/Like/Like';
import CommentSection from '../../organisms/CommentSection/CommentSection';
import Navbar from '../../organisms/Navbar/Navbar';

export default function BlogPage() {
    let {id}=useParams();
    let contextData=useContext(AppContext) 
    const getData = async () => {
      let res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }, 
      })
        
    let blog = await res.json();  
      let res1 = await fetch(`http://localhost:3000/blog_details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },  
      })
       
    let blogDetails = await res1.json();
    let fullBlog = Object.assign(blog,blogDetails)
    contextData.setBlog(fullBlog)  
  }
    
  useEffect(() => {
    getData()
  },[])
    
  return (
    <div>
      <Navbar/>
      <div className='m-10'>
         <div>{contextData.blog.title}</div>
        { contextData.blog.likes && <Like blog={contextData.blog}></Like> }
        <Comment blog={contextData.blog}/>
        <Img src={contextData.blog.blog_img} alt={contextData.blog.title} />
        <div dangerouslySetInnerHTML={{ __html: contextData.blog.content }}></div>
        <CommentSection comments={contextData.blog.comments}/> 
      </div>
    </div>
  )
}
