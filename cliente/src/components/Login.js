import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login/Login.css';
import '../Styles/Navbar.css'
import { useAuth0 } from '@auth0/auth0-react';
import Wall from '../Images/video/loginpaper.mp4'
import LoginButton from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useEffect } from 'react';


function Login(){
    const { isAuthenticated } = useAuth0();
    useEffect(() => {
        if(isAuthenticated){
          window.location.href= window.location.origin + '/home'
           }
      })

    return (
        <div className='bas'>
        <div className=''>
            <video autoPlay loop muted className='wallpaper w-100 h-100 position-absolute'>
                <source src={Wall} type="video/mp4"></source>
            </video>
        <div id='container'className='container d-flex border-0'>
        <img className='imga w-25 h-25' src="https://i.imgur.com/uYYuxHa.png"/>
            <h4 className='desc mb-2 text-center'>Mide tu cuerpo, encuentra y publica recetas para una vida más sana</h4>
            {isAuthenticated ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <LoginButton className="button" />
        )}
        </div>
        </div>
        </div>
    )

}


export default Login