import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios'
import Header from './Header'

const Post = () => {
    const {id}   = useParams()
    const [data,setData]=useState({})
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [isEditing,setIsEditing]=useState(false)

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/posts/${id}`).then((resp)=>{
            setData({title:resp.data[0].title,post:resp.data[0].post,user:resp.data[0].user})
        })
    },[id])

    const handleEditSave = ()=>{
        if(isEditing){
            setIsEditing(false)
            Axios.post(`http://localhost:3001/update/${id}`,{title:data.title,post:data.post})
        }else{
            setIsEditing(true)
        }
    }

  return (
      <main className='bg-emerald-500 '>
          <Header />
          <section className='p-4 min-h-screen'>
            <div className="md:w-3/4 mx-4 md:mx-auto flex flex-col">
                    
                    {/*         Edit and Save Button */}
                    {data.user==loginID&&<button className={`self-end text-lg  my-4 transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md`} onClick={()=>handleEditSave()}>{isEditing?'Save': 'Edit'}</button>}
                <div  className=' mt-4 bg-white p-1'>
                    <div className="p-1 border-4 border-black w-full flex flex-col text-center justify-center items-center">
                        {/*         TITLE        */}
                        {isEditing?<input  type="text" value={data.title} onChange={(e)=>setData({title:e.target.value,post:data.post,user:data.user})} className='text-center p-2 outline-0 w-full  hover:bg-black/10 transition-colors text-2xl font-semibold uppercase  mb-8' placeholder='Title...'/>:<h1 className=' w-full bg-white rounded-md text-xl font-semibold uppercase md:text-2xl my-1'>{data?.title}</h1>}
                        {/*         POST         */}
                        {isEditing?<textarea  value={data.post} onChange={(e)=>setData({title:data.title,post:e.target.value,user:data.user})}  placeholder='Text...' className='text-left hover:bg-black/10 transition-colors outline-0 w-full text-lg md:text-xl indent-6  break-all whitespace-pre-wrap capitalize  p-1 h-96'></textarea>:<p className='px-2 py-1 indent-6  break-all whitespace-pre-wrap capitalize w-full text-left bg-white rounded-md text-lg mt-4 md:text-xl'>{data?.post}</p>}
                        {/*         Author   */}
                        {!isEditing&&<p className='bg-white font-medium text-lg mt-2 italic capitalize px-2 py-1 w-max rounded-md self-end'>- {data?.user}</p>}
                    </div>
                </div>
            </div>
        </section>
      </main>
    
  )
}

export default Post