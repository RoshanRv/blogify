import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios'

const Post = () => {
    const {id}   = useParams()
    const [data,setData]=useState({})

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/posts/${id}`).then((resp)=>{
            // console.log(resp)
            setData({title:resp.data[0].title,post:resp.data[0].post,user:resp.data[0].user})
        })
    },[])
  return (
    <section className='bg-violet-300 p-4 min-h-screen'>
        <div  className='md:w-3/4 mx-4 md:mx-auto flex flex-col text-center justify-center items-center mt-2 bg-white/60 p-2 rounded-md'>
            <h1 className='px-2 py-1 w-full bg-white rounded-md text-xl my-2'>{data?.title}</h1>
            <p className='px-2 py-1 whitespace-pre-wrap w-full text-left bg-white rounded-md text-lg my-2'>{data?.post}</p>
            <b className='bg-white px-2 py-1 w-max rounded-md self-end'><p>- {data?.user}</p></b>
        </div>
        
    </section>
  )
}

export default Post