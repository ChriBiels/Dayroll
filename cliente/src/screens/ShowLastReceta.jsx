import React, { useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import RecetaCard from '../components/RecetaCard'
import axios from 'axios'


const ShowLastReceta = () => {
    const URI = 'http://localhost:8200/receta/allRecetas/lastReceta'
    const [recetar, setRecetas] = useState([])


    useEffect(() => {
        const getRecetasNum = async () => {
            const {data} = await axios.get(URI)
            setRecetas(data)

        }
        getRecetasNum()
    }, [])


    return(<>
         <div className='userRecipes d-flex flex-column justify-content-center align-content-center align-items-center w-75 pt-3'>
               <Row className='ro d-flex justify-content-center align-items-center'>
                            <Col md={6} lg="auto" sm={8} key={recetar.id}>
                                <RecetaCard className="dak" recetas={recetar}/>
                            </Col> 
               </Row>
         </div>
    </>)

}

export default ShowLastReceta