const http = require('http')
const express = require('express')
const hostname = 'localhost'
const port = 3000
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;
    else {
        var db = client.db('fullstack');
        var ObjectId = require('mongodb').ObjectId; //récupération de l'objectid
        var collection = db.collection('article');

        app.use(function(req, res){
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end('index.html')
        })

        app.listen(port, hostname, function () {
            console.log('Le serveur tourne sur l\'adresse : http://' + hostname + ':' + port);
        });
    }
})
