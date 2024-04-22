// Definicion de Modulos
const express = require('express');
const fs = require('fs');
const chalk = require('chalk');
const nodemon = require('nodemon');

const app = express();

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para procesar formularios
app.use(express.static('public')); // Ruta para archivos estáticos

// Configuración de Bootstrap (opcional)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Rutas
app.use('/abracadabra/usuarios', require('./routes/usuarios'));
app.use('/abracadabra/juego', require('./routes/juego'));
app.use('/abracadabra/conejo', require('./routes/conejo'));

// Error handling
app.use((err, req, res, next) => {
  console.error(chalk.red('Error:', err));
  res.status(err.status || 500).json({ message: err.message });
});

// Inicio del servidor
app.listen(3000, () => {
  console.log(chalk.green('Servidor escuchando en el puerto 3000'));
});

// Configuración de Nodemon (opcional)
nodemon.on('start', () => {
  console.log(chalk.green('Nodemon iniciado'));
});
nodemon.on('watch', () => {
  console.log(chalk.green('Cambios detectados, reiniciando servidor...'));
});
