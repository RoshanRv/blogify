import React,{useState} from 'react'
import { Link,useParams } from 'react-router-dom'
import paper from '../assets/paper.svg'
import DP from './DP'
import  Axios  from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

    const {user} = useParams()
    const loginID = JSON.parse(localStorage.getItem('username'))
    const [search,setSearch]=useState()
    const [searchData,setSearchData]=useState({})
    const [showSideNav,setShowSideNav]=useState(false)

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
    <header className='bg-emerald-600 md:h-max h-16 relative shadow-md shadow-black/30'>
        <nav className='flex md:w-3/4 mx-auto justify-between items-center '>
          {/*       DP      and   USER */}
            <div className="py-1 md:flex items-end hidden ">
              <DP user={loginID} loginID={loginID} header/>
                <p className='mb-2 font-medium capitalize text-lg ml-2'>{loginID}</p>
            </div>
            {/*       LOGO         */}
            <Link to={loginID?`/${loginID}`:'/'}><div className="p-4 bg-white  rounded-full border-2 border-black right-1/2 translate-x-1/2 absolute top-0 group shadow-xl shadow-black/40">
              <img src={paper} alt="" className=' md:w-16 md:h-16 w-12 h-12 ' />
              <h1 className='group-hover:scale-0 shadow-lg shadow-black/40 transition-all px-1 absolute font-bold text-xl md:text-3xl top-1/2 left-1/2 -translate-x-1/2  bg-white/90 border-2 border-black rounded-lg -translate-y-1/2'>BLOGIFY</h1>
            </div></Link>
            {/*       Menu ICON   */}
            <FontAwesomeIcon icon={faBars} onClick={()=>setShowSideNav(true)} className='absolute right-4 text-lg top-1/2 -translate-y-1/2 md:hidden'/>
            {/*       Search    Bar      */}
            <div className="bg-white p-1 relative md:block hidden">
              <input type="search" onChange={(e)=>handleSearch(e.target.value)} value={search} placeholder='Search Titles' className='border-2 border-black w-full p-1 outline-0 capitalize'/>
              {/*         Search Result      */}
              {search?.length>0&&(
              <div className='absolute bg-white w-full left-0 shadow-xl'>
                {searchData.length>0?(searchData.map((data,i)=><Link key={i}  to={`/posts/${data.id}`}><p className='capitalize p-1 hover:bg-emerald-500 hover:shadow-xl hover:text-white'>{data.title}</p></Link>)):<p className='p-1 '>No Result</p>}
              </div>)}
            </div>


            {/*       SIDE NAV */}
            <div className={`fixed w-10/12 h-screen bg-emerald-600 shadow-2xl shadow-black transition-all text-center ${showSideNav?'right-0':'-right-full'} top-0 p-2 `}>
              {/*     CLOSE BTN    */}
              <FontAwesomeIcon icon={faClose} onClick={()=>setShowSideNav(false)}  className='absolute right-4 text-lg top-4  md:hidden'/>
              <div className="py-1 mt-8  md:hidden items-end w-full mx-auto">
                <DP user={loginID} loginID={loginID} header/>
                  <p className='mb-2 font-medium capitalize text-lg ml-2'>{loginID}</p>
              </div>

              {/*       Search    Bar      */}
            <div className="bg-white p-1 relative md:hidden ">
              <input type="search" onChange={(e)=>handleSearch(e.target.value)} value={search} placeholder='Search Titles' className='border-2 border-black w-full p-1 outline-0 capitalize'/>
              {/*         Search Result      */}
              {search?.length>0&&(
              <div className='absolute bg-white w-full left-0 shadow-xl'>
                {searchData.length>0?(searchData.map((data,i)=><Link  key={i} to={`/posts/${data.id}`}><p  className='capitalize p-1 hover:bg-emerald-500 hover:shadow-xl hover:text-white'>{data.title}</p></Link>)):<p className='p-1 '>No Result</p>}
              </div>)}
            </div>
            </div>
        </nav>
    </header>
  )
}

export default Header