import React from 'react'

const Button = ({cond,t,f,onPress}) => {
  return (
    <button className={` px-2 py-1 rounded-md border-2 border-white my-1 self-end ${cond?'bg-green-300':'bg-yellow-100'}`} onClick={onPress}>{cond?t:f}</button>
  )
}

export default Button