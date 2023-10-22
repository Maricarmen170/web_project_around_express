/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */
import express from 'express';
import fs from 'fs';
import usersRoute from './routes/users.js';
import cardsRoute from './routes/cards.js';
const app = express();

app.use('/', usersRoute);
app.use('/', cardsRoute);

function checkToken(req, res, next) {
  res.status(401).json({ message: 'Recurso solicitado no encontrado' });
  next();
}

app.get('/', checkToken, (req, res) => {
  res.send('hola desde express');
});

app.listen(3000);
