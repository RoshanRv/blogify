import React,{useEffect, useState}from 'react'
import Axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const Write = () => {

    const [title,setTitle]= useState('')
    const [post,setPost]= useState('')
    const [isEmpty,setIsEmpty]=useState(false)

    const navigate = useNavigate()

    const loginID = JSON.parse(localStorage.getItem('username'))

    const handleSubmit=()=>{
        if(title===''|post===''){
            setIsEmpty(true)
            setTimeout(()=>{
                setIsEmpty(false)
            },2500)
        }else{
            if(loginID){
                Axios.post(`http://localhost:3001/${loginID}/write`,{title:title,post:post}).then(
                    sessionStorage?.removeItem('blog')
                )
            }else{
                sessionStorage.setItem('blog',JSON.stringify({title,post}))
                navigate('/login')
            }
        }
    }

    useEffect(()=>{
        const blog = JSON.parse(sessionStorage.getItem('blog'))
        if(blog){
            console.log(blog)
            setTitle(blog.title)
            setPost(blog.post)
        }
    },[])

  return (
    <div>
        <Header />
    <section className='bg-emerald-500 md:p-8 p-4 min-h-screen '>
        <div className=' mx-auto flex flex-col justify-center items-center w-3/4  p-1 md:p-2'>
        {isEmpty&&<h1 className='text-red-600 text-lg my-2'>Fill All The Boxes</h1>}
            <div className="p-1 bg-white w-full">
                <div className="border-4 border-black  p-1 h-max  ">

                <input  type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='text-center p-2 outline-0 w-full  hover:bg-black/10 transition-colors text-2xl font-semibold uppercase  mb-8' placeholder='Title...'/>


                <textarea  value={post} onChange={(e)=>setPost(e.target.value)}  placeholder='Text...' className='text-left hover:bg-black/10 transition-colors outline-0 w-full text-lg md:text-xl indent-6  break-all whitespace-pre-wrap capitalize  p-1 h-96'></textarea>
                </div>
            </div>
            
            <button className='text-lg self-end my-4 transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md 'onClick={()=>handleSubmit()} >Submit</button>
        </div>
    </section>
    </div>
  )
}

export default Write
