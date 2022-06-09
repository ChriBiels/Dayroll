import db from "../database/database.js";
import { DataTypes, Op } from "sequelize";

//Contenido tabla
const Recetario = db.define('recetas', {
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    tipoalimento: { type: DataTypes.STRING },
    ingredientes: { type: DataTypes.STRING },
    alergenos: { type: DataTypes.STRING },
    auth: {type: DataTypes.STRING},
    imagen: { type: DataTypes.STRING },
})

export default Recetario