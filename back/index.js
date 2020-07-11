const http = require('http')
const express = require('express')
const hostname = 'localhost'
const cors = require('cors')
const port = 8000
const app = express()

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.json())

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;
    else {
        var db = client.db('fullstack');
        var ObjectId = require('mongodb').ObjectId; //récupération de l'objectid
        var collection = db.collection('article');


        //liste des points d'entrée
        app.route('/articles')
            .get(function (req, res, next) {
                collection.find({}).toArray(function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        data: result
                    })
                })
            })
        app.route('/article/:id')
            .get(function (req, res, next) {
                collection.findOne({ _id: new ObjectId(req.params.id) }, function (err, result
                ) {
                    if (err) throw err;
                    res.json({
                        status:200,
                        data: result
                    })
                })
            })
        app.route('/article')
            .post(function (req, res, next) {
                try {
                    collection.insertOne({
                        titre: req.body.titre,
                        contenu: req.body.contenu,
                        tag: req.body.tag,
                        datePublication: req.body.datePublication,
                        auteur: req.body.auteur
                    }
                    );
                    res.json({
                        status: 200,
                        data: next
                    })
                } catch (e) {
                    console.log(e);
                };
            })

        app.use(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end('index.html')
        })

        app.listen(port, hostname, function () {
            console.log('Le serveur tourne sur l\'adresse : http://' + hostname + ':' + port);
        });
    }
})
