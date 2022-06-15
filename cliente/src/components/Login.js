import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login/Login.css';
import '../Styles/Navbar.css'
import { useAuth0 } from '@auth0/auth0-react';
import Wall from '../Images/video/loginpaper.mp4'
import LoginButton from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useEffect } from 'react';


function Login(){
    const {user, isAuthenticated } = useAuth0();
    useEffect(() => {
        if(isAuthenticated){
          const load = async () =>{
          const getUsuario = await user.sub
          const getNickName = await user.nickname
          const getAvatar = await user.picture
          const getMailVeri = await user.email_verified
          if(getUsuario !== null && getUsuario !== '' && getUsuario !== undefined){
              const rework = getUsuario.split('|').pop()
              localStorage.setItem('auser', rework)
              localStorage.setItem('nick',getNickName)
              localStorage.setItem('avatar',getAvatar)
              localStorage.setItem('mv',getMailVeri)
              window.location.href= window.location.origin + '/home'
              }else {
                console.error("Error al obtener datos de usuario")
              }
          }
          load()
        }
      },[isAuthenticated])

    return (
        <div className='bas h-100'>
        <div className=''>
            <video autoPlay loop muted className='wallpaper w-100 h-100 position-absolute'>
                <source src={Wall} type="video/mp4"></source>
            </video>
        <div id='container'className='container d-flex border-0'>
        <img className='imga w-25 h-25' src="https://i.imgur.com/uYYuxHa.png"/>
            <h4 className='desc mb-2 text-center'>Encuentra o sube tu receta favorita</h4>
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