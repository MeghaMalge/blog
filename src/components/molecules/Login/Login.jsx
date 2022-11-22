import React, { useContext, useState } from 'react'
import Form from '../../atoms/Form/Form'
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../../context/AuthContext'
import Button from '../../atoms/Button/Button'
import InputField from '../InputField/InputField'
import toast, {Toaster} from 'react-hot-toast'

export default function Login() {
  let navigate = useNavigate()
  let [loginForm,setLoginForm]=useState({})
  let contextData= useContext(AuthContext)

   const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });

  };
  const checkLogin = async (loginForm) => {
    try{
      let response = await fetch(`http://localhost:3000/users/?email=${loginForm.email}&password=${loginForm.password}`)
      let data=await response.json();
      return data;
  }
    catch(error){
      return error
    }
  };
  const onSubmitHandler = (e) => {

    checkLogin(loginForm)
      .then(data=>{
        console.log(data)
        if(data.length){
          toast.success("Logged in successfully !!")
            contextData.setLoggedIn(true)
            sessionStorage.setItem("login",true)
            sessionStorage.setItem("user-id",data[0].id)
          navigate("/allBlogs")   
        }
        else{
          toast.error("Invalid Credentials !")
        }
      })
      
  };

  return (
    <Form className="flex flex-col gap-10 w-full font-semibold" onSubmitHandler={onSubmitHandler} >
      <Toaster/>
      <InputField type="email" label="Email" onChangeHandler={onChangeHandler} name="email"></InputField>
      <InputField type="password" label="Password" onChangeHandler={onChangeHandler} name="password"></InputField>  
      <Button type='submit' className="bg-slate-700 px-10 py-2 rounded-full text-white w-fit mx-auto shadow-lg shadow-black hover:scale-110 active:translate-y-1 transition-all duration-200">Login</Button>
    </Form>
  )
}
