import React, { Component } from 'react';
import '../styles/ArticleDetail.css';
import { Editor } from "@tinymce/tinymce-react";

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            categorieSelectionnee: '',
            error: null,
            isLoaded: false,
            showModifier: false,
            v: '',
            titre: '',
            contenu: '',
            tag: [],
            datePublication: new Date().toLocaleString(),
            auteur: '',
            previous: [],
            showRestore: false
        };
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRestore = this.handleRestore.bind(this);

        this.titreInput = React.createRef();
        this.contenuInput = React.createRef();
        this.tagInput = React.createRef();
        this.auteurInput = React.createRef();
        this.dateInput = React.createRef();

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            contenu: content
        })
    }


    handleRestore(event) {
        event.preventDefault();
        const tags = this.tagInput.current.value.split(',');
        const data = {
            _id: this.props.match.params.id,
            titre: this.titreInput.current.value,
            contenu: this.contenuInput.current.value,
            tag: tags,
            datePublication: this.dateInput.current.value,
            auteur: this.auteurInput.current.value
        };

        fetch('http://localhost:8000/article', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(this.handleRedirect)
    }

    handleSubmit(event) {
        event.preventDefault();
        const tags = this.state.tag.split(',');
        const data = {
            _id: this.props.match.params.id,
            v: this.state.v,
            titre: this.state.titre,
            contenu: this.state.contenu,
            tag: tags,
            datePublication: this.state.datePublication,
            auteur: this.state.auteur
        };
        fetch('http://localhost:8000/article', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    updateArticlesCategories(this);
                }
            )
            .then(this.handleRedirect)
    }

    componentDidMount() {
        fetch('http://localhost:8000/article/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        v: result.data.current.v,
                        titre: result.data.current.titre,
                        contenu: result.data.current.contenu,
                        tag: result.data.current.tag.join(","),
                        datePublication: result.data.current.datePublication,
                        auteur: result.data.current.auteur,
                        current: result.data.current.v,
                        previous: result.data.prev
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        fetch('http://localhost:8000/categories/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categories: result.data
                    });
                    this.state.categories.map((categorie, key) => {
                        if (categorie.idArticles.includes(this.props.match.params.id)) {
                            this.setState({
                                categorieSelectionnee: categorie._id
                            });
                        }
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    delete() {
        fetch('http://localhost:8000/article/' + this.props.match.params.id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            suppressionArticlesCategories(this);
        })
            .then(this.handleRedirect)
    }

    handleRedirect() {
        window.location.href = 'http://localhost:3000/'
    }


    render() {
        const { error, isLoaded, data, showModifier, showRestore } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else if (!showModifier) {
            // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.
            return (
                <div className="card-articles row">
                    <div className="article-container col-md-10">
                        <div>
                            <h1>{this.state.titre}</h1>
                            {/* Affiche les données formatées en tant qu'HTML */}
                            <div dangerouslySetInnerHTML={{ __html: this.state.contenu }} />
                        </div>
                        <div className="meta">
                            <span>{this.state.auteur} - {this.state.datePublication}</span>
                            <div className="tag">
                                {this.state.tag}
                            </div>
                        </div>

                        {showRestore ? (
                            <div className="restore-container">
                                {this.state.previous.map((item, index) =>
                                    <div className="option row align-items-center" key={item}>
                                        <div className="col-md-10">
                                            <h3>Version {item.v}</h3>
                                            <span>{item.auteur} - {item.datePublication}</span>
                                            <div dangerouslySetInnerHTML={{ __html: item.contenu }} />
                                            <div className="tags">
                                                {item.tag.map((tag, key) =>
                                                    <div>{tag}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-2 center">
                                            <input type="hidden" ref={this.titreInput} value={item.titre} />
                                            <input type="hidden" ref={this.contenuInput} value={item.contenu} />
                                            <input type="hidden" ref={this.tagInput} value={item.tag} />
                                            <input type="hidden" ref={this.auteurInput} value={item.auteur} />
                                            <input type="hidden" ref={this.dateInput} value={item.datePublication} />
                                            <button className="btn btn-primary" onClick={this.handleRestore}>Restaurer</button>

                                        </div>

                                    </div>
                                )}
                            </div>
                        ) : (
                                <div />
                            )}

                    </div>
                    <div className="actions col-md-2">
                        <h3>Actions</h3>
                        <br />
                        <p>Version : {this.state.current}</p>
                        <br />
                        <a className="btn btn-primary" onClick={() => this.setState({ showModifier: true })}>Modifier</a>
                        <a className="btn btn-primary" onClick={() => this.setState({ showRestore: true })}>Restaurer une version précédente</a>
                        <a className="btn btn-danger" onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer ce chef d\'oeuvre ?')) this.delete(this.props.match.params.id) }}>Supprimer</a>
                    </div>
                </div>
            );
        }
        else {
            if (this.state.categories != null) {
                return (
                    < form onSubmit={this.handleSubmit} className="cardForm">
                        <div className="form-group">
                            <div>
                                <label htmlFor="titre">Titre de l'article</label>
                            </div>
                            <input
                                className="form-control form-control-lg"
                                id="titre"
                                name="titre"
                                type="text"
                                placeholder="Titre de l'article"
                                value={this.state.titre}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <div>
                                <label htmlFor="contenu">Contenu</label>
                            </div>
                            <Editor
                                value={this.state.contenu}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | code bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    image bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                            />

                        </div>

                        <div className="form-group">
                            <div>
                                <label htmlFor="tag">Tag(s)</label>
                            </div>
                            <input
                                className="form-control"
                                id="tag"
                                name="tag"
                                type="text"
                                placeholder="Thèmes, Chatbot, Widgets, Blogs"
                                value={this.state.tag}
                                onChange={this.handleChange} />
                            <small id="tagHelp" className="form-text text-muted">Vous pouvez définir plusieurs tags en les séparant par des virgules.</small>
                        </div>

                        <div className="form-group">
                            <div>
                                <label htmlFor="datePublication">Date de publication</label>
                            </div>
                            <input
                                className="form-control"
                                id="datePublication"
                                name="datePublication"
                                type="text"
                                value={this.state.datePublication}
                                onChange={this.handleChange}
                                readOnly />
                        </div>

                        <div className="form-group">
                            <div>
                                <label htmlFor="auteur">Auteur</label>
                            </div>
                            <input
                                className="form-control"
                                id="auteur"
                                name="auteur"
                                type="text"
                                placeholder="Batman"
                                value={this.state.auteur}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <div>
                                <label htmlFor="categorie">Catégorie</label>
                            </div>
                            <select className="form-control"
                                id="categorieSelectionnee"
                                name="categorieSelectionnee"
                                onChange={this.handleChange}>
                                {this.state.categories.map((categorie, key) => {
                                    if (categorie.idArticles.includes(this.props.match.params.id)) {
                                        return <option value={categorie._id} selected>{categorie.nom}</option>
                                    }
                                    else {
                                        return <option value={categorie._id}>{categorie.nom}</option>
                                    }
                                }

                                )}
                            </select>
                        </div>

                        <div className="submit d-flex justify-content-end">
                            <a href={'/article/' + this.props.match.params.id} className="btn btn-danger">Annuler</a>
                            <button className="btn btn-success">Enregistrer</button></div>

                    </form >
                )
            }

            else {
                return (
                    <h1>Aucune catégories en base, veillez en ajouter</h1>
                )
            }
        }
    }
}

function updateArticlesCategories(el) {
    el.state.categories.map((categorie, key) => {
        var idArticles = categorie.idArticles;
        if (categorie._id === el.state.categorieSelectionnee && !categorie.idArticles.includes(el.props.match.params.id)) {
            idArticles.push(el.props.match.params.id)
            const data = {
                _id: el.state.categorieSelectionnee,
                nom: categorie.nom,
                idArticles: idArticles
            }
            fetch('http://localhost:8000/categorie', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        categorie.idArticles.map((article, keyArticle) => {
            if ((article === el.props.match.params.id) && (categorie._id !== el.state.categorieSelectionnee)) {
                //on supprime l'article des autres catégories
                idArticles.splice(idArticles.indexOf(el.props.match.params.id), 1)
                const data = {
                    _id: categorie._id,
                    nom: categorie.nom,
                    idArticles: idArticles
                }
                fetch('http://localhost:8000/categorie', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        })
    }
    )
}

function suppressionArticlesCategories(el) {
    el.state.categories.map((categorie, key) => {
        categorie.idArticles.map((article, keyArticle) => {
            if (article === el.props.match.params.id) {
                //on supprime l'article des autres catégories
                categorie.idArticles.splice(categorie.idArticles.indexOf(el.props.match.params.id), 1)
                const data = {
                    _id: categorie._id,
                    nom: categorie.nom,
                    idArticles: categorie.idArticles
                }
                fetch('http://localhost:8000/categorie', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        })
    })
}

export default ArticleDetail;