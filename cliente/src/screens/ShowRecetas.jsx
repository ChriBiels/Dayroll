import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap'
import RecetaCard from '../components/RecetaCard';
import { MultiSelect } from 'react-multi-select-component';
import Paginacion from '../components/Paginacion.js'
import '../Styles/MenuRecetasPage.css'
import { IntoleranciaCombo, TipoAlimentoCombo } from '../components/ComboBoxGeneric';

const ShowRecetas = () => {

    const URI = 'http://localhost:8200/receta'
    const [recetacion, setRecetas] = useState([])
    const [selected, setSelected] = useState([])
    const [selectAlimento, setSelectAlimento] = useState([])
    const [loading, setLoading] = useState(false)
    const [numAllRecetas, setNumAllRecetas] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [recetasPorPagina]= useState(8)

    
    let intolerance = ''
    let tipoalimento = ''

    useEffect(() => {
        const getRecetasData = async () => {
            setLoading(true)
            const { data } = await axios.get(`${URI}/allRecetas`)
            setRecetas(data)
            setLoading(false)
        }
        getRecetasData()

        const getAllNumRecetas = async () => {
            const {data} = await axios.get(`${URI}/contarTodo/all`)
            setNumAllRecetas(data)
        }
          getAllNumRecetas()
    }, [numAllRecetas])


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
            setLoading(true)
            const { data } = await axios.get(`${URI}/allRecetas`)
            setRecetas(data) 
            setLoading(false)
        }
    

    }


    if(loading && recetacion.length === 0){
        return <h2>Cargando . . .</h2>
    }

    //Paginación
    const ultimaPagina = currentPage * recetasPorPagina
    const primeraPagina = ultimaPagina - recetasPorPagina
    const cantidadActual = recetacion.slice(primeraPagina, ultimaPagina)
    const numeroPaginas = Math.ceil(recetacion.length/recetasPorPagina)



    return (
        <>
        <div className='generalContainer'>
        <div className='filterbar d-flex flex-row align-content-center align-items-center justify-content-center '>
               <button className='filterbutton' onClick={comprobar}>Filtrar</button>
               <MultiSelect className='t-a w-25 me-1'
                             options={TipoAlimentoCombo}
                             hasSelectAll={false}
                             value={selectAlimento}
                             onChange={setSelectAlimento}
                             labelledBy="SelecAlimento"
                             valueRenderer={defaultAlimento}
                             
                         />
                <MultiSelect className='t-i w-25 ms-1'
                             options={IntoleranciaCombo}
                             hasSelectAll={false}
                             value={selected}
                             onChange={setSelected}
                             labelledBy="SelecIntrolerancia"
                             valueRenderer={defaultIntolerancia}
                             
                         />
               </div>
          
           <Container  className="recetaContainer justify-content-center">
           {!loading ? (
          <>
            <Paginacion pages = {numeroPaginas} setCurrentPage={setCurrentPage}/>
          </>
        ) : (
            <div></div>     
        )}
               <h1 className='text-center'>Recetario</h1> <span>Recetas registradas: {numAllRecetas}</span>
               <Row className='ro d-flex justify-content-center align-items-center'>
                    {
                        cantidadActual.map(recetas => {

                            return <Col md={6} lg="auto" sm={8} key={recetas.id}>
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