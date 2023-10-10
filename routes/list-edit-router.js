//importo express 
const express = require("express")
// importo las funciones para las rutas
const { crearTarea, borrarTarea, listaTareas, editarTarea } = require("../tareas")
//creo una instancia
const router = express.Router()
//ruta para crear una tarea
router.post("/crear", (req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)

        //res.status(201).json(data)
        console.log(data)
        const { name, description } = data
        crearTarea(name, description)
        res.status(200).send({ message: "tarea creada" })
    })
})
//ruta para eliminar una tarea 
router.delete("/eliminar", (req, res) => {
    /* const id = req.params.id
    const tarea = listaTareas.find(t => t.id === id)
    if (tarea) {
        borrarTarea(tarea.name)
        res.status(200).send({ message: "tarea borrada" })
    } */
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        const { name } = data
        borrarTarea(name)
        res.status(200).send({ message: "tarea borrada" })
    })
})
router.put('/editar/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        const { newName, newDescription } = data
        editarTarea(id, newName, newDescription)
        res.status(200).send({ message: "tarea editada" })
    })
})
module.exports = router