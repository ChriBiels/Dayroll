
import 'bootstrap/dist/css/bootstrap.min.css';
import AddReceta from '../screens/AddReceta';
import ShowRecetas from '../screens/ShowRecetas';
import React, { useState } from 'react';
import '../Styles/MenuRecetasPage.css'
  


function MenuRecetas(){
    const [hidden, setHidden] = useState(true);
    const getAuth = localStorage.getItem("auser")
    const getVerifi = localStorage.getItem("mv")

return(
    <div className='opt'>
    <div className='butCenter d-flex justify-content-center pt-3 pb-2'>
    {getVerifi ==='true' && getAuth !== null ?<button className='addButton' onClick={() => setHidden( e=> !e)}> Agregar Receta</button> : <div></div>}
    </div>
    {!hidden ? <div><AddReceta/></div> : null}
    <div>
    <ShowRecetas/>
    </div>
    </div>
    )
}

export default MenuRecetas
