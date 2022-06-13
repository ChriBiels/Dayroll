import express from "express";
import { deleteReceta, getAllRecetas, getReceta, addReceta, updateReceta, upload, getAllUserRecetas, getAllFilterIngredientReceta, getAllFilterIntolerancia, showNumberUserRecetas, showCountAll, showCountIngrediente, getAllAlimentoIntolerancia, getLastReceta, getUserFavs, addFavs, deleteFavs } from "../controllers/RecetaController.js";
const recetaRouter = express.Router()

recetaRouter.get('/allRecetas', getAllRecetas)
recetaRouter.get('/:id', getReceta)
recetaRouter.get('/userRecetas/:auth', getAllUserRecetas)
recetaRouter.get('/allRecetasTipoAlimento/:tipoalimento', getAllFilterIngredientReceta )
recetaRouter.get('/intolerancias/:alergenos', getAllFilterIntolerancia)
recetaRouter.get('/alimentoIntolerancia/:tipoalimento/:alergenos', getAllAlimentoIntolerancia)
recetaRouter.get('/countRecetasUser/:auth', showNumberUserRecetas) 
recetaRouter.get('/contarTodo/all', showCountAll)
recetaRouter.get('/countIngrediente/:tipoalimento', showCountIngrediente)
recetaRouter.get('/allRecetas/lastReceta', getLastReceta)

//favs
recetaRouter.get('/allRecetas/allFavs/:auth', getUserFavs)
recetaRouter.post('/addReceta/addFavs', addFavs)
recetaRouter.delete('/allRecetas/deleteFav/:id/:auth', deleteFavs)
//

recetaRouter.post('/addReceta', upload, addReceta)
recetaRouter.put('/:id/:auth', updateReceta)
recetaRouter.delete('/:id/:auth', deleteReceta)

export default recetaRouter