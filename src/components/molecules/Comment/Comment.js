import React, { useContext } from 'react'
import Button from '../../atoms/Button/Button';
import AuthContext from '../../../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import AppContext from '../../../context/AppContext';


export default function Comment({blog, ref}) {
    let contextData = useContext( AuthContext )
    let appContextData = useContext( AppContext )
    let navigate = useNavigate()

    const handleClick = () => {
        
        navigate( "/blog/"+blog.id )
        appContextData.ref.current.focus();
    }
  return (
    <Button disabled={!contextData.loggedIn} onClickHandler={handleClick}>Comment</Button>
  )
}
