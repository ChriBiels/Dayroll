import db from "../database/database.js";
import { DataTypes, Op } from "sequelize";
//Contenido tabla

const Recetario = db.define('recetas', {
    id: { type: DataTypes.INTEGER, primaryKey: true  },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    tipoalimento: { type: DataTypes.STRING },
    ingredientes: { type: DataTypes.STRING },
    alergenos: { type: DataTypes.STRING },
    auth: {type: DataTypes.STRING},
    imagen: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
})

export default Recetario