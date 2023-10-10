const { argv } = require("./yargs")
require("colors")
const { crearTarea, getListado, actualizarEstado, borrarTarea } = require("../tareas")

let comando = argv._[0]

switch (comando) {
    case "crear":
        let tarea = crearTarea(argv.name, argv.descripcion)
        console.log(tarea)
        break;
    case "listar":
        let listado = getListado()
        console.log("--- TAREAS POR HACER ---".green)
        for (let tarea of listado) {
            console.log()
            console.log(tarea.name)
            console.log(tarea.descripcion)
            console.log(
                "Estado",
                tarea.isCompleted ? "Listo".green : "Pendiente".yellow
            )
            console.log("----".green)
        }
        break
    case "actualizar":
        let actualizado = actualizarEstado(argv.name, argv.isCompleted);
        console.log(actualizado);
        break
    default:
        break
}