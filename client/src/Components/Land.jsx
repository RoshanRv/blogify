import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Land = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('username'))
        if(user){
            setTimeout(()=>{
                navigate(`/${user}`)
            },1000)
        }
    },[])

  return (
    <main className='h-screen w-screen'>
        <div className="absolute w-full h-full bg-emerald-500 md:-top-20 -z-10 md:-left-10 rounded-br-[100%]"></div>
        <div className='absolute md:top-[30%] top-20 left-10 md:left-20' >
            <h1 className='text-4xl md:text-6xl text-white font-bold uppercase z-50'>Blogify</h1>
            <p className='my-2 text-lg md:text-xl font-medium w-64 lg:w-max'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, libero.</p>
        </div>
        <div className="flex absolute gap-x-10 md:gap-x-16 bottom-20 right-16 ">
            <Link to={'/login'}><button className='px-3 py-2  border-2 rounded-md bg-emerald-400 border-black text-white font-semibold text-lg'>Log In</button></Link>
            <Link to='/register'><button className='px-3 py-2  border-2 rounded-md bg-emerald-400 border-black text-white font-semibold text-lg'>Sign In</button></Link>
        </div>
    </main>
  )
}

export default Land