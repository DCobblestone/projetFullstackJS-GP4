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
        var collectionCategories = db.collection('categorie')

        app.route('/setup').get(function (req, res, next) {
            var article = {
                _id: new ObjectId("5f0b043eafec7822948984b6"),
                titre: "Premier article !",
                contenu: "Lorem ipsum dolor sit amet, consectetuliquam risus lectus, sed efficitur nisl ullamcorper nec. Lorem ipsum dolor sit amet, consectetuliquam risus lectus, sed efficitur nisl ullamcorper nec.",
                tag: ["Sciences"],
                datePublication: "11/07/2020",
                auteur: "Bastien Proudhom"
            }

            var categorie1 = {
                nom: "Sport",
                idArticles: []
            }
            var categorie2 = {
                nom: "Sciences",
                idArticles: []
            }
            var categorie3 = {
                nom: "Jeux vidéos",
                idArticles: []
            }
            var categorie4 = {
                nom: "Politique",
                idArticles: []
            }
            var categorie5 = {
                nom: "Faits divers",
                idArticles: [new ObjectId("5f0b043eafec7822948984b6")]
            }
            var categorie6 = {
                nom: "Autres",
                idArticles: []
            }
            //On enregistre dans la table 'url' l'objet url (le créer automatiquement)
            collection.insert(article);
            collection.createIndex({ titre: "text", tag: "text" });
            collectionCategories.insert(categorie1);
            collectionCategories.insert(categorie2);
            collectionCategories.insert(categorie3);
            collectionCategories.insert(categorie4);
            collectionCategories.insert(categorie5);
            collectionCategories.insert(categorie6);

            res.end('setup ok');
        })

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
                        status: 200,
                        data: result
                    })
                })
            })

            .delete(function (req, res, next) {
                collection.deleteOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        data: result
                    })
                    console.log("deleted")
                })
            })

        app.route('/article')
            .post(function (req, res, next) {
                collection.insertOne({
                    titre: req.body.titre,
                    contenu: req.body.contenu,
                    tag: req.body.tag,
                    datePublication: req.body.datePublication,
                    auteur: req.body.auteur
                }, function (err, result) {
                    if (err) throw err;
                    res.json(result)
                    console.log("added")
                })

            })
            .put(function (req, res, next) {
                try {
                    collection.updateOne(
                        { "_id": new ObjectId(req.body._id) }, // Filter
                        {
                            $set: {
                                titre: req.body.titre,
                                contenu: req.body.contenu,
                                tag: req.body.tag,
                                datePublication: req.body.datePublication,
                                auteur: req.body.auteur
                            }
                        });
                    res.json({
                        status: 200
                    })
                } catch (e) {
                    console.log(e);
                };
            })

        app.route('/article/search')
            .post(function (req, res, next) {
                collection.find(
                    {$or: [
                            {titre: {$regex: req.body.term, $options: 'i'}},
                            {tag: {$regex:req.body.term, $options: 'i'}}
                          ]
                    })
                    .toArray(function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        data: result
                    })
                })
            })

        app.route('/categories')
            .get(function (req, res, next) {
                collectionCategories.find({}).toArray(function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        data: result
                    })
                })
            })
        app.route('/categorie')
            .put(function (req, res, next) {
                let objectIdArray = req.body.idArticles.map(s => ObjectId(s));
                try {
                    collectionCategories.updateOne(
                        { "_id": new ObjectId(req.body._id) }, // Filter
                        {
                            $set: {
                                nom: req.body.nom,
                                idArticles: objectIdArray
                            }
                        });
                    res.json({
                        status: 200
                    })
                } catch (e) {
                    console.log(e);
                };
            })


        // Récupérer les articles d'une catégorie selon le nom de la catégorie
        // Attention : il faut que l'idArticles dans la collection categorie soit de type ObjectId !
        app.route('/categorie/:nomCategorie')
            .get(function (req, res, next) {
                collectionCategories.aggregate([
                    {
                        '$lookup': {
                            'from': 'article',
                            'localField': 'idArticles',
                            'foreignField': '_id',
                            'as': 'articles'
                        }
                    }, {
                        '$match': {
                            'nom': req.params.nomCategorie
                        }
                    }
                ]).toArray(function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: 200,
                        data: result
                    })
                })
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
