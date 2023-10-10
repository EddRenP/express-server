const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json')

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == id);
  if (tarea) {
    res.status(200).json({tarea});
  } else {
    res.status(404).json({
      mensaje: "tarea no encontrado",
    });
  }
});

module.exports = router;