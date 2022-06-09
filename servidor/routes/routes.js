import express from "express";
import { deleteEstadistica, getAllEstadisticas, getEstadistica, registrarEstadistica, updateEstadistica } from "../controllers/HomeController.js";
const router = express.Router()

router.get('/', getAllEstadisticas)
router.get('/:id', getEstadistica)
router.post('/', registrarEstadistica)
router.put('/:id', updateEstadistica)
router.delete('/:id', deleteEstadistica)

export default router

