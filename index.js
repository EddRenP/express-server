const express = require('express');
const app = express();
const port = 8000;

let tareas = require('./tareas.json');
const router = require('./moduloTareas.js');

app.use(express.json());
app.use('/tareas', router);

router.get("/", (req, res) => {
  res.status(200).send(tareas);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});