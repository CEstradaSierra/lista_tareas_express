//importo express 
const express = require("express")
// importo las funciones para las rutas
const { crearTarea, borrarTarea, listaTareas, editarTarea } = require("../tareas")
//creo una instancia
const router = express.Router()
//usar express json

//middleware para manejo de errores del post 

const middleware1 = (req, res, next) => {
    let body = req.body;

    // Verifica si el cuerpo de la solicitud está vacío o es nulo
    if (!body) {
        return res.status(400).json({ message: "El cuerpo está vacío" });
    }

    // Verifica si el cuerpo no es un objeto JSON válido
    if (typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({ message: "El cuerpo contiene información no válida" });
    }
    if (!body.name || !body.description) {

        res.status(400).json({ message: 'Faltan campos requeridos' });
    }


    // Si pasa las verificaciones anteriores, continúa al siguiente middleware o controlador
    next();
};
//middleware para manejo de errores del put 

const middleware2 = (req, res, next) => {
    let body = req.body;

    // Verifica si el cuerpo de la solicitud está vacío o es nulo
    if (!body) {
        return res.status(400).json({ message: "El cuerpo está vacío" });
    }

    // Verifica si el cuerpo no es un objeto JSON válido
    if (typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({ message: "El cuerpo contiene información no válida" });
    }
    if (!body.newName || !body.newDescription) {

        res.status(400).json({ message: 'Faltan campos requeridos' });
    }


    // Si pasa las verificaciones anteriores, continúa al siguiente middleware o controlador
    next();
};
//ruta para crear una tarea
router.post("/crear", middleware1, (req, res) => {
    let body = req.body
    const { name, description } = body
    crearTarea(name, description)
    res.status(201).json({ message: "tarea creada" })
})
/* router.post("/crear", (req, res) => {
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
}) */
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
router.put('/editar/:id', middleware2, (req, res) => {
    const id = req.params.id
    let body = req.body
    const { newName, newDescription } = body
    editarTarea(id, newName, newDescription)
    res.status(201).json({ message: "Tarea Editada" })
})
/* router.put('/editar/:id', (req, res) => {
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
}) */
module.exports = router