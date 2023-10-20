//import el modulo file system para manejar los archivos
const fs = require("fs")
const { v4: uuidv4 } = require("uuid");


// creo un arreglo de objetos que almacenara las tareas 
let listaTareas = [];

//funcion generadora de Id
function genId() {
    let id = uuidv4()
    return id
}

//guardar tarea 
function guardarDB() {
    // convierto las tareas en un objeto json string
    const tareas = JSON.stringify(listaTareas);
    //escribo las tareas en un archivo json
    fs.writeFile("./tareas.json", tareas, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("task saved")
        }
    })
}
//cargar las tareas
function cargarDB() {
    try {
        listaTareas = require("./tareas.json")
    } catch (error) {
        listaTareas = []
    }
    return listaTareas
}
//mostrar las tareas
function getListado() {
    cargarDB()
    return listaTareas
}

//funcion crear tareas 
function crearTarea(name, descripcion) {
    //cargo las tareas existentes
    cargarDB()
    //creo el objeto tarea 
    const tarea = {
        id: genId(),
        name,
        descripcion,
        isCompleted: false
    }
    // guardo la tarea en el arreglo
    listaTareas.push(tarea)
    // guardo la tarea en el archivo 
    guardarDB()
    //retorno la tarea
    return tarea
}
//actualizar estado de la tarea
function actualizarEstado(name, isCompleted) {
    cargarDB()
    //busco el indice segun el nombre
    let indice = listaTareas.findIndex(t => t.name === name)
    //si es mayor cambio el estado
    if (indice >= 0) {
        listaTareas[indice].isCompleted = isCompleted
        guardarDB()
        return true
    } else {
        return false
    }
}
//funcion para ver las tareas completas
function tareasCompletas() {
    cargarDB()
    const tareasCompletes = []
    listaTareas.forEach(t => {
        if (t.isCompleted === true) {
            tareasCompletes.push(t)
        }
    })
    return tareasCompletes
}
//funcion para ver tareas incompletas
function tareasIncompletas() {
    cargarDB()
    const tareasIncompletes = []
    listaTareas.forEach(t => {
        if (t.isCompleted === false) {
            tareasIncompletes.push(t)
        }
    }
    )
    return tareasIncompletes
}
//funcion eliminar tarea 
function borrarTarea(name) {
    //cargo las tareas para buscar
    cargarDB()
    //hallar el indice segun el nombre 
    const indice = listaTareas.findIndex(t => t.name === name)
    //si se encuentra el indice
    if (indice >= 0) {
        let tareaEliminada = listaTareas.splice(indice, 1)[0];
        console.log("Se elimino la tarea:", tareaEliminada.name)
        guardarDB()
        return true;
    } else {
        return false;
    }
}
//funcion para editar o actualizar la tarea 
function editarTarea(id, newName, newDescription) {
    cargarDB()
    const tarea = listaTareas.find(t => t.id == id)
    if (tarea) {
        const editedTarea = listaTareas.map(t => {
            t.name = newName;
            t.descripcion = newDescription;
        })
        guardarDB()
        //return editedTarea
    }
}

//obtener una sola tarea 
function obtenerUnaTarea(id) {
    const task = listaTareas.find(t => t.id === id)

    if (task) {
        cargarDB()
        return task
    }
}

module.exports = {
    guardarDB,
    crearTarea,
    borrarTarea,
    actualizarEstado,
    cargarDB,
    getListado,
    tareasCompletas,
    tareasIncompletas,
    listaTareas,
    editarTarea,
    obtenerUnaTarea
}