import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllBlogs } from '../../../redux/actions/blogs.action';
import Blog from '../../molecules/Blog/Blog';
import AddBlog from '../AddBlog/AddBlog';

export default function BlogList() {
    let {allBlogs,allBlogs_loaded} = useSelector(state=>state.allBlogs)
    let {id}=useParams()
    let dispatch = useDispatch();
    let userId=sessionStorage.getItem("user-id")
    useEffect(()=>{
        dispatch(getAllBlogs(id,userId))
    },[id])

    allBlogs?.sort(function(a, b) {
        let c = new Date(a.date);
        let d = new Date(b.date);
        return c-d;
    });
    allBlogs.reverse()

  return (
    <div className='px-20 py-10'>
        {  id === "addBlog" ?   <AddBlog/>
                            :   <div className='flex'>
                                    <div className='flex flex-col gap-8 w-2/3'>{ allBlogs?.map( blog=><Blog blog={blog} key={blog.id}/>) }</div>
                                    <div className='w-1/3'>Categories</div>
                                </div> 
        }
    </div>
  )
}
