const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 8000;
require('dotenv').config();

//llave secreta del archivo dotenv
const miLlaveSecreta = process.env.MI_LLAVE_SECRETA;

//array con el usuario para la autenticacion
const usuario = {
  user: "admin",
  password: "password123"
}

//llamado a las rutas usadas en cada paso del proyecto integrador
let tareas = require('./tareas.json');
const router = require('./moduloTareas.js');
let tareasCompletadas = require('./list-view-router.js');
let metodo = require('./list-edit-router.js');

//middleware para verificacion de roles
function rolMiddleware(roles) {
  return(req, res, next)=> {
      const rolActual = req.data.rol;
      
      if(roles.includes(rolActual))
      {
          next();
      }
      else{
          res.status(401).json({mensaje : 'No tienes permiso para acceder'});
      }
  }
}

//middleware para autenticacion de token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
      res.status(404).json({mensaje : 'debes proporcionar un token'});
  }

  try{
      const tokenDecrypted = jwt.verify(token, miLlaveSecreta);
      req.data = tokenDecrypted;
      next();
  }catch(error){
      res.status(400).json({mensaje : 'Ocurrio un error con el token'});
  }
}

//middleware para validar los metodos en la ruta "metodos"
const middValidarmetodo = ((req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DEL') {
    console.log("Metodo "+ req.method+ " ingresado, continuando");
    next();
  } 
  else {
    console.log("Metodo "+ req.method+ " no valido");
    res.status(405).json({mensaje : 'Metodo no valido'});
  }
});

//configuracion del middleware de express y de las rutas de la app
app.use(express.json());
app.use('/tareas', router);
app.use('/completadas', tareasCompletadas);
app.use('/metodo', metodo);

//post para el login, donde debera acceder si tiene rol 'vendedor'
app.post('/login', (req, res) => {
  const user = req.body.user;
  const pass = req.body.password;

  if(user === usuario.user && pass === usuario.password) {
      const payload = {
          rol: "vendedor"
      }
      const token = jwt.sign(payload,miLlaveSecreta);
      return res.status(200).send({
          message: "Bienvenido",
          token
      })
  }
  else {
      return res.status(403).json({mensaje : 'Usuario o contraseña incorrectos'});
  }
});

//solo para probar la parte de "autenticacion en express"
app.get("/login", authMiddleware, rolMiddleware(['vendedor']), (req, res) => {
  res.status(200).json({tareas});
});

router.get("/", middValidarmetodo, authMiddleware, rolMiddleware(['vendedor']), (req, res) => {
  console.log(req.originalUrl);
  res.status(200).json({tareas});
});

tareasCompletadas.get("/", middValidarmetodo, authMiddleware, rolMiddleware(['vendedor']), (req, res) => {
  res.status(200).json({tareas});
});

metodo.get("/", middValidarmetodo, authMiddleware, rolMiddleware(['vendedor']), (req, res) => {
  res.status(200).json({tareas});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});