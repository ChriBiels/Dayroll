import db from "../database/database.js";
import { DataTypes } from "sequelize";

//Contenido tabla
const Estadisticas = db.define('estadisticas', {
    genero: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING },
    peso: { type: DataTypes.DOUBLE },
    altura: { type: DataTypes.DOUBLE },
    intolerancia: { type: DataTypes.STRING },
})

export default Estadisticas