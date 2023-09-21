const express = require('express')

const router = express.Router();

let tareas = require('./tareas.json');

router.get("/completadas", (req, res) => {
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

router.get("/nocompletadas", (req, res) => {
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