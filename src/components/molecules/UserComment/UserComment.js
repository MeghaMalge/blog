import React, { useEffect, useState } from 'react'
import Button from '../../atoms/Button';

export default function UserComment({comment, deleteComment, user, getUser}) {
  // getUser(comment.userId)
  useEffect(()=>{
    getUser(comment.userId)
    
  },[])

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <div className='flex gap-4'>
   
            <div>{user?.name}</div>
            <div>{comment?.content}</div>
            {
              user.id === parseInt(sessionStorage.getItem("user-id")) && <Button onClickHandler={()=>{deleteComment(comment)}}>Delete</Button>
            }
    
    </div>
  )
}
