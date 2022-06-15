//Esto pertenece al z2- TutoComponentesReact.md

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect } from 'react';
import ShowLastReceta from '../screens/ShowLastReceta';
import Galeria from './GaleriaCarousel'
import '../Styles/Home.css'
import { useAuth0 } from "@auth0/auth0-react";
import FooterWeb from './Footer';

function Home({handleSubmit, ...props}){ //Creas la función general
    //Guardar Verificacion
    const {user,isAuthenticated} = useAuth0()

    useEffect(() => {
           
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
                }
        }
        load()
    },[])
 

    return (

        <div >
        <div className='galle d-flex flex-column justify-content-center align-items-center '>
        <Galeria/>
        </div>
    <div className='bascardsGlobal d-flex flex-row justify-content-center'>
    
    <div className='ultimaReceta'>
    <ShowLastReceta></ShowLastReceta>
    </div>

    <div className='solocards mt-3'>
    <div className="blog-card">
    <div className="meta">
      <img className="photo" src="https://i.imgur.com/1rJgNen.png"/>
    </div>
    <div className="description">
      <h1>Ultima receta añadida</h1>
      <h2>¿Será la receta que buscas?</h2>
      <p>Revisa de vez en cuando la web para descubrir nuevas recetas</p>
    </div>
  </div>
    <div className="blog-card alt">
    <div className="meta">
      <img className="photo" src='https://i.imgur.com/EZqYWpj.jpg'/>
    </div>
    <div className="description">
      <h1>Crea recetas únicas</h1>
      <h2>Muestra tu creatividad</h2>
      <p> Entra al Recetario y crea nuevas recetas para compartir con el mundo</p>
    </div>
  </div>
  <div className="blog-card">
    <div className="meta">
      <img className="photo" src="https://i.imgur.com/8FHOXMs.jpg"/>
    </div>
    <div className="description">
      <h1>Buscar y probar</h1>
      <h2>Encuentra nuevos sabores</h2>
      <p>Busca entre varias recetas tu favorita y pruebala en casa</p>
    </div>
  </div>
  </div>


  </div>
  <FooterWeb/>
        </div>
  
    );
    
}
 export default Home;
