import React from 'react'
import { Link,useParams } from 'react-router-dom'
import paper from '../assets/paper.svg'
import DP from './DP'

const Header = () => {

    const {user} = useParams()
    const loginID = JSON.parse(localStorage.getItem('username'))


  return (
    <header className='bg-emerald-600 '>
        <nav className='flex md:w-3/4 mx-auto'>
          {/* <div className="flex"> */}
            <div className="py-1 flex items-end">
              <DP user={loginID} loginID={loginID} header/>
                <p className='mb-2 font-medium capitalize text-lg ml-2'>{loginID}</p>
            </div>
          {/* </div> */}
            {/* <Link to={'/'}><h1 className='m-4 md:text-xl'>Home</h1></Link> */}
            {/* <Link to={'/write'}><h1 className='m-4 md:text-xl'>Write A Blog</h1></Link> */}
            <Link to={loginID?`/${loginID}`:'/'}><div className="p-4 bg-white rounded-full border-2 border-black right-1/2 translate-x-1/2 absolute group shadow-xl">
              <img src={paper} alt="" className=' w-16 h-16 ' />
              <h1 className='group-hover:scale-0 shadow-lg transition-all px-1 absolute font-bold text-3xl top-1/2 left-1/2 -translate-x-1/2  bg-white/90 border-2 border-black rounded-lg -translate-y-1/2'>BLOGIFY</h1>
            </div></Link>
        </nav>
    </header>
  )
}

export default Header