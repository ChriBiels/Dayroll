import Estadisticas from "../models/HomeModel.js";


//Mostrar todos los registros
export const getAllEstadisticas = async (req, res) => {
    try{
        const allEstadisticas = await Estadisticas.findAll()
        res.json(allEstadisticas)
    }catch(error){
        res.json({message: error.message})
    }
}

//Mostrar un registro por id
export const getEstadistica = async (req, res) => {
    try {
        const estadistica = await Estadisticas.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(estadistica[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const registrarEstadistica = async (req, res) =>{
    try{
        await Estadisticas.create(req.body)
        res.json({
            "message":"Las estadísticas se han guardado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


//Update un registro por ID
export const updateEstadistica = async(req, res) =>{
    try {
        await Estadisticas.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message":"Actualizado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


//Eliminar un registro por ID
export const deleteEstadistica = async(req, res)=>{
    try {
        await Estadisticas.destroy({
            where: { id: req.params.id }
        })

        res.json({
            "message":"Actualizado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}
