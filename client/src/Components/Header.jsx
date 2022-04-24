import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {


  return (
    <header className=' bg-violet-400'>
        <nav className='flex justify-center'>
            <Link to={'/'}><h1 className='m-4 md:text-xl'>Home</h1></Link>
            <Link to={'/write'}><h1 className='m-4 md:text-xl'>Write A Blog</h1></Link>
        </nav>
    </header>
  )
}

export default Header