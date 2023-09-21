const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json');

//ruta del modulo de libros crear  
router.post("/", (req, res) => {
  const tareaNueva = req.body;
  tareas.push(tareaNueva);
  console.log("****", tareaNueva);
  res.status(200).send({
    messaje: "tarea creada exitosamente",
  });
});

// eliminar
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tareas = tareas.filter((tarea) => tarea.id != id);
  res.status(200).send(tareas);
});
//actualizar
router.put("/:id", (req, res) => {
  const tarea = req.body;
  const idTarea = tarea.id;
  const posicion = tareas.findIndex((tarea) => tarea.id === idTarea);
  if (posicion !== -1) {
    tareas[posicion] = tarea;
    res.status(200).send({
      mensaje: "tarea actualizada",
    });
  } else {
    res.status(404).send({
      mensaje: "tarea no encontrada",
    });
  }
});

module.exports = router;