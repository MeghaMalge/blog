import React, { useState } from 'react';
import './inputField.css';

export default function InputField({ type,label, onChangeHandler,name }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-container">
      <input type={type} value={value} name={name} onChange={(e)=>{
        handleChange(e)
        onChangeHandler(e)
      }} />
      <label className={value && 'filled'}>
        {label}
      </label>
    </div>
  );
}