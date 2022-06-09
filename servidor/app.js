import express from "express";
import cors from 'cors'
//Conexion bd
import db from "./database/database.js";
import homeRoutes from './routes/routes.js'
import recetaRoutes from './routes/recetaRoutes.js'
const app = express()
app.use( cors() )
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/stats', homeRoutes)

//Router
app.use('/receta', recetaRoutes)

//Folder Gallery
app.use('/Images', express.static('./Images'))

//Comprobaciones
try {
    await db.authenticate()
    console.log('Conexión a la base de datos. OK')
} catch (error) {
    console.log(`Error de conexión a la base de datos: ${error}`)
    
}

app.get('/', (req, res)=>{
    res.send('Backend funcionado . . .')
})



app.listen(8200, ()=> {
    try{
        console.log('Servidor conectado en http://localhost:8200/')
    }catch(error){
        console.log('Error al arrancar el servidor: ' + error)
    }
    
})