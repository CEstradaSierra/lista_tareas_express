const express = require('express')
const { getListado } = require("./tareas")
const app = express()
const port = process.env.PORT || 3000

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