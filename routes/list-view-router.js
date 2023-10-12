// importo express
const express = require("express")
//importo la funcion para tareas completas e incompletas
const { tareasCompletas, tareasIncompletas } = require("../tareas")
// creo una instancia de express router 
const router = express.Router()
// Middleware para verificar la validez de los parámetros
const verificarParametros = (req, res, next) => {
    const parametro = req.params.parametro; // Reemplaza 'parametro' con el nombre real del parámetro

    if (parametro === 'completas' || parametro === 'incompletas') {
        next(); // Los parámetros son correctos, pasa al siguiente middleware o controlador
    } else {
        res.status(400).json({ error: 'Parámetro no válido' });
    }
};
//creo las rutas
router.get('/completas', verificarParametros, (req, res) => {
    res.status(200).send(tareasCompletas())
})
router.get('/incompletas', verificarParametros, (req, res) => {
    res.status(200).send(tareasIncompletas())
})

module.exports = router