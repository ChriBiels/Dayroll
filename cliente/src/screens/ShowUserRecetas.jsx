import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Row, Col} from 'react-bootstrap'
import RecetaCard from '../components/RecetaCard';
import Paginacion from '../components/Paginacion.js'
import "../Styles/icoCard.css"
import "../Styles/UserCard.css"
import FavCard from '../components/FavCard';

const ShowUserRecetas = () => {

    const URI = 'http://localhost:8200/receta'
    const [recetacion, setRecetas] = useState([])
    const [numRecetas, setNumRecetas] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [recetasPorPagina]= useState(8) //Contenido paginas

    const [displayInfo, setDisplay] = useState(0)
    
    //favs
    const [favstars, setFavoritos] =useState ([])
    const [paginaActual, setPaginaActual] = useState(1)
    const [favsPorPagina] = useState(8)
    const [loadingFav, setLoadingFav] = useState(false)
    const [numFavs, setNumFavs] = useState(0)

    const auth = localStorage.getItem('auser')
    const userName = localStorage.getItem('nick')
    const avatar = localStorage.getItem('avatar')


    useEffect(() => {
        const getRecetasNum = async () => {
            const {data} = await axios.get(`${URI}/countRecetasUser/${auth}`)
            setNumRecetas(data)
        }
        getRecetasNum()

        const getFavsNum = async () => {
          const {data} = await axios.get(`${URI}/allRecetas/numFavs/${auth}`)
          setNumFavs(data)
      }
        getFavsNum()
    }, [numFavs, numRecetas])

    console.log(auth)
    

    function isTrue(){
        const verify = localStorage.getItem('mv')
        if(verify === 'true')
        return <span className='verified'>Verificado</span>
        else if(verify === 'false')
        return <span className='denied text-danger'>Sin verificar</span>
        else
        return <span className='denied text-danger'>Error</span>
    }

    const addProductHandler = async (e) => {
        setDisplay(1)
        setLoading(true)
        const { data } = await axios.get(`${URI}/userRecetas/${auth}`)
        if(data !== '' && data !== undefined && data !== null && data !== 0)
        setRecetas(data)

        setLoading(false)
    }

    const displayFavs = async (e) => {
      setDisplay(2)
      setLoadingFav(true)
      const { data } = await axios.get(URI+"/allRecetas/allFavs/"+auth)
      console.log(data)
      if(data !== '' && data !== undefined && data !== null && data !== 0)
      setFavoritos(data)
      else{
        console.log("Error obtener datos")
      }
      setLoadingFav(false)
  }
    
    if(loading && recetacion.length === 0){
        return <h2>Cargando . . .</h2>
    }
     //Paginación
     const ultimaPagina = currentPage * recetasPorPagina
     const primeraPagina = ultimaPagina - recetasPorPagina
     const cantidadActual = recetacion.slice(primeraPagina, ultimaPagina)
     const numeroPaginas = Math.ceil(recetacion.length/recetasPorPagina)


    if(loadingFav && favstars.length === 0){
      return <h2> Cargando . . .</h2>
    }
     //Paginacion Favoritos
    const ultimaPaginaFav = paginaActual * favsPorPagina
    const primeraPaginaFav = ultimaPaginaFav - favsPorPagina
    const cantidadActualFav = favstars.slice(primeraPaginaFav, ultimaPaginaFav)
    const numeroPaginasFav = Math.ceil(favstars.length/cantidadActualFav)


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
        Favoritos: <span>{numFavs}</span>
        </div>
    </div>
      <div>
        Mail: {isTrue()}
      </div>

  </div>
  <div className='buttccount d-flex flex-row justify-content-center'>
      <button className='spac me-1 mb-2 rounded-3' onClick={addProductHandler}> Cargar mis recetas</button>
      <button className='spac ms-1 mb-2 rounded-3' onClick={displayFavs}> Cargar mis favoritos</button>
  </div>
       {displayInfo===1 ? (<div className='userRecipes d-flex flex-column justify-content-center align-content-center align-items-center w-75 pt-3'>
               
               {!loading ? (
          <>
            <Paginacion pages = {numeroPaginas} setCurrentPage={setCurrentPage}/>
          </>
        ) : (
            <div></div>     
        )}
               <Row className='ro d-flex justify-content-center align-items-center'>
                    {
                        cantidadActual.map(recetas => {

                            return <Col md={6} lg="auto" sm={8} key={recetas.id}>
                                <RecetaCard className="dak" recetas={recetas}/>
                            </Col>
                        })
                    }
               </Row>
       </div> ) : (<></>) }
        


     {displayInfo===2 ? (<div className='userRecipes d-flex flex-column justify-content-center align-content-center align-items-center w-75 pt-3'>
               
               {!loading ? (
          <>
            <Paginacion pages = {numeroPaginasFav} setCurrentPage={setPaginaActual}/>
          </>
        ) : (
            <div></div>     
        )}
               <Row className='ro d-flex justify-content-center align-items-center'>
                    {
                        cantidadActualFav.map(favs => {

                            return <Col md={6} lg="auto" sm={8} key={favs.id}>
                                <FavCard className="dak" favs={favs}/>
                            </Col>
                        })
                    }
               </Row>
      </div> ) : (<></>) }
      
      
      </div>
    )
}

export default ShowUserRecetas