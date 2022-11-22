import React, { useState } from "react";
import Form from "../../atoms/Form/Form";
import Button from '../../atoms/Button/Button'
import InputField from "../InputField/InputField";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  let [signupForm, setSignupForm] = useState({});
  
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const postUser = async (signupForm) => {
    try{
      let response = await fetch(`http://localhost:3000/users`, 
      {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(signupForm),
      });
      let message=await response.json();
      return message
  }
    catch(error){
      return error
    }
  };


  const onSubmitHandler = (e) => {
    
    postUser(signupForm)
      .then(data=>{
        data? toast.success("Registered successfully !")
                   : toast.error("Something went wrong !")
      })
  };

  return (
    <Form className="flex flex-col gap-6 w-full font-semibold text-md" onSubmitHandler={onSubmitHandler}>
      <Toaster/>
      <InputField type="text" label="Name" onChangeHandler={onChangeHandler} name="name"></InputField>
      <InputField type="text" label="Username" onChangeHandler={onChangeHandler} name="username"></InputField>
      <InputField type="email" label="Email" onChangeHandler={onChangeHandler} name="email"></InputField>
      <InputField type="password" label="Password" onChangeHandler={onChangeHandler} name="password"></InputField>
      <Button disabled={false} className="bg-slate-700 px-10 py-2 rounded-full text-white w-fit mx-auto shadow-lg shadow-black hover:scale-110 active:translate-y-1 transition-all duration-200">
          Signup
        </Button>

    </Form>
  );
}
