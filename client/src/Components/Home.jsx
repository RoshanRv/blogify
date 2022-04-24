import React,{useState,useEffect}from 'react'
import Axios from 'axios'
import { Link, useParams} from 'react-router-dom'
import Logout from './Logout'
import like from '../assets/like.svg'
import paper from '../assets/paper.svg'
import avatar1 from '../assets/avatar1.jpeg'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import avatar5 from '../assets/avatar5.png'


export const Profile = ({user,data,loginID})=>{

    const [blogs,setBlogs] =useState(0)
    const [showChangeDP,setShowChangeDP] =useState(false)
    const [currAvatar,setCurrAvatar] =useState()

    const avatars = [avatar1,avatar2,avatar3,avatar4,avatar5]

    const setAva = ()=>{
        Axios.get(`http://localhost:3001/${user}/avatar`).then((response)=>{
            const ava = (response.data[0].avatar)

            if(ava=="avatar1")return setCurrAvatar(0)
            if(ava=='avatar2')return setCurrAvatar(1)
            if(ava=='avatar3')return setCurrAvatar(2)
            if(ava=='avatar4')return setCurrAvatar(3)
            if(ava=='avatar5')return setCurrAvatar(4)
        })
    
    }

    const returnStr = ()=>{
        if(currAvatar==0)return 'avatar1'
        if(currAvatar==1)return 'avatar2'
        if(currAvatar==2)return 'avatar3'
        if(currAvatar==3)return 'avatar4'
        if(currAvatar==4)return 'avatar5'
    }

    useEffect(() => {
        setBlogs(data.length)
    }, [data])

    useEffect(()=>{
        setAva()
    },[])

    const handleChangeDP =(name)=>{

        if(name=='cancel')setShowChangeDP(false)

        else if(name=='save'){
            Axios.post(`http://localhost:3001/${user}/profile`,{currAvatar:returnStr()})
            setShowChangeDP(false)
        }

    
    }
    

    return(
        <section className='bg-emerald-600'>
            <div className=" md:w-3/4 md:mx-auto py-2 mx-4">
                <div className="flex justify-between">
                    <div className='flex items-end '>
                        {/*         DP and Name          */}
                        <div className='md:w-32 w-24 h-24 md:h-32 rounded-full border-4 border-black cursor-pointer group relative overflow-hidden' onClick={()=>setShowChangeDP(true)}>
                            
                            {loginID==user&&<div className='absolute right-1/2 w-full h-full text-center translate-x-1/2 translate-y-1/2 -bottom-16 bg-black/80 text-white group-hover:-bottom-4 transition-all'>
                                <p>Change</p>
                            </div>}
                            <img src={avatars[Number(currAvatar)]} alt="" className='rounded-full'/>
                        </div>
                        <p className='text-black capitalize text-2xl my-4 mx-4 md:mx-8 font-semibold'>{user}</p>
                    </div>
                    {/*             Likes and Blogs      */}
                    <div className="flex items-end mb-2 gap-x-4">
                        <div className='flex flex-col text-center justify-center'>
                            <h1>Likes</h1>
                            <div className="flex items-center">
                                <img src={like} alt="like" className='w-12 h-12' />
                                <p>50</p>
                            </div>
                        </div>
                        <div className='flex flex-col text-center justify-center'>
                            <h1>Blogs</h1>
                            <div className="flex items-center">
                                <img src={paper} alt="like" className='w-8 h-8 m-2' />
                                <p>{blogs}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            {/*         Change DP  */}
            {loginID==user&&<div className={` ${showChangeDP?'scale-100':'scale-0'} top-1 md:left-1/4 left-10 md:w-max max-w-screen absolute m-2 -right-0 bg-emerald-300 transition-all p-1  md:p-3 border-2 border-white text-center `}>
                {/* <p onClick={()=>setShowChangeDP(false)}>X</p> */}
                <p className='font-medium my-1 text-lg '>Change Your DP</p>
                <div className="flex gap-4 flex-wrap justify-center">
                {avatars.map((avatar,i)=>(
                    <div key={i} className={`md:w-32 w-24 h-24 md:h-32 rounded-full border-4 ${currAvatar==i?'border-red-500':'border-black'} cursor-pointer overflow-hidden`} onClick={()=>setCurrAvatar(i)}>
                        <img src={avatar} alt={avatar} className='rounded-full hover:scale-110 transition-all'/>
                    </div>
                ))}
                </div>

                <div className="flex justify-between ">
                    <Logout button/>
                    <div className="flex  my-2 gap-x-4">
                        <button className='text-lg  transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md' name='cancel' onClick={(e)=>handleChangeDP(e.target.name)}>Cancel</button>
                        <button className='text-lg  transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md' name='save' onClick={(e)=>handleChangeDP(e.target.name)}>Save</button>
                    </div>
                </div>

                
                
            </div>}
             {/*      ...  */}
           
        </section>
    )
}

const Home = () => {

    const [postList,setPostList]=useState([])
    const {user} = useParams()
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [search,setSearch]=useState('')

    const getData = (term)=>{
        if(term){
            Axios.get(`http://localhost:3001/api/get/${user}/${term}`).then((data)=>{
            setPostList(data.data)
            })
        }
        else{
            Axios.get(`http://localhost:3001/api/get/${user}`).then((data)=>{
            setPostList(data.data)
            })
        }
    }

    useEffect(()=>{
       getData()
    },[])

    const handleSearch=(searchTerm)=>{
        setSearch(searchTerm)
        getData(searchTerm)
    }

  return (
    <main>
        <Profile user={user} data={postList} loginID={loginID}/>
        <section className='bg-emerald-500 p-4 min-h-screen'>
            <div className='md:w-3/4 mx-auto text-center ' >
                <div className="flex text-left justify-between items-center mb-3">
                    <p className='md:text-2xl my-4 font-semibold'>Your Blogs</p>
                    {loginID==user&&<Link to={`/${loginID}/write`}><button className='text-lg  transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md '>New Blog</button></Link>}
                </div>
                {/*         Search           */}
                <div className='bg-white p-2 w-3/4 mx-auto mb-6 hover:bg-white/90 transition-colors'>
                    <input type="search" placeholder='Search Title...' className='text-center bg-transparent p-1 rouned-md   border-2 w-full border-black  outline-0 ' value={search} onChange={(e)=>handleSearch(e.target.value)} />
                </div>
                
            </div>
            {postList?.map((data,i)=>(<Link to={`/posts/${data.id}`} key={i}><div  className='md:w-3/4 mx-4 md:mx-auto flex flex-col text-center justify-center items-center mt-2 bg-white hover:bg-white/90 transition-colors p-2'>
                <div className="border-2 border-black w-full">
                    <h1 className='px-2 py-1 w-full text-xl md:text-2xl uppercase font-semibold my-2'>{data.title}</h1>
                    <p className='px-2 indent-6 py-1 break-all whitespace-pre-wrap w-full text-left capitalize text-lg md:text-xl my-4'>{data.post.length>500? data.post.substring(0,500)+'...':data.post}</p>
                </div>
            </div></Link>))}
            
        </section>
    </main>
  )
}

export default Home