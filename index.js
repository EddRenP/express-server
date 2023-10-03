const express = require('express');
const app = express();
const port = 8000;

//llamado a las rutas usadas en cada paso del proyecto integrador
let tareas = require('./tareas.json');
const router = require('./moduloTareas.js');
let tareasCompletadas = require('./list-view-router.js');
let metodo = require('./list-edit-router.js');

//middleware para validar los metodos en la ruta "metodos"
const middValidarmetodo = ((req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DEL') {
    console.log("Metodo "+ req.method+ " ingresado, continuando");
    next();
  } 
  else {
    console.log("Metodo "+ req.method+ " no valido");
    res.status(404).send({
      mensaje: "Metodo no valido",
    });
  }
});

// const middValidarurl = ((req, res, next) => {
//   if (req.originalUrl == '/completadas') {
//     console.log("Url "+ req.originalUrl+ " valida, continuando...");
//     next();
//   }
//   else{
//     console.log("Url "+ req.originalUrl+ " no valida");
//     res.status(404).send({
//       mensaje: "url no valida",
//     });
//   }
// });

//configuracion del middleware de express y de las rutas de la app
app.use(express.json());
app.use('/tareas', router);
app.use('/completadas', tareasCompletadas);
app.use('/metodo', metodo);

router.get("/", middValidarmetodo, (req, res) => {
  console.log(req.originalUrl);
  res.status(200).send(tareas);
});

tareasCompletadas.get("/", middValidarmetodo, (req, res) => {
  res.status(200).send(tareas);
});

metodo.get("/", middValidarmetodo, (req, res) => {
  res.status(200).send(tareas);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});