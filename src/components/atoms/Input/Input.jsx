import React from 'react'

export default function Input({type,value, onChangeHandler,ariaLable,id,name,required,className,onInput,placeholder}) {
  return (
    <input onInput={onInput} value={value} placeholder={placeholder} type={type} id={id} name={name} className={className} required={required} onChange={onChangeHandler} aria-labelledby={ariaLable} />
  )
}
