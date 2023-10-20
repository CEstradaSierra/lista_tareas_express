const express = require('express')
const { getListado } = require("./tareas")
const app = express()

const listView = require("./routes/list-view-router")
//modulo list edit
const listEdit = require("./routes/list-edit-router");
const USERS_BBDD = require('./bbdd');
const authTokenRouter = require('./routes/auth_token');
const apiRouter = require('./routes/rest_api');
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
app.use(express.json())
// modulo list view
//const port = process.env.PORT || 3000
const port = process.env.PORT || 3000;

//uso el modulo list-view
app.use("/lista", listView)
//uso el modulo list-edit
app.use("/edit", listEdit)

//modulo para  auth token 
app.use("/auth", authTokenRouter)

//rutas para la rest api
app.use('/api', apiRouter)
app.get("/tareas", (req, res) => {
    try {
        res.status(200).send(getListado())
    } catch (err) {
        console.log(err)
    }
})
app.listen(port, () => {
    console.log('listening on port ' + port)
})