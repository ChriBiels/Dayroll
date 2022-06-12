import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton=()=>{
    const{loginWithRedirect, user, isAuthenticated}=useAuth0();
    async function logginRe(){
      localStorage.clear()
      await loginWithRedirect()
    }

      return(
        <Button className='button w-50' onClick={()=>logginRe()}>Login</Button>
      )
  }
  export default LoginButton
                    