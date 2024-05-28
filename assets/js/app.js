const express = require('express');
const chalk = require('chalk');
const path = require('path');

const app = express();
const port = 3000;

// Arreglo de usuarios
const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Bryan"];

// Middleware para verificar el usuario
const verificarUsuario = (req, res, next) => {
  const { usuario } = req.params;
  if (usuarios.includes(usuario)) {
    next(); // Si el usuario existe, permite el paso
  } else {
    res.sendFile(path.join(__dirname, '../img/who.jpeg'));
  }
};

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../')));

// Rutas
app.get('/abracadabra/usuarios', (req, res) => {
  res.json({ usuarios });
});

app.get('/abracadabra/juego/:usuario', verificarUsuario, (req, res) => {
  // Aquí puedes enviar la página del juego (si la tienes)
  res.send('¡Bienvenido al juego, ' + req.params.usuario + '!');
});

app.get('/abracadabra/conejo/:n', (req, res) => {
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1; // Genera un número del 1 al 4
  const imagen = numeroAleatorio == req.params.n ? 'conejito.jpg' : 'voldemort.jpg';
  res.sendFile(path.join(__dirname, '../img', imagen));
});

// Ruta genérica para 404
app.use((req, res) => {
  res.send('Esta página no existe...');
});

app.listen(port, () => {
  console.log(chalk.green(`Servidor corriendo en http://localhost:${port}`));
});
