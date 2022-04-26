import React,{useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import  Axios  from 'axios'
import Header from './Header'
import Message from './Message'

const Post = () => {
    const {id}   = useParams()
    const [data,setData]=useState({})
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [isEditing,setIsEditing]=useState(false)
    const [showMsg,setShowMsg]=useState(false)
    const [confirm,setConfirm]=useState(false)
    const [isEmpty,setIsEmpty]=useState(false)


    const navigate = useNavigate()

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/posts/${id}`).then((resp)=>{
            setData({title:resp.data[0].title,post:resp.data[0].post,user:resp.data[0].user})
        })
    },[id])

    const handleEditSave = ()=>{
        if(data.title===''|data.post===''){
            setIsEmpty(true)
            setTimeout(()=>{
                setIsEmpty(false)
            },2500)
        }else{
            if(isEditing){
                setIsEditing(false)
                Axios.post(`http://localhost:3001/update/${id}`,{title:data.title,post:data.post}).then(
                    setShowMsg(true),
                        setTimeout(()=>{
                            setShowMsg(false)
                        },2000)
                )
            }else{
                setIsEditing(true)
            }
        }
        
    }

    const handleDelete = ()=>{
        Axios.get(`http://localhost:3001/posts/delete/${id}`).then(
            setTimeout(()=>{
                navigate(`/${loginID}`)
            },500)
        )
    }

  return (
      <main className='bg-emerald-500 '>
          <Message msg={'Blog Updated'} color={'black'} show={showMsg} />
          <Header  />
          <section className='p-4 min-h-screen'>
            <div className="md:w-3/4 mx-4 md:mx-auto flex flex-col">
                    
                    {/*         Delete , Edit and Save Button */}
                    {data.user==loginID&&<div className="flex flex-start justify-between md:items-center">
                        <div className="md:flex items-start md:items-center overflow-hidden ">
                            {/*     DELETE */}
                            <button className={`self-end text-lg  my-4 transition-colors hover:bg-rose-500 bg-rose-400 border-2 border-white px-3 py-2 h-max rounded-md`} onClick={()=>setConfirm(true)}>Delete</button>
                            <p className={`mx-2 ${!confirm&&'scale-0'} text-red-600 transition-all `}> Are You Sure? <span className='hover:underline cursor-pointer' onClick={()=>handleDelete()}>Yes </span> or <span  className='hover:underline cursor-pointer' onClick={()=>setConfirm(false)}>No </span></p>
                        </div>
                    {/*             Save / Edit    */}
                        <button className={` text-lg  my-4 transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md`} onClick={()=>handleEditSave()}>{isEditing?'Save': 'Edit'}</button>
                    </div>}
                    {isEmpty&&<h1 className='text-red-600 text-lg w-max mx-auto my-2'>Fill All The Boxes</h1>}
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