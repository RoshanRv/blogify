import { useContext} from "react"
import { Context } from "./Components/LoginDetails"
import { useNavigate } from "react-router-dom"



const useLogout = ()=>{
    const [loginID,setLoginID] = useContext(Context)
    const navigate = useNavigate()


    setLoginID(undefined)
    localStorage.removeItem('username')
    navigate('/')
    
    

    // return(<p></p>)

}

export default useLogout