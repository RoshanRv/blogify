import React,{useState,useEffect}from 'react'
import avatar1 from '../assets/avatar1.jpeg'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import avatar5 from '../assets/avatar5.png'
import Logout from './Logout'
import  Axios from 'axios'

const DP = ({user,loginID,header}) => {

    // console.log(header)

    const [showChangeDP,setShowChangeDP] =useState(false)
    const [currAvatar,setCurrAvatar] =useState()

    const avatars = [avatar1,avatar2,avatar3,avatar4,avatar5]

    const getAvatar = ()=>{
        Axios.get(`https://blogify--react.herokuapp.com/${user}/avatar`).then((response)=>{
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

    useEffect(()=>{
        getAvatar()
    },[])

    const handleChangeDP =()=>{
        
        Axios.post(`https://blogify--react.herokuapp.com/${user}/profile`,{currAvatar:returnStr()})
        setShowChangeDP(false)
    }

  return (
    <>
        <div className={` ${header?'w-20 h-20 ':'md:w-32 w-24 h-24 md:h-32'} rounded-full border-4 border-black cursor-pointer group relative overflow-hidden mx-auto`} onClick={()=>setShowChangeDP(true)}>                   
            {loginID==user&&<div className={`absolute right-1/2 w-full h-full text-center translate-x-1/2 translate-y-1/2 -bottom-16 bg-black/80 text-white ${header?'group-hover:bottom-0':'group-hover:-bottom-4'} transition-all`}>
                <p>Change</p>
            </div>}
            <img src={avatars[Number(currAvatar)]} alt="" className='rounded-full'/>
        </div>

        {/*         Change DP  */}
        {loginID==user&&<div className={`z-50 ${showChangeDP?'scale-100':'scale-0'} top-1 md:left-1/4 ${header?'-left-10':'-left-1'} mx-1 md:w-max max-w-screen absolute m-2 -right-0 bg-emerald-300 transition-all p-1 w-full md:p-3 border-2 border-white text-center `}>
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
                    
                <button className='text-lg my-2 transition-colors hover:bg-emerald-600 bg-emerald-400 border-2 border-white px-3 py-2 h-max rounded-md' name='save' onClick={()=>handleChangeDP()}>Save</button>
            </div>                
        </div>}
        {/*      ...  */}
    </>
  )
}

export default DP