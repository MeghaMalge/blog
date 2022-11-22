import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../atoms/Button'
import Login from '../../molecules/Login/Login'
import Signup from '../../molecules/Signup/Signup'
import './authPage.css'

export default function AuthPage() {  
  let signUpRef = useRef(null)
  let loginRef = useRef(null)
  let btnRef = useRef(null)
  const flipCard = () => {
      signUpRef.current.classList.toggle( "flipFront" )
      loginRef.current.classList.toggle( "flipBack" )
      btnRef.current.textContent==="Sign up"
        ? btnRef.current.textContent="Login"
        : btnRef.current.textContent="Sign up"
  }
  return (
    <div className='flex flex-col items-center min-h-screen theme'>
        <div className='flex gap-4 mb-4'>
          <Link to="/">
            <Button bg="inherit" text="black" className='mt-16 px-4 py-1 border-b-4 hover:border-b-transparent hover:bg-slate-700 hover:text-white border-b-slate-700 bg-white text-slate-700 font-bold transition-all duration-200'>Home</Button>
          </Link> 
          <button ref={btnRef} onClick={flipCard} className="mt-16 px-4 py-1 border-b-4 hover:border-b-transparent hover:bg-slate-700 hover:text-white border-b-slate-700 bg-white text-slate-700 font-bold transition-all duration-200 w-24">Sign up</button>
        </div>
        <div className='card'>
          <div ref={loginRef} className="side"><Login/></div>
          <div ref={signUpRef} className="side flipFront"><Signup/></div>
      </div>
    </div>
  )
}
