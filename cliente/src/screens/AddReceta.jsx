import axios from 'axios'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageStorage } from '../firebase/firebase'
import { MultiSelect } from 'react-multi-select-component';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {v4} from "uuid"
import Alert from '../components/ErrorAlert';
import '../Styles/MenuRecetasPage.css'

const AddReceta = ({ receta }) => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ingredientes, setIngredientes] = useState('')
    const [imagen, setImage] = useState('')
    const [selected, setSelected] = useState([])
    const [selectAlimento, setSelectAlimento] = useState([])
    const [url, setUrl] = useState('')
    const URI = 'http://localhost:8200/receta'
    const formData = new FormData()
    const[alert, setAlerta] = useState(false)
    
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

    const mostrarAlerta = (mensaje, tipo)=>{
        setAlerta({
            msg: mensaje,
            type: tipo
        })
        setTimeout(() => {
            setAlerta(false)
        }, 3000)
        

  
    }

    const customValueRenderer = (selected, _options) => {
        return selected.length
          ? selected.map(({ label }) => label)
          : "Ninguna";
        };


        const auth = localStorage.getItem('auser')


    const addProductHandler = async (e) => {
        e.preventDefault()
        const imageReferencia = ref(imageStorage, `imagen/${imagen.name + v4()}`)

        uploadBytes(imageReferencia, imagen)
        .then(() => {
           getDownloadURL(imageReferencia)
                .then(  (url)=>{
                      setUrl(url);
                      
                      formData.append('imagen', url)
                      console.log("Carga de imagen Completada")
                      formData.append('nombre', nombre)
                      formData.append('descripcion', descripcion)
                      selectAlimento.forEach(element => {
                          tipoalimento = tipoalimento + element.value+","
                      })
                      formData.append('tipoalimento', tipoalimento)
                      formData.append('ingredientes', ingredientes)
                      selected.forEach(element => {
                          selectbox = selectbox + element.value+","
                      });
                      formData.append('alergenos', selectbox)
                      formData.append('auth', auth)
                      axios.post(`${URI}/addReceta`, formData)
                   })
                .catch((err) => {
                console.log(err.message, "Error al obtener imagen")
              });
              
        })
        .catch((err)=>{
            console.log(err.message)
        })

        
  


    }

    return (
        <>
        <div className='generalContainer d-flex justify-content-center align-items-center'>
            <div className=' recetaContainer d-flex flex-column w-25 justify-content-center align-items-center align-content-center pt-5 p-1'>
                <Form onSubmit={addProductHandler} method="POST" encType='multipart/form-data' className='formulario flex-column'>
                <Alert alert={alert}/>
                
                <Form.Group controlId="fileName" className="mb-1">
                    <Form.Label>Subir Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        name='imagen'
                        onChange={(e) => setImage(e.target.files[0])}
                        size="lg"
                        required='true'
                         />
                </Form.Group>

                    <Form.Group className="mb-1" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            required={true}
                          />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="descripcion">
                        <Form.Label>Tutorial </Form.Label>
                        <Form.Control
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            as="textarea"
                            required={true}
                            minLength={40}
                             />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" controlId="tipoalimento">
                        <Form.Label>Contiene</Form.Label>
                        <MultiSelect
                             options={tipoAlimento}
                             hasSelectAll={false}
                             value={selectAlimento}
                             onChange={setSelectAlimento}
                             required={true}
                             labelledBy="SelecAlimento"
                             
                         />
                    </Form.Group>

                  
                    <Form.Group className="mb-1" controlId="ingredientes">
                        <Form.Label>Ingredientes</Form.Label>
                        <Form.Control
                            value={ingredientes}
                            onChange={(e) => setIngredientes(e.target.value)}
                            as="textarea"
                            required={true}
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
                             valueRenderer={customValueRenderer}
                         />
                    </Form.Group>

                    <Form.Group hidden={true} className="mb-3 " controlId="auth">
                        <Form.Label>Autentificación</Form.Label>
                        <Form.Control
                            value={auth}
                            onChange={null}
                            as="textarea"
                           />
                    </Form.Group>

                <div className=' d-flex justify-content-center pb-4'>
                    <button className='addButton' type='submit'>
                        Agregar Receta
                    </button>
                </div>
                </Form>
            </div>
        </div>
        </>
    )
}


export default AddReceta