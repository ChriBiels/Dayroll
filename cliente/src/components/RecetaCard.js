import {React, useState, useEffect } from 'react'
import { Alert, Card, Modal, Button, Form } from 'react-bootstrap'
import '../Styles/Card.css'
import '../Styles/icoCard.css'
import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component';



const RecetaCard = ({ recetas }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([])
    const [selectAlimento, setSelectAlimento] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const URL = 'http://localhost:8200/receta/'
    const auth = localStorage.getItem('auser')
    let updButton, delButton

    const intolerancia = [
        {label: "Gluten",value: "gluten"},
        {label: "Lactosa",value: "lactosa"},
        {label: "Histamina",value: "histamina"},
        {label: "Fructosa",value: "fructosa"},
        {label: "Sacarosa",value: "sacarosa"},
    ]
    let selectbox = ''

    const tipoAlimento = [
        {label: "Exóticos",value: "Productos exoticos"},
        {label: "Carne Roja",value: "Carne roja"},
        {label: "Carne Blanca",value: "Carne blanca"},
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
        {label: "Frutos secos",value: "Frutos secos"},
    ]
    let tipoalimento = ''




    function deleteReceta(url,id,auth){
        axios.delete(url+id+'/'+auth)
        window.location.reload(false)
    }

    function updateReceta(url,id,content){
        selectAlimento.forEach(element => {
            tipoalimento = tipoalimento + element.value+","
        })

        selected.forEach(element => {
            selectbox = selectbox + element.value+","
        });

        axios.put(url+id, content)

    }

    if(auth === recetas.auth ){
        updButton = <img className='icoCard' onClick={()=>handleShow()} src='https://i.imgur.com/Kr71g3Z.png'/>
        delButton = <img className='icoCard' onClick={()=>deleteReceta(URL, recetas.id, auth)} src='https://i.imgur.com/WLur40x.png'/>
    } else {
        updButton = <div className='spaceNoUser'></div>
        delButton = <div className='spaceNoUser'></div>
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

    return (
        <>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar: {recetas.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className=' d-flex justify-content-center mt-5 p-1 border-0'>

                
                <Form>
                <div className='imgMid d-flex justify-content-center'>
                    <img className='imgConfig' src={recetas.imagen}/>
                </div>
                    <Form.Group className="mb-1" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            value={recetas.nombre}
                            type="text"
                          />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="descripcion">
                        <Form.Label>Descripcion </Form.Label>
                        <Form.Control
                            value={recetas.descripcion}
                            as="textarea"
                             />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" controlId="tipoalimento">
                        <Form.Label>Contiene</Form.Label>
                        <MultiSelect
                             options={tipoAlimento}
                             hasSelectAll={false}
                             value={selectAlimento}
                             onChange={setSelectAlimento}
                             labelledBy="SelecAlimento"
                             valueRenderer={customAlimento}
                             
                         />
                    </Form.Group>

                  
                    <Form.Group className="mb-1" controlId="ingredientes">
                        <Form.Label>Ingredientes</Form.Label>
                        <Form.Control
                            value={recetas.ingredientes}
                            as="textarea"
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="alergenos">
                        <Form.Label>Alergenos</Form.Label>
                        <MultiSelect
                             options={intolerancia}
                             hasSelectAll={false}
                             value={selected}
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
                 <Button variant="primary" onClick={updateReceta}>
                    Actualizar
                    </Button>
            </Modal.Footer>
        </Modal>
        <div className='cardList d-flex justify-content-center align-items-center'>
            <Card className='cardDesign shadow-lg border-3 mb-4' style={{ width: '18rem' }}>
             <div className='bar d-flex flex-row justify-content-between'>
                   {updButton}
                   {delButton}
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
            </Card>
            </div>
           
        </>
    )
}

export default RecetaCard