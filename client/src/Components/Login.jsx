import React,{useState,useContext,useEffect} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from './LoginDetails'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [isBlank,setIsBlank]=useState(false)
    const [message,setMessage]=useState('')

    //  context login
    const [login,setLogin] = useContext(Context)

    const navigate = useNavigate()


    // Navigate to User After 100 ms
    const navigateToUser = (user)=>{
        setTimeout(()=>{
            navigate(`/${user}`)
        },1000)
    }

    const handleLogin = ()=>{
        if(userName=='' || password ==''){
            setIsBlank(true)
            setTimeout(()=>{
                setIsBlank(false)
            },5000)
        }else{
            Axios.post('http://localhost:3001/login',{userName : userName, password :password}).then((response)=>{
                if(response.data.message)setMessage(response.data.message)
                // console.log(response.data.accessToken)
                if(response.data.accessToken){
                    setMessage("Logged In")
                    setLogin(userName)
                    localStorage.setItem('username',JSON.stringify(userName))
                    navigateToUser(userName)
                }
                if(response.data.error)setMessage(response.data.error)

                setTimeout(()=>{
                    setMessage('')
                },2000)

            })
        }
    }

    

    //  Prevent Login If User Already Exists
    useEffect(()=>{
        if(login){
            navigateToUser(login)
        }
    },[])

  return (
    <main className='h-screen w-screen text-center flex justify-center items-center'>
        <div className="absolute w-full h-full bg-emerald-500 md:-top-20 -z-10 md:-left-10 rounded-br-[100%]"></div>
        <div className="bg-white p-4 md:p-8 rounded-md shadow-lg">
            <h1 className='text-xl mb-4 '>Log In</h1>
            {isBlank&&<p className='text-md text-red-500 my-2 mb-4'>Fill All The Details.</p>}
            <p className='text-md text-red-500 my-2 mb-4'>{message}</p>
            <div className="flex items-center">
                <div className="flex flex-col gap-y-6 mr-3 text-left">
                    <p>Username:</p>
                    <p>Password:</p>
                </div>

                <div>
                    <div>
                        <input type="text" placeholder='Username...' className='outline-0  p-1 border-b-2 border-black rounded-sm' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
                    </div>
                    <div>
                        <input type="password" placeholder='Password...' className='outline-0 mt-4  p-1 border-b-2 border-black rounded-sm'  onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </div>
                </div>
            </div>
            
            
            <button className='px-3 py-1 mt-6 border-2 rounded-md bg-emerald-400 border-black text-white font-medium text-lg' onClick={()=>handleLogin()}>Log In</button>

            <Link to={'/register'}><p className='text-gray-500 mt-6 -mb-2 w-max mx-auto text-sm hover:underline hover:text-gray-800 transition-all '>Don't Have An Account?</p></Link>
        </div>
    </main>
  )
}

export default Login