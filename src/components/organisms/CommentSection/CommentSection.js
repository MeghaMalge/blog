import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input/Input'
import UserComment from '../../molecules/UserComment/UserComment'
import {useParams} from 'react-router-dom';
import AppContext from '../../../context/AppContext';

export default function CommentSection({comments}) {
    let contextData = useContext( AppContext )

    // console.log(comments)
    let {id} = useParams()
    let [displayComments, setDisplayComments] = useState(comments)
    useEffect(()=>{
        setDisplayComments(comments)
    },[comments])
    const postComment = async(commentArray) => {
        let res = await fetch(`http://localhost:3000/blog_details/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {   comments: commentArray }
        )
        })
        let data = await res.json();
        // console.log(data.comments)
        setDisplayComments(data.comments)
        setNewComments(data.comments)
    }

    let [comment, setComment] = useState("")
    let [newComments, setNewComments] = useState([])
    
    let commentArray = comments
    const addComment = () => {
        getUser( parseInt(sessionStorage.getItem( "user-id" )) )
        let newComment = {
            userId : parseInt(sessionStorage.getItem("user-id")),
            content : comment,
            date_posted : new Date()
        }
        commentArray.push( newComment )
        // console.log( commentArray )
        postComment(commentArray)
        contextData.ref.current.value = ""
    }

    // const deleteComment = (com) => {
    //     postComment(comments.filter( item => item !== com ))
    // }

    const deleteComment=(c)=>{
        console.log(comments?.filter((item)=>{return(item!==c)}))
        setNewComments(comments?.filter((item)=>{return(item!==c)}))
        // setNewComments(newComments.filter((item)=>{return(item!==comment)}))

        // console.log(c)

        // console.log(newComments?.filter((item)=>{return(item!==comment)}))

        postComment(newComments?.filter((item)=>{return(item!==c)}))  

    //     comments= (comments.filter((item)=>{return(item!==comment)}))

    //    console.log(newComments)

    //     postComment(comments)

}

    let [user, setUser] = useState( {} )
  // let user

  const getUser = async(userId) => {
    let res = await fetch(`http://localhost:3000/users/${userId}`)
    let data = await res.json();
    setUser( data )
    // user = data
}

// useEffect(()=>{
//   getUser( parseInt(sessionStorage.getItem( "user-id" )) )
// },[])


  return (
    <div className='border border-black p-4 my-2'>
        <div className='flex items-center gap-4'>
            <textarea ref={contextData.ref} className='border border-black' onChange={(e)=>{setComment(e.target.value)}}/>
            <div>
                <Button onClickHandler={addComment}>Post</Button>
            </div>
            
        </div>
        {
            displayComments?.map( comment => {
                // getUser( comment.userId )
                return (
                    <UserComment key={comment.content} comment={comment} user={user} getUser={getUser} deleteComment={deleteComment}/>
                )
            } )
        } 
    </div>
  )
}
