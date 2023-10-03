const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json');

//middleware valida que el parametro recibido dentro de la ruta de list-view sea el correcto, de lo contrario tira error
const middValidarurl = ((req, res, next) => {
  const parametro = req.params.parametro;
   if (parametro == 'mostrar') {
     console.log("Url "+ req.originalUrl+ " valida, continuando...");
     next();
   }
   else{
     console.log("Url "+ req.originalUrl+ " no valida");
     res.status(404).send({
       mensaje: "url no valida",
     });
   }
 });

//metodo que muestra las tareas completadas
router.get("/completadas/:parametro", middValidarurl, (req, res) => {
    let completadas = [];
    let j = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completado == true) {
            completadas[j] = tareas[i];
            j++;
        }
    }
    if (completadas.length>0) {
        res.status(200).send(completadas);
      } else {
        res.status(404).send({
          mensaje: "no hay tareas completadas",
        });
      }
});

//metodo que muestra las tareas incompletas
router.get("/nocompletadas/:parametro",middValidarurl, (req, res) => {
    let nocompletadas = [];
    let k = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completado == false) {
            nocompletadas[k] = tareas[i];
            k++;
        }
    }
    if (nocompletadas.length>0) {
        res.status(200).send(nocompletadas);
      } else {
        res.status(404).send({
          mensaje: "no hay tareas incompletas",
        });
      }
    
});

module.exports = router;