import React, { useContext, useEffect, useState } from 'react'
import LikeButton from '../../atoms/LikeButton/LikeButton';
import AuthContext from '../../../context/AuthContext';

export default function Like({blog}) {
    // console.log(blog)
    let contextData = useContext( AuthContext )
  const updateLikes = async (updatedLikes) => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {   likes: updatedLikes }
      )
    })
    let data = await res.json();
    // console.log(data)

  }
  let arr
  let [isLiked, setIsLiked] = useState( false )
  useEffect(()=>{
    setIsLiked(blog?.likes.filter( like => like == sessionStorage.getItem( "user-id" ) ).length ? true : false)
  },[blog.likes])
  const likeBlog = () =>{

    // console.log("clicked")
   
    if( isLiked ) {
      setIsLiked( false )
      arr = blog?.likes?.filter( like => { return like != sessionStorage.getItem( "user-id" ) }  )
    } else {
      setIsLiked( true )
      arr= blog.likes 
      arr.push( parseInt(sessionStorage.getItem("user-id"))) 
    }

    function removeDuplicates(arr) {  return [...new Set(arr)];    }
    // function removeDuplicates(blog.likes) {  return [...new Set(blog.likes)];    }
    blog.likes=removeDuplicates(arr)
    updateLikes(removeDuplicates(arr)) 
  }
  // function removeDuplicates(blog.likes) {  return [...new Set(arr)];    }
  // console.log(blog.likes)
  return (
    <>
        <div>
          {blog?.likes.length}
        </div>
        <LikeButton liked={isLiked} onClickHandler={likeBlog} disabled={!contextData.loggedIn}>Like</LikeButton> 
    </>
    
  )
}
