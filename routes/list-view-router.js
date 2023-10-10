// importo express
const express = require("express")
//importo la funcion para tareas completas e incompletas
const { tareasCompletas, tareasIncompletas } = require("../tareas")
// creo una instancia de express router 
const router = express.Router()

//creo las rutas
router.get('/completas', (req, res) => {
    res.status(200).send(tareasCompletas())
})
router.get('/incompletas', (req, res) => {
    res.status(200).send(tareasIncompletas())
})

module.exports = router