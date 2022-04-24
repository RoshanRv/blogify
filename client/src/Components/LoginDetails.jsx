import { useState,createContext} from "react";

export const Context = createContext()

const LoginDetails = ({children}) => {

    const [username , setUsername] = useState(()=>{
        const user = JSON.parse(localStorage.getItem('username'))
        if(user) return (user)
        return undefined
    })


  return (
      <Context.Provider value={[username,setUsername]}>
              {children}
     </Context.Provider>
  )
}

export default LoginDetails