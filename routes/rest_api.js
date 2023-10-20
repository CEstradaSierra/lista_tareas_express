const { crearTarea, editarTarea, borrarTarea, getListado, tareasCompletas, tareasIncompletas, obtenerUnaTarea } = require('../tareas')
const express = require('express')
const app = express()
const apiRouter = express.Router()

//api para crear una tarea
apiRouter.post('/create', (req, res) => {
    const { name, descripcion } = req.body

    //obtener la tarea
    const newTarea = crearTarea(name, descripcion)

    if (!newTarea) return res.status(404).send("tarea no creada")

    res.status(200).json(newTarea)
})

//endpoint para editar una tarea
apiRouter.put('/update/:id', (req, res) => {
    const id = req.params.id
    const { newName, newDescription } = req.body

    //actualizar la tarea 
    editarTarea(id, newName, newDescription)

    res.status(200).send("task updated")
})

//endpoint para elimnar la tarea
apiRouter.delete('/delete', (req, res) => {
    const { name } = req.body

    //eliminar tarea 
    borrarTarea(name)

    res.status(200).send("tarea borrada")
})

//endpoint para listar todas las tareas
apiRouter.get('/listar', (req, res) => {
    const tareas = getListado()

    res.status(200).json(tareas)
})

//endpoint para tareas completas e incompletas
apiRouter.get('/completas', (req, res) => {
    const completeas = tareasCompletas()
    res.status(200).json(completeas)
})

apiRouter.get('/incompletas', (req, res) => {
    const incompletas = tareasIncompletas()
    res.status(200).json(incompletas)
})

//obtener una sola tarea
apiRouter.get('/tarea/:id', (req, res) => {
    const id = req.params.id

    const tarea = obtenerUnaTarea(id)

    if (!tarea) return res.status(404).send("tarea no encontrada")
})

module.exports = apiRouter