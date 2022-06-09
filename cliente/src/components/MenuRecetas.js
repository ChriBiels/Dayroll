
import 'bootstrap/dist/css/bootstrap.min.css';
import AddReceta from '../screens/AddReceta';
import ShowRecetas from '../screens/ShowRecetas';
import React, { useState } from 'react';
import '../Styles/MenuRecetasPage.css'
  


function MenuRecetas(){
    const [hidden, setHidden] = useState(true);

return(
    <div className='opt'>
    <div className='butCenter d-flex justify-content-center pt-3 pb-2'>
    <button className='addButton' onClick={() => setHidden( e=> !e)}>
        Agregar Receta
    </button>
    </div>
    {!hidden ? <div><AddReceta/></div> : null}
    <div>
    <ShowRecetas/>
    </div>
    </div>
    )
}

export default MenuRecetas
