const express = require('express')
const { getListado } = require("./tareas")
const app = express()
// Middleware para validar métodos HTTP
const validarMetodoHTTP = (req, res, next) => {
    const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE']; // Define los métodos válidos

    if (!metodosValidos.includes(req.method)) {
        res.status(405).json({ error: 'Método HTTP no permitido' });
    } else {
        next();
    }
};

// Aplicar el middleware a nivel de la aplicación
app.use(validarMetodoHTTP);
// modulo list view
const listView = require("./routes/list-view-router")
//modulo list edit
const listEdit = require("./routes/list-edit-router")
const port = process.env.PORT || 3000

//uso el modulo list-view
app.use("/lista", listView)
//uso el modulo list-edit
app.use("/edit", listEdit)
app.get("/api/tareas", (req, res) => {
    try {
        res.status(200).send(getListado())
    } catch (err) {
        console.log(err)
    }
})
app.listen(port, () => {
    console.log('listening on port ' + port)
})