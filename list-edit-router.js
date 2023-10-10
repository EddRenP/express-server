const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json');

//middleware para verificar que el cuerpo del POST no vaya vacio
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

//middleware para verificar que el cuerpo del POST no tenga datos incorrectos
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


//metodo post, para agregar
router.post("/", middPost1, middPost2, (req, res) => {
  if(req.error == 0){
    const tareaNueva = req.body;
    tareas.push(tareaNueva);
    console.log("****", tareaNueva);
    res.status(200).json({
      mensaje: "tarea creada exitosamente",
    });
  }
  else if(req.error == 1){
    res.status(400).json({
      mensaje: "post con cuerpo vacio",
    });
  }
  else if(req.error == 2){
    res.status(400).json({
      mensaje: "post con datos invalidos",
    });
  }
  
});

//metodo delete, para eliminar
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tareas = tareas.splice(id-1,1);
  res.status(200).json(tareas);
});

//middleware para verificar que el cuerpo del PUT no vaya vacio
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

//middleware para verificar que el cuerpo del PUT no vaya vacio
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

//metodo PUT, para modificar
router.put("/:id", middPut1, middPut2, (req, res) => {
  if(req.error == 0){
    const id = req.params.id;
    const tarea = req.body;
    if (id > 0) {
      tareas[id-1] = tarea;
      res.status(200).json({
        mensaje: "tarea actualizada",
      });
    } else {
      res.status(404).json({
        mensaje: "tarea no encontrada",
      });
    }
  }
  else if(req.error == 1){
    res.status(400).json({
      mensaje: "put con cuerpo vacio",
    });
  }
  else if(req.error == 2){
    res.status(400).json({
      mensaje: "put con datos invalidos",
    });
  }
});

module.exports = router;