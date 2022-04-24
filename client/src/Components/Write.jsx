import React,{useEffect, useState}from 'react'
import Button from './Button'
import Axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const Write = () => {

    const [title,setTitle]= useState('')
    const [post,setPost]= useState('')
    const [isTitleEditing,setIsTitleEditing]= useState(true)
    const [isPostEditing,setIsPostEditing]= useState(true)
    const [isEmpty,setIsEmpty]=useState(false)

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('username'))

    const handleSubmit=()=>{
        if(title===''|post===''){
            setIsEmpty(true)
            setTimeout(()=>{
                setIsEmpty(false)
            },2500)
        }else{
            if(user){
                Axios.post(`http://localhost:3001/${user}/write`,{title:title,post:post}).then(
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
    <section className='bg-violet-300 md:p-8 p-4 min-h-screen '>
        <div className=' mx-auto flex flex-col justify-center items-center w-3/4'>
        {isEmpty&&<h1 className='text-red-600 text-lg my-2'>Fill All The Boxes</h1>}
            
            <Button cond={isTitleEditing} t={'Save'} f={'Edit'} onPress={()=>setIsTitleEditing(e=>!e)}/>

            {isTitleEditing?<input  type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='text-center p-2 outline-violet-600 w-full  bg-white/70 border-2 border-violet-400 placeholder:text-gray-600 capitalize rounded-lg mb-8' placeholder='Title...'/>:(
               <div className='text-center p-2 outline-violet-600 w-full border-2 border-violet-400 bg-white select-none capitalize rounded-lg mb-8'>
                 <p>{title}</p>
            </div>
            )}

            <Button cond={isPostEditing} t={'Save'} f={'Edit'} onPress={()=>setIsPostEditing(e=>!e)}/>

            {isPostEditing?<textarea  value={post} onChange={(e)=>setPost(e.target.value)} cols="30" rows="10" placeholder='Text...' className='text-left bg-white/70 p-2 outline-violet-600 w-full border-2  border-violet-400 placeholder:text-gray-600 capitalize rounded-lg '></textarea>:(
                <div className='text-left whitespace-pre-wrap p-2 outline-violet-600 w-full border-2 border-violet-400 bg-white select-none capitalize rounded-lg mb-8'>
                <h1>{post}</h1>
           </div>
            )}

            <Button f={'Save Blog'} onPress={()=>handleSubmit()}/>
        </div>
    </section>
    </div>
  )
}

export default Write
