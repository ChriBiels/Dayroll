import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Row, Col} from 'react-bootstrap'
import RecetaCard from '../components/RecetaCard';
import Alert from '../components/ErrorAlert';
import "../Styles/icoCard.css"
import "../Styles/UserCard.css"

const ShowUserRecetas = () => {

    const URI = 'http://localhost:8200/receta'
    const [recetacion, setRecetas] = useState([])
    const [numRecetas, setNumRecetas] = useState(0)
    const[alert, setAlerta] = useState(false)
    const auth = localStorage.getItem('auser')
    const userName = localStorage.getItem('nick')
    const avatar = localStorage.getItem('avatar')


    useEffect(() => {
        const getRecetasNum = async () => {
            const {data} = await axios.get(`${URI}/countRecetasUser/${auth}`)
            setNumRecetas(data)
        }
        getRecetasNum()
    }, [])


    function isTrue(){
        const verify = localStorage.getItem('mv')
        if(verify === 'true')
        return <span className='verified'>Verificado</span>
        else if(verify === 'false')
        return <span className='denied text-danger'>Sin verificar</span>
        else
        return <span className='denied text-danger'>Error</span>
    }


    const mostrarAlerta = (mensaje, tipo)=>{
        setAlerta({
            msg: mensaje,
            type: tipo
        })
        setTimeout(() => {
            setAlerta(false)
        }, 3000)
    }


    const addProductHandler = async (e) => {
        const { data } = await axios.get(`${URI}/userRecetas/${auth}`)
        if(data !== '' && data !== undefined && data !== null && data !== 0)
        setRecetas(data)
        else
        mostrarAlerta('No tienes recetas agregadas','Error')
    }

 


    return (
        <div className='midder d-flex flex-column justify-content-center align-content-center align-items-center'>
          <div className="carde w-100">
    <img src={avatar} alt="Person" className="card__image"/>
    <p className="card__name">{userName}</p>
    <div className="grid-container">
      <div >
        Mis recetas: <span>{numRecetas}</span>
      </div>
      <div>
        Mail: {isTrue()}
        </div>
   
      
    </div>
    <button className='space mt-1' onClick={addProductHandler}> Cargar mis recetas</button>
  </div>


        <div className='userRecipes d-flex flex-column justify-content-center align-content-center align-items-center w-75 pt-3'>
        
               <Alert alert={alert}/>
               <Row>
                    {
                        recetacion.map(recetas => {

                            return <Col md={4} lg={6} sm={4} key={recetas.id}>
                                <RecetaCard className="dak" recetas={recetas}/>
                            </Col>
                        })
                    }
               </Row>
               </div>
      </div>
    )
}

export default ShowUserRecetas