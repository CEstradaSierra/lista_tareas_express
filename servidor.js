const express = require('express')
const { getListado } = require("./tareas")
const app = express()
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