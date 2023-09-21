const express = require('express');
const app = express();
const port = 8000;

let tareas = require('./tareas.json');
const router = require('./moduloTareas.js');
let tareasCompletadas = require('./list-view-router.js');
let metodo = require('./list-edit-router.js');

app.use(express.json());
app.use('/tareas', router);
app.use('/completadas', tareasCompletadas);
app.use('/metodo', metodo);

router.get("/", (req, res) => {
  res.status(200).send(tareas);
});

tareasCompletadas.get("/", (req, res) => {
  res.status(200).send(tareas);
});

metodo.get("/", (req, res) => {
  res.status(200).send(tareas);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});