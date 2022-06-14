import {React, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import axios from 'axios'
import '../Styles/Card.css'
import '../Styles/icoCard.css'
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from 'react-hot-toast'


const FavCard = ({ favs }) => {
    console.log("Patatas " +favs)
    const {user,isAuthenticated} = useAuth0()
    const URI = "http://localhost:8200/receta/"
    let delButton
    const auth = localStorage.getItem('auser')
   
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

    function borrarFav(){
        axios.delete(URI+"/allRecetas/deleteFav/"+favs.idrecetafav+"/"+auth).then(() =>{
            toast.success("La receta "+favs.nombre+ " ha sido eliminada de favoritos")
        }).then(()=>{
            window.location.reload(false)
        }).catch((err) => {
            toast.error("Error al eliminar "+favs.nombre+ " de favoritos")
            console.log(err)
        }) 
    }


    if(isAuthenticated ){
        delButton = <img className='icoCard' onClick={()=>borrarFav()} src='https://i.imgur.com/firZbTx.png'/>
    
    } else {
        delButton = <div className=''></div>
        
    }


    


    return (
        <>
    <Toaster position='bottom-center' gutter={8}
        toastOptions={{
            success: {
              duration: 4000,
              style:{
                background: '#00FF80',
                color: '#fff'
              },
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
                duration: 4000,
                style:{
                    background: '#A30A04',
                    color: '#fff'
                },
                theme: {
                    primary: 'red',
                    secondary: 'black',
                }
            }
          }}
            
            />
        <div className='cardList d-flex justify-content-center align-items-center'>
            <div className='genericCard shadow-lg border-3 mb-4 rounded-3' style={{ width: '18rem' }}>
             <div className='bar d-flex flex-row justify-content-between mt-1'>
                <span className='fechaCreada h6'>
               {favs.createdAt}
               </span>
               <span>{delButton}</span>
                </div>
            
                <div className='cardInterior' >
                <div className='imgMid d-flex justify-content-center'>
                    <img className='imgConfig' src={favs.imagenfav}/>
                </div>
                    <div className='onlyscroll scroll bg-light p-3'>
                    <div className='title'>{favs.nombrefav}</div>
                    <div className='cardTitle'>Contiene: </div><Card.Text className=''>{favs.tipoalimentofav}</Card.Text>
                    <div className='cardTitle'>Ingredientes: </div><Card.Text className=''>Ingredientes: {favs.ingredientesfav}</Card.Text>
                    <div className='cardTitle'>Alergenos: </div><Card.Text className=''>Alergenos: {favs.alergenosfav}</Card.Text>
                    <div className='cardTitle'>Procedimiento: </div><Card.Text className=''>{favs.descripcionfav}</Card.Text>
                    </div>
                </div>
            </div>
            </div>
           
        </>
    )
}

export default FavCard