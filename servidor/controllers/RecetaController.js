
import Recetario from "../models/RecetaModel.js";
import multer from "multer";
import * as path from 'path'
import { Op } from "sequelize";



export const addReceta = async (req, res) => {
    let info={
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipoalimento: req.body.tipoalimento,
        ingredientes: req.body.ingredientes,
        alergenos: req.body.alergenos,
        auth: req.body.auth,
        imagen: req.body.imagen
    }
    try {
        console.log("----------------------------")
        console.log(info)
        await Recetario.create(info)
        res.json({
            "message":"Las recetas se han guardado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
    
}



//Mostrar todos los registros
export const getAllRecetas = async (req, res) => {
    try{
        const allRecetas = await Recetario.findAll()
        res.json(allRecetas)
    }catch(error){
        res.json({message: error.message})
    }
}

//Mostrar Todas las recetas de un usuario en concreto
export const getAllUserRecetas = async (req, res) => {
    try {
        const receta = await Recetario.findAll({
            where:{
                auth: req.params.auth
            }
        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}


//Filtrar todas las recetas por ingrediente
export const getAllFilterIngredientReceta = async (req, res) => {
    try {
        const receta = await Recetario.findAll({
            where:{
                tipoalimento: {
                    [Op.like]: `%${req.params.tipoalimento}%`
                } 
            }
        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}


//Filtrar todas las recetas por Intolerancias
export const getAllFilterIntolerancia = async (req, res) => {
    try {
        const receta = await Recetario.findAll({
            where:{
                alergenos: {
                    [Op.like]: `%${req.params.alergenos}%`
                } 
            }
        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Filtrar todas las recetas por Intolerancias y tipo de Alimento
export const getAllAlimentoIntolerancia = async (req, res) => {
    try {
        const receta = await Recetario.findAll({
            where:{
                [Op.and]: [
                    {tipoalimento: {[Op.like]: `%${req.params.tipoalimento}%`}},
                    {alergenos: {[Op.like]: `%${req.params.alergenos}%`}}

                ]
            }

            

        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Numero recetas creadas por un usuario
export const showNumberUserRecetas = async (req, res) => {
    try {
        const receta = await Recetario.count({
            where:{
                auth: req.params.auth
            }
        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Numero recetas que contienen cierto tipo de ingrediente
export const showCountIngrediente = async (req, res) => {
    try {
        const receta = await Recetario.count({
            where:{
                tipoalimento: {
                    [Op.like]: `%${req.params.tipoalimento}%`
                } 
            }
        })
        res.json(receta)
    } catch (error) {
        res.json({message: error.message})
    }
}


//Numero recetas totales
export const showCountAll = async (req, res) => {
    try{
        const allRecetas = await Recetario.count({
            where:{
                id: {
                    [Op.gte]: 0
                }
            }
        })
        res.json(allRecetas)
    }catch(error){
        res.json({message: error.message})
    }
}




//Mostrar un registro por id
export const getReceta = async (req, res) => {
    try {
        const receta = await Recetario.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(receta[0])
    } catch (error) {
        res.json({message: error.message})
    }
}



//Usuario Update una receta
export const updateReceta = async(req, res) =>{
    try {
        await Recetario.update(req.body, {
            where: { 
                id: req.params.id
                }
        })
        res.json({
            "message":"Actualizado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


//Usuario Eliminar una receta
export const deleteReceta = async(req, res)=>{
    try {
        await Recetario.destroy({
            where: { 
                id: req.params.id,
                auth: req.params.auth
               }
        })

        res.json({
            "message":"Eliminado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}



//Subir imagenes a db
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: '5000000'},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
       
        if(mimeType && extname){
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
   
    }

}).single('imagen')
