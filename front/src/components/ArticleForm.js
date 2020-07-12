import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Articles-form.css';
import { Editor } from '@tinymce/tinymce-react';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            categorieSelectionnee: '',
            titre: '',
            contenu: '',
            tag: '',
            datePublication: new Date().toLocaleString(),
            auteur: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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
                        categories: result.data,
                        categorieSelectionnee: result.data[0]._id
                    });
                    console.log(this.state.categories)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

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

    handleSubmit(event) {
        event.preventDefault();
        const tags = this.state.tag.split(',');
        const data = {
            titre: this.state.titre,
            contenu: this.state.contenu,
            tag: tags,
            datePublication: this.state.datePublication,
            auteur: this.state.auteur
        };
        fetch('http://localhost:8000/article', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.state.categories.map((categorie, key) => {
                    console.log("categorie courante: "+categorie._id)
                    console.log("catégorie du select: "+ this.state.categorieSelectionnee)
                    console.log("--------------------------------")
                    if(categorie._id == this.state.categorieSelectionnee){
                        var idArticles = categorie.idArticles;
                        idArticles.push(result.insertedId)
                        const data = {
                            _id: this.state.categorieSelectionnee,
                            nom: categorie.nom,
                            idArticles: idArticles
                        }
                        console.log(JSON.stringify(data))
                        fetch('http://localhost:8000/categorie', {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(this.handleRedirect)
                    }}
                )
            }
        )
    }

    handleRedirect(res) {
        if (res.status === 200) {
            window.location.href = 'http://localhost:3000/'
        } else {
            console.log("error");
        }
    }



    render() {
        if (this.state.categories != null){
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
                                bullist numlist outdent indent | removeformat | help'
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
                            {this.state.categories.map((categorie, key) =>
                                <option value={categorie._id}>{categorie.nom}</option>
                            )}
                        </select>
                    </div>

                    <div className="submit d-flex justify-content-end"><button className="btn btn-success">Enregistrer</button></div>

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

export default ArticleForm;