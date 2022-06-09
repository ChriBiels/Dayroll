import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap'
import RecetaCard from '../components/RecetaCard';
import { MultiSelect } from 'react-multi-select-component';
import '../Styles/MenuRecetasPage.css'

const ShowRecetas = () => {

    const URI = 'http://localhost:8200/receta'
    const [recetacion, setRecetas] = useState([])
    const [selected, setSelected] = useState([])
    const [selectAlimento, setSelectAlimento] = useState([])

    const intolerancia = [
        {label: "Gluten",value: "gluten"},
        {label: "Lactosa",value: "lactosa"},
        {label: "Histamina",value: "histamina"},
        {label: "Fructosa",value: "fructosa"},
        {label: "Sacarosa",value: "sacarosa"},
    ]
    let intolerance = ''

    const tipoAlimento = [
        {label: "Exóticos",value: "Productos%20exoticos"},
        {label: "Carne Roja",value: "Carne%20roja"},
        {label: "Carne Blanca",value: "Carne%20blanca"},
        {label: "Pescado",value: "Pescado"},
        {label: "Moluscos",value: "Molusco"},
        {label: "Verduras",value: "Verduras"},
        {label: "Huevo",value: "Huevo"},
        {label: "Cereales",value: "Cereales"},
        {label: "Fruta",value: "Fruta"},
        {label: "Hortalizas",value: "Hortalizas"},
        {label: "Granos",value: "Granos"},
        {label: "Lacteos",value: "Lacteos"},
        {label: "Alcohol",value: "Alcohol"},
        {label: "Aceite",value: "Aceite"},
        {label: "Frutos secos",value: "Frutos%20secos"},
    ]
    let tipoalimento = ''

    useEffect(() => {
        const getRecetasData = async () => {
            const { data } = await axios.get(`${URI}/allRecetas`)
            setRecetas(data)
        }
        getRecetasData()
    }, [])

    const defaultAlimento = (selected, _options) => {
        return selected.length
         ? selected.map(({ label }) => label)
        : "Tipo alimento";
        };
    const defaultIntolerancia = (selected, _options) => {
        return selected.length
        ? selected.map(({ label }) => label)
        : "Intolerancia";
        };

    selectAlimento.forEach(element => {
            tipoalimento = tipoalimento + element.value+","
            console.log(tipoalimento)
        })

    selected.forEach(element => {
            intolerance = intolerance + element.value+","
        });

    const comprobar = async() => {
        if(tipoalimento !== null && tipoalimento !== '' && tipoalimento !== undefined){
            setRecetas([])
            const { data } = await axios.get(`${URI}/allRecetasTipoAlimento/${tipoalimento}`)
            setRecetas(data)
        }else if(intolerance !== null && intolerance !== '' && intolerance !== undefined){
            setRecetas([])
            const { data } = await axios.get(`${URI}/intolerancias/${intolerance}`)
            setRecetas(data)
        }else if (intolerance !== null && intolerance !== '' && intolerance !== undefined &&
        tipoalimento !== null && tipoalimento !== '' && tipoalimento !== undefined){
            setRecetas([])
            const { data } = await axios.get(`${URI}/alimentoIntolerancia/${tipoalimento}/${intolerance}`)
            setRecetas(data)
        }else {
            setRecetas([])
            const { data } = await axios.get(`${URI}/allRecetas`)
            setRecetas(data) 
        }
       
       
    }


    return (
        <>
        <div className='generalContainer'>
        <div className='filterbar d-flex flex-row align-content-center align-items-center justify-content-center '>
               <button className='filterbutton' onClick={comprobar}>Filtrar</button>
               <MultiSelect className='t-a w-25 me-1'
                             options={tipoAlimento}
                             hasSelectAll={false}
                             value={selectAlimento}
                             onChange={setSelectAlimento}
                             labelledBy="SelecAlimento"
                             valueRenderer={defaultAlimento}
                             
                         />
                <MultiSelect className='t-i w-25 ms-1'
                             options={intolerancia}
                             hasSelectAll={false}
                             value={selected}
                             onChange={setSelected}
                             labelledBy="SelecIntrolerancia"
                             valueRenderer={defaultIntolerancia}
                             
                         />
               </div>
          
           <Container  className="recetaContainer justify-content-center p-2">
               <h1 className='text-center'>Recetario</h1>
               <Row>
                    {
                        recetacion.map(recetas => {

                            return <Col md={6} lg={4} sm={12} key={recetas.id}>
                                <RecetaCard recetas={recetas} />
                            </Col>
                        })
                    }
               </Row>


           </Container>

           </div>
        </>
    )
}

export default ShowRecetas