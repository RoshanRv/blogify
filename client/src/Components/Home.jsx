import React,{useState,useEffect}from 'react'
import Axios from 'axios'
import { Link, useParams} from 'react-router-dom'
import Spinner from './Spinner'

import paper from '../assets/paper.svg'
import DP from './DP'



export const Profile = ({user,data,loginID})=>{

    const [blogs,setBlogs] =useState(0)

    useEffect(() => {
        setBlogs(data.length)
    }, [data])

    
    return(
        <section className='bg-emerald-600'>
            <div className=" md:w-3/4 md:mx-auto py-2 mx-4">
                <div className="flex justify-between">
                    <div className='flex items-end '>
                        {/*         DP and Name          */}
                        <DP user={user} loginID={loginID} />
                        <p className='text-black capitalize text-2xl my-4 mx-4 md:mx-8 font-semibold'>{user}</p>
                    </div>
                    {/*           Blogs      */}
                    <div className="flex items-end mb-2 gap-x-4">
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
            
            
           
        </section>
    )
}

const Home = () => {

    const [postList,setPostList]=useState([])
    const {user} = useParams()
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [search,setSearch]=useState('')

    const [isLoading,setIsLoading]=useState(true)


    const getData = (term)=>{

        setIsLoading(true)

        if(term){
            Axios.get(`https://blogify--react.herokuapp.com/api/get/${user}/${term}`).then((data)=>{
            setPostList(data.data)
            setIsLoading(false)

            })
        }
        else{
            Axios.get(`https://blogify--react.herokuapp.com/api/get/${user}`).then((data)=>{
            setPostList(data.data)
            setIsLoading(false)

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
                    {loginID==user&&<Link to={`/write`}><button className='text-lg  transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md '>New Blog</button></Link>}
                </div>
                {/*         Search           */}
                <div className='bg-white p-2 w-3/4 mx-auto mb-6 hover:bg-white/90 transition-colors'>
                    <input type="search" placeholder='Search Title...' className='text-center bg-transparent p-1 rouned-md   border-2 w-full border-black  outline-0 ' value={search} onChange={(e)=>handleSearch(e.target.value)} />
                </div>
                
            </div>
            {/*        Welcome Text and No Result      */}
            {postList.length==0&&(<div className="w-3/4 md:w-1/2 mx-auto text-center md:my-20 my-10 text-white text-2xl md:text-4xl ">
                <p>{search.length>0?`No Blogs Found Such As '${search}'`:'Let People Know What You Are Thinking, So Write A New Blog And Share It In The Public.'}</p>
            </div>)}
            {postList?.map((data,i)=>(<Link to={`/posts/${data.id}`} key={i}><div  className='md:w-3/4 mx-4 md:mx-auto flex flex-col text-center justify-center items-center mt-2 bg-white hover:bg-white/90 transition-colors p-2'>
                <div className="border-2 border-black w-full">
                    <h1 className='px-2 py-1 w-full text-xl md:text-2xl uppercase font-semibold my-2'>{data.title}</h1>
                    <p className='px-2 indent-6 py-1 break-all whitespace-pre-wrap w-full text-left capitalize text-lg md:text-xl my-4'>{data.post.length>500? data.post.substring(0,500)+'...':data.post}</p>
                </div>
            </div></Link>))}
            {isLoading&&<Spinner />}
        </section>
    </main>
  )
}

export default Home