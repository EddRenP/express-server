const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json');

//ruta del modulo de crear tareas
const middPost1 = ((req, res, next) => {
  if(JSON.stringify(req.body) == '{}'){
    console.log(JSON.stringify(req.body));
    req.error = 1;
    next();
  }
  else{
    req.error = 0;
    next();
  }
});

const middPost2 = ((req, res, next) => {
  if(isNaN(req.body.id) || req.body.completado != false){
    if(req.error == 1){
      req.error = 1;
    }
    else if(req.error == 0){
      req.error = 2;
    }
    next();
  }
  else{
    req.error = 0;
    next();
  }
});

router.post("/", middPost1, middPost2, (req, res) => {
  if(req.error == 0){
    const tareaNueva = req.body;
    tareas.push(tareaNueva);
    console.log("****", tareaNueva);
    res.status(200).send({
      mensaje: "tarea creada exitosamente",
    });
  }
  else if(req.error == 1){
    res.status(400).send({
      mensaje: "post con cuerpo vacio",
    });
  }
  else if(req.error == 2){
    res.status(400).send({
      mensaje: "post con datos invalidos",
    });
  }
  
});

// eliminar
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tareas = tareas.filter((tarea) => tarea.id != id);
  res.status(200).send(tareas);
});

//actualizar tareas
const middPut1 = ((req, res, next) => {
  if(JSON.stringify(req.body) == '{}'){
    console.log(JSON.stringify(req.body));
    req.error = 1;
    next();
  }
  else{
    req.error = 0;
    next();
  }
});

const middPut2 = ((req, res, next) => {
  if(isNaN(req.body.id) || req.body.completado != true){
    if(req.error == 1){
      req.error = 1;
    }
    else if(req.error == 0){
      req.error = 2;
    }
    next();
  }
  else{
    req.error = 0;
    next();
  }
});

router.put("/:id", middPut1, middPut2, (req, res) => {
  if(req.error == 0){
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
  }
  else if(req.error == 1){
    res.status(400).send({
      mensaje: "put con cuerpo vacio",
    });
  }
  else if(req.error == 2){
    res.status(400).send({
      mensaje: "put con datos invalidos",
    });
  }
});

module.exports = router;