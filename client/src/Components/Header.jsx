import React,{useState} from 'react'
import { Link,useParams } from 'react-router-dom'
import paper from '../assets/paper.svg'
import DP from './DP'
import  Axios  from 'axios'

const Header = () => {

    const {user} = useParams()
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [search,setSearch]=useState()
    const [searchData,setSearchData]=useState({})

    const handleSearch=(e)=>{
        setSearch(e)
        if(e.length >0){
          // console.log(e.length)
          Axios.get(`http://localhost:3001/get/${e}`).then(resp=>{
            setSearchData(resp.data)
          })
        }else{
          setSearchData({})
        }
    }


  return (
    <header className='bg-emerald-600 '>
        <nav className='flex md:w-3/4 mx-auto justify-between items-center '>
          {/*       DP      and   USER */}
            <div className="py-1 flex items-end">
              <DP user={loginID} loginID={loginID} header/>
                <p className='mb-2 font-medium capitalize text-lg ml-2'>{loginID}</p>
            </div>
            {/*       LOGO         */}
            <Link to={loginID?`/${loginID}`:'/'}><div className="p-4 bg-white rounded-full border-2 border-black right-1/2 translate-x-1/2 absolute top-0 group shadow-xl">
              <img src={paper} alt="" className=' w-16 h-16 ' />
              <h1 className='group-hover:scale-0 shadow-lg transition-all px-1 absolute font-bold text-3xl top-1/2 left-1/2 -translate-x-1/2  bg-white/90 border-2 border-black rounded-lg -translate-y-1/2'>BLOGIFY</h1>
            </div></Link>
            {/*       Search    Bar      */}
            <div className="bg-white p-1 relative">
              <input type="search" onChange={(e)=>handleSearch(e.target.value)} value={search} placeholder='Search Titles' className='border-2 border-black w-full p-1 outline-0 capitalize'/>
              {/*         Search Result      */}
              {search?.length>0&&(
              <div className='absolute bg-white w-full left-0 shadow-xl'>
                {searchData.length>0?(searchData.map((data,i)=><Link to={`/posts/${data.id}`}><p key={i} className='capitalize p-1 hover:bg-emerald-500 hover:shadow-xl hover:text-white'>{data.title}</p></Link>)):<p className='p-1 '>No Result</p>}
              </div>)}
            </div>
        </nav>
    </header>
  )
}

export default Header