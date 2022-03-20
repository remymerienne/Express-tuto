/* eslint-disable no-undef */

// importation de 'express' dans notre fichier
const express = require('express');

// résolution des chemins d'accés en absolue
const path = require('path');

// initialisation de l'application avec 'express'
const app = express();

// numéro de port
const port = 3000;

app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

// méthode 'get' active l'échange des requêtes sur le chemin '/' => racine
app.get('/*', (req, res) => {

  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));

});

// ouverture du port qui va recevoir les requêtes http
app.listen(process.env.PORT || port, () => console.log('Server started on port 3000...'));
