//Esto pertenece al z2- TutoComponentesReact.md

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Alert from './ErrorAlert'
import Galeria from './GaleriaCarousel'
import Select from 'react-select'
import MostrarStats from '../componentshowdb/ShowAllEstadisticas';
import '../Styles/Home.css'
import { useAuth0 } from "@auth0/auth0-react";
function Home({handleSubmit, ...props}){ //Creas la función general
    const[alert, setAlerta] = useState(false)
    const [selected, setSelected] = useState([])
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
    const numuser = localStorage.getItem('auser')

    const mostrarAlerta = (mensaje, tipo)=>{
        setAlerta({
            msg: mensaje,
            type: tipo
        })
        setTimeout(() => {
            setAlerta(false)
        }, 3000)
        

  
    }

   
    const genre = [
        {label: "-",value: "-"},
        {label: "Hombre",value: "hombre"},
        {label: "Mujer",value: "mujer"}
    ]
    const[genreResult, genreValue]=useState(genre.label)
    const handler = e => {
        genreValue(e.label)
    }


    const activity = [
    {label: "-",value: "-"},
    {label: "Activo",value: "activo"},
    {label: "Casual",value: "casual"},
    {label: "Sedentarismo",value: "sedentarismo"},
    ]
    const[actResult, actValue]=useState(activity.label)
    const handlerActivity = e => {
    actValue(e.label)
    }   


    const intolerancia = [
    {label: "Gluten",value: "gluten"},
    {label: "Lactosa",value: "lactosa"},
    {label: "Histamina",value: "histamina"},
    {label: "Fructosa",value: "fructosa"},
    {label: "Sacarosa",value: "sacarosa"},
]

    const prob = ()=>{
        if((actResult === "-" || actResult === "" || actResult === undefined) &&
        (genreResult === "-" || genreResult === "" || genreResult === undefined)){
       mostrarAlerta("No has seleccionado Género ni Estado de Actividad", "Error ") 
        }
        else if(genreResult === "-" || genreResult === "" || genreResult === undefined){
        mostrarAlerta("No has seleccionado un Género", "Error ")
        }
        else if(actResult === "-" || actResult === "" || actResult === undefined){
        mostrarAlerta("No has seleccionado un Estado de Actividad", "Error ")
        }

    }


    const customValueRenderer = (selected, _options) => {
        return selected.length
          ? selected.map(({ label }) => label)
          : "Ninguna";
        };
    
        
    return (

        (numuser != '') &&(
        <div >
        <div className='galle d-flex flex-column justify-content-center align-items-center '>
        <Galeria/>
        </div>
        <div className='divisor mb-2'>    </div>
      <Alert alert={alert}/>
      <div className='global'>
    
      <div className='title d-flex flex-column justify-content-center align-items-center'>
      
      <h2>Mide tus objetivos</h2>
      </div>
        <div className='box d-flex flex-column justify-content-center align-items-center flex-lg-row'>
        <div className='itemOne me-lg-5 mt-lg-3 ms-lg-5 mb-lg-3'>
        <label>Genero</label>
        <div className='selectordiv'>
        <Select options={genre} defaultValue={{ label: "-", value: "-" }} onChange={handler}/>
        </div>
        <label>Estado de Actividad</label>
        <div className='selectordiv'>
        <Select options={activity} defaultValue={{ label: "-", value: "-" }}  onChange={handlerActivity}/>
        </div>
        <label>Peso</label>
        <div>
        <input
            type='number'
            value={props.peso}
            name='peso'
            placeholder=''
            onChange={props.cambiarPeso}
            
        ></input>
        </div>
        </div>
        <div className='itemTwo'>
        <label>Altura</label>
        <div>
        <input
            type='number'
            value={props.altura}
            name='altura'
            placeholder=''
            onChange={props.cambiarAltura}
            
        ></input>
        </div>

        <div className='selectbox'>
        <label>Intolerancia</label>
        <div>
        <MultiSelect
            options={intolerancia}
            hasSelectAll={false}
            value={selected}
            onChange={setSelected}
            labelledBy="Seleccionar"
            valueRenderer={customValueRenderer}
        />
        </div>
        </div>
        </div>
  
        
        

        
        </div>
        <div className='box d-flex flex-column justify-content-center align-items-center pb-5 pt-2'>
        <button className='defaultButton rounded-3' type='button' onClick={prob}>Comprobar</button> 
        </div>



      
        <MostrarStats></MostrarStats>
      





        <div className='container d-flex flex-column justify-content-center text-center flex-lg-row justify-content-lg-between '>

        <div className='card'>
        <h3>¿Qué es esto?</h3>
        <p>CONTENIDO A MOSTRAR LOREMLOREMLOREMLORE
            MLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMOREMLOREMLOOREMLOREMLO
            LOREMLOREMLOREM</p>
        </div>

        <div className='card'>
        <h3>¿Qué toma de base?</h3>
        <p>CONTENIDO A MOSTRAR LOREM LOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREM</p>
        </div>

        <div className='card'>
        <h3>Comidas</h3>
        <p>CONTENIDO A MOSTRAR LOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREM</p>
        </div>
        
        
        </div>


  

        </div>
        
        </div>
    ));
    
}
 export default Home;
