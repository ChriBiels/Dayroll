import {React, useState, useEffect } from 'react'
import {Card, Modal, Button, Form, ToastBody } from 'react-bootstrap'
import '../Styles/Card.css'
import '../Styles/icoCard.css'
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { MultiSelect } from 'react-multi-select-component';
import {Toaster, toast} from 'react-hot-toast'



const RecetaCard = ({ recetas }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([])
    const [selectAlimento, setSelectAlimento] = useState([])
    const {user,isAuthenticated} = useAuth0()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showBorrado, setShowBorrado] = useState(false);
    const handleCerrarBorrado = () => setShowBorrado(false);
    const handleMostrarBorrado = () => setShowBorrado(true);
    const URL = 'http://localhost:8200/receta/'
    
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
    
    
    const auth = localStorage.getItem('auser')
    let updButton, delButton, favButton
    const [updateData, setUpdates] = useState({})
    const [updateDesc, setUpdateDesc] = useState({})

    const intolerancia = [
        {label: "Gluten",value: "gluten"},
        {label: "Lactosa",value: "lactosa"},
        {label: "Histamina",value: "histamina"},
        {label: "Fructosa",value: "fructosa"},
        {label: "Sacarosa",value: "sacarosa"},
    ]

    const tipoAlimento = [
        {label: "Exóticos",value: "Productos exoticos"},
        {label: "Carne Roja",value: "Carne roja"},
        {label: "Carne Blanca",value: "Carne blanca"},
        {label: "Pescado",value: "Pescado"},
        {label: "Moluscos",value: "Molusco"},
        {label: "Tuberculos",value: "Tuberculos"},
        {label: "Hongos",value: "Hongos"},
        {label: "Verduras",value: "Verduras"},
        {label: "Huevo",value: "Huevo"},
        {label: "Pastas",value: "Pastas"},
        {label: "Cereales",value: "Cereales"},
        {label: "Legumbres",value: "Legumbres"},
        {label: "Fruta",value: "Fruta"},
        {label: "Hortalizas",value: "Hortalizas"},
        {label: "Granos",value: "Granos"},
        {label: "Lacteos",value: "Lacteos"},
        {label: "Alcohol",value: "Alcohol"},
        {label: "Aceite",value: "Aceite"},
        {label: "Frutos secos",value: "Frutos secos"},
    ]

    function deleteReceta(){
        axios.delete(URL+recetas.id+'/'+auth).then(() =>{
            window.location.reload(false)
        }) 
    }

    if(auth === recetas.auth ){
        updButton = <img className='icoCard' onClick={()=>handleShow()} src='https://i.imgur.com/A1ZvXJr.png'/>
        delButton = <img className='icoCard' onClick={()=>handleMostrarBorrado()} src='https://i.imgur.com/firZbTx.png'/>
    
    } else {
        updButton = <div className='spaceNoUser'></div>
        delButton = <div className='spaceNoUser'></div>
        
    }

    if(isAuthenticated){
        favButton = <img className='icoCard' onClick={()=>addFavs()} src='https://i.imgur.com/C9B9kZY.png'/> 
    }else {
        favButton = <div className='spaceNoUser'></div>
    }

    const customAlimento = (selected, _options) => {
        return selected.length
          ? selected.map(({ label }) => label)
          : recetas.tipoalimento;
        };

    const customIntol = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => label)
            : recetas.intolerancia;
        };


    async function updateReceta(){
        var object = Object.assign({}, updateData, updateDesc)
          axios.put(URL+recetas.id+'/'+auth, object).then(()=>{
          window.location.reload(false)    
          })
        }

    async function addFavs(){
        //Comprobar si el favorito agregado ya fue agregado antes
        const { data } = await axios.get(URL+'allRecetas/exist/'+auth+'/'+recetas.id)

    if(data.idrecetafav !== recetas.id){
      await axios.post(URL+'addReceta/addFavs', {
        auth: auth,
        imagenfav: recetas.imagen,
        tipoalimentofav: recetas.tipoalimento,
        ingredientesfav: recetas.ingredientes,
        alergenosfav: recetas.alergenos,
        descripcionfav: recetas.descripcion,
        nombrefav: recetas.nombre,
        idrecetafav: recetas.id
       })
       toast.success("La receta "+recetas.nombre+ " ha sido añadida a favoritos")
    }
    else{
        toast.error("Ya tenía esta receta añadida de favoritos")

    }
    }
    

    return (
        <>
        <Modal show={showBorrado} onHide={handleCerrarBorrado}>
            <Modal.Header closeButton>
                <Modal.Title>Borrar: {recetas.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className=' d-flex justify-content-center mt-1 p-1 border-0'>
               <h5>La receta {recetas.nombre} será eliminada</h5>
            </div>
            </Modal.Body>
            <Modal.Footer>
                 <Button variant="secondary" onClick={handleCerrarBorrado}>
                     Cancelar
                    </Button>
                 <Button className='actu' type='submit' onClick={deleteReceta}>
                    Confirmar
                    </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar: {recetas.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className=' d-flex justify-content-center mt-5 p-1 border-0'>
                <Form onSubmit={ e => {
                    e.preventDefault()
                }}>
                <div className='imgMid d-flex justify-content-center'>
                    <img className='imgConfig' src={recetas.imagen}/>
                </div>
                    <Form.Group className="mb-1" controlId="nombre">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            defaultValue={recetas.nombre}
                            required={true}
                            onChange={(e) => {
                                let valName = e.target.value
                                setUpdates({ nombre: valName })
                            }}
                            type="text"
                           
                          />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="descripcion">
                        <Form.Label>Procedimiento * </Form.Label>
                        <Form.Control
                            defaultValue={recetas.descripcion}
                            as="textarea"
                            required={true}
                            onChange={(e) => {
                                let val = e.target.value
                                setUpdateDesc({ descripcion: val })
                            }}
                             />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" controlId="tipoalimento">
                        <Form.Label>[x]Contiene</Form.Label>
                        <MultiSelect
                             options={tipoAlimento}
                             hasSelectAll={false}
                             value={selectAlimento}
                             disabled={true}
                             onChange={setSelectAlimento} 
                             labelledBy="SelecAlimento"
                             valueRenderer={customAlimento}
                             
                         />
                    </Form.Group>

                  
                    <Form.Group className="mb-1" controlId="ingredientes">
                        <Form.Label>[x]Ingredientes</Form.Label>
                        <Form.Control
                            defaultValue={recetas.ingredientes}
                            as="textarea"
                            disabled={true}
                            onChange={(e) => {
                                let val = e.target.value
                                setUpdates({ ingredientes: val })
                            }}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="alergenos">
                        <Form.Label> [x]Alergenos </Form.Label>
                        <MultiSelect
                             options={intolerancia}
                             hasSelectAll={false}
                             value={selected}
                             disabled={true}
                             onChange={setSelected}
                             labelledBy="Seleccionar"
                             valueRenderer={customIntol}
                         />
                    </Form.Group>
                </Form>
            </div>
            </Modal.Body>
            <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                     Close
                    </Button>
                 <Button className='actu' type='submit' onClick={updateReceta}>
                    Actualizar
                    </Button>
                
            </Modal.Footer>
        </Modal>
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
               {recetas.createdAt}
               </span>
                <span>
                   {favButton}
                   {updButton}
                   {delButton}
                </span>
                </div>
            
                <div className='cardInterior' >
                <div className='imgMid d-flex justify-content-center'>
                    <img className='imgConfig' src={recetas.imagen}/>
                </div>
                    <div className='onlyscroll scroll bg-light p-3'>
                    <div className='title'>{recetas.nombre}</div>
                    <div className='cardTitle'>Contiene: </div><Card.Text className=''>{recetas.tipoalimento}</Card.Text>
                    <div className='cardTitle'>Ingredientes: </div><Card.Text className=''>Ingredientes: {recetas.ingredientes}</Card.Text>
                    <div className='cardTitle'>Alergenos: </div><Card.Text className=''>Alergenos: {recetas.alergenos}</Card.Text>
                    <div className='cardTitle'>Procedimiento: </div><Card.Text className=''>{recetas.descripcion}</Card.Text>
                    </div>
                </div>
            </div>
            </div>
           
        </>
    )
}

export default RecetaCard