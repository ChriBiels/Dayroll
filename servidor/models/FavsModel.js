import db from "../database/database.js";
import { DataTypes, Op } from "sequelize";
//Contenido tabla

const Favs = db.define('favs', {
    id: { type: DataTypes.INTEGER, primaryKey: true  },
    nombrefav: { type: DataTypes.STRING },
    descripcionfav: { type: DataTypes.STRING },
    tipoalimentofav: { type: DataTypes.STRING },
    ingredientesfav: { type: DataTypes.STRING },
    alergenosfav: { type: DataTypes.STRING },
    auth: { type: DataTypes.STRING },
    idrecetafav: {type: DataTypes.INTEGER },
    imagenfav: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
})

export default Favs