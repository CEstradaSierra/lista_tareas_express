//creo las variables como argumentos
const { name, descripcion, isCompleted } = {
    name: {
        demand: true,
        alias: "n",
        desc: "Nombre de la tarea "
    },
    descripcion: {
        alias: "d",
        desc: "Descripcion de la tarea"
    },
    isCompleted: {
        alias: "c",
        default: true,
        desc: "Estado de completado de la tarea "
    }

}

const { argv } = require("yargs")
    .command("crear", "Crea una Tarea por hacer", {
        name,
        descripcion
    })
    .command("actualizar", "Actualizar el estado de una tarea", {
        name,
        isCompleted
    })
    .command("listar", "Listar las tareas", {})
    .command("borrar", "Borrar una tarea", {
        name
    })
    .help()

module.exports = {
    argv
}