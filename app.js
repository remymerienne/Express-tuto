/* eslint-disable no-undef */

// importation de 'express' dans notre fichier
const express = require('express');

// résolution des chemins d'accés en absolue
const path = require('path');

// initialisation de l'application avec 'express'
const app = express();

// numéro de port
const port = 3000;

// Déclare que les fichiers 'statics' sont dans le dossier 'public'. style.css par exemple
app.use(express.static('public'));

// permet de traiter les requêtes au format 'json'
app.use(express.json());

// méthode 'get' active l'échange des requêtes sur le chemin '/' => racine
app.get('/', (req, res) => {

  // méthode 'send' appliquée à la réponse et qui va envoyer dans notre cas un 'string'
  // res.send('Hello world');

  // méthode d'envoie de fichier qui retourne une erreur si le chemin n'est pas résolu comme pour la config de 'webpack => utilisation de 'path'
  res.sendFile(path.join(__dirname + '/index.html'));

});

app.post('/user', (req, res) => {

    console.log(req.body);
    // mettre fin à la connexion une fois le 'post' effectué
    res.end();

});

// ouverture du port qui va recevoir les requêtes http
app.listen(port, console.log('Server started on port 3000...'));
