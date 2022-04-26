import React,{useState}from 'react'
import  Axios  from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    let navigate = useNavigate()

    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const [isBlank, setIsBlank] = useState(false)

    const handleSubmit = ()=>{
        if(userName=='' || password =='' || email==''){
            setIsBlank(true)
            setTimeout(()=>{
                setIsBlank(false)
            },5000)
        }else{
            Axios.post('http://localhost:3001/register',{userName : userName, password :password, email:email}).then((response)=>{
                setMessage(response.data)

                setTimeout(()=>{
                    setMessage('')
                    if(response.data.includes('Registered'))navigate('/login')

                },3000)
            })
        }
    }

  return (
    <main className='h-screen w-screen text-center flex justify-center items-center'>
        <div className="absolute w-full h-full bg-emerald-500 md:-top-20 -z-10 md:-left-10 rounded-br-[100%]"></div>
        <div className="bg-white p-4 md:p-8 rounded-md shadow-2xl">
            <h1 className='text-xl mb-4 '>Sign In</h1>
            {isBlank&&<p className='text-md text-red-500 my-2 mb-4'>Fill All The Details.</p>}
            <p className='text-md text-red-500 my-2 mb-4'>{message}</p>
            <div className="flex items-center">
                <div className='flex flex-col gap-y-7 mx-2 text-left'>
                    <p>Email:</p>
                    <p>Username:</p>
                    <p>Password:</p>
                </div>

                <div>
                <div>
                    <input type="email" placeholder='Email...' className='outline-0  p-1 border-b-2 border-black rounded-sm' onChange={e=>setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <input type="text" placeholder='Username...' className='outline-0  p-1 border-b-2 border-black rounded-sm mt-4'  onChange={e=>setUserName(e.target.value)} value={userName}/>
                </div>
                <div>
                    <input type="password" placeholder='Password...' className='outline-0 mt-4  p-1 border-b-2 border-black rounded-sm'  onChange={e=>setPassword(e.target.value)} value={password}/>
                </div>
            </div>
            </div>
            
           
            <button className='px-3 py-1 mt-6 border-2 rounded-md bg-emerald-400 border-black text-white font-medium text-lg' onClick={()=>handleSubmit()}>Sign In</button>
            <Link to={'/login'}><p className='text-gray-500 mt-6 -mb-2 w-max mx-auto text-sm hover:underline hover:text-gray-800 transition-all '>Already Have An Account?</p></Link>
        </div>
    </main>
  )
}

export default Register