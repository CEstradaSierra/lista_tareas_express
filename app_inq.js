const inquirer = require("inquirer");
require("colors")
const {
    crearTarea,
    getListado,
    actualizarEstado,
    borrarTarea,
} = require("./tareas");

async function main() {
    console.log("=====================================================".green)
    console.log("seleccione una opcion".white)
    console.log("=====================================================".green)
    const { comando } = await inquirer.prompt([
        {
            type: "list",
            name: "comando",
            message: "Seleccione una opción:",
            choices: [
                "Crear tarea",
                "Listar tareas",
                "Actualizar tarea",
                "Borrar tarea",
                "Salir",
            ],
        },
    ]);

    switch (comando) {
        case "Crear tarea":
            const tarea = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Nombre de la tarea:",
                },
                {
                    type: "input",
                    name: "descripcion",
                    message: "Descripción de la tarea:",
                },
            ]);
            crearTarea(tarea.name, tarea.descripcion);
            console.log("Tarea creada con éxito.");
            break;

        case "Listar tareas":
            const listado = getListado();
            console.log("--- TAREAS POR HACER ---");
            for (let tarea of listado) {
                console.log();
                console.log("Nombre: ", tarea.name);
                console.log("Descripción: ", tarea.descripcion);
                console.log(
                    "Estado",
                    tarea.isCompleted ? "Listo".green : "Pendiente".red
                );
                console.log("------------------------------");
            }
            break;

        case "Actualizar tarea":
            const tareaActualizar = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Nombre de la tarea a actualizar:",
                },
                {
                    type: "confirm",
                    name: "isCompleted",
                    message: "¿Está completada la tarea?",
                },
            ]);
            const actualizado = actualizarEstado(
                tareaActualizar.name,
                tareaActualizar.isCompleted
            );
            if (actualizado) {
                console.log("Estado de la tarea actualizado con éxito.");
            } else {
                console.log("No se encontró la tarea con ese nombre.");
            }
            break;

        case "Borrar tarea":
            const tareaBorrar = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Nombre de la tarea a borrar:",
                },
            ]);
            const eliminado = borrarTarea(tareaBorrar.name);
            if (eliminado) {
                console.log("Tarea eliminada con éxito.");
            } else {
                console.log("No se encontró la tarea con ese nombre.");
            }
            break;

        case "Salir":
            process.exit(0);

        default:
            console.log("Opción no válida.");
    }
    // Vuelve a mostrar el menú después de cada acción.
    await main();
}

main();

//exportar main
module.exports = main;