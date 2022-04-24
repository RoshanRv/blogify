import { useContext} from "react"
import { Context } from "./LoginDetails"
import { useNavigate } from "react-router-dom"

  
const Logout = ({button}) => {
    const [loginID,setLoginID] = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        setLoginID(undefined)
        localStorage.removeItem('username')
        navigate('/')
    }


  return (
    <button className={`${button?'text-lg my-2 transition-colors hover:bg-rose-500 bg-rose-400 border-2 border-white px-3 py-2 h-max rounded-md':''}`} onClick={()=>handleLogout()}>Logout</button>
  )
}

export default Logout