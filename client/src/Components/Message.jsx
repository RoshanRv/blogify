import React from 'react'

const Message = ({show,msg,color}) => {
  return (
    <div className={`absolute ${show?'top-1/2':'-top-1/2'} transition-all duration-500 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 shadow-lg border-black border-2 rounded-lg m-2 h-max p-3`}>
        <h1 className='text-2xl ' style={{color:color}}>{msg}</h1>
    </div>
  )
}

export default Message