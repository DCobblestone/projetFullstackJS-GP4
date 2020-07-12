import React, { Component } from 'react';
import '../styles/ArticleDetail.css';
import {Editor} from "@tinymce/tinymce-react";

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            showModifier: false,
            titre: '',
            contenu: '',
            tag: '',
            datePublication: new Date().toLocaleString(),
            auteur: ''
        };
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            _id: this.props.match.params.id,
            titre: this.state.titre,
            contenu: this.state.contenu,
            tag: tags,
            datePublication: this.state.datePublication,
            auteur: this.state.auteur
        };
        console.log(JSON.stringify(data));
        fetch('http://localhost:8000/article', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.handleRedirect)
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
                        titre: result.data.titre,
                        contenu: result.data.contenu,
                        tag: result.data.tag.join(","),
                        datePublication: result.data.datePublication,
                        auteur: result.data.auteur
                    });
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
        }).then(this.handleRedirect)
    }

    handleRedirect(res) {
        if (res.status === 200) {
            window.location.href = 'http://localhost:3000/'
        } else {
            console.log("error");
        }
    }


    render() {
        const { error, isLoaded, data, showModifier } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else if (!showModifier){
            // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.
            return (
                <div className="card-articles row">
                    <div className="article-container">
                        <div>
                            <h1>{this.state.titre}</h1>
                            {/* Affiche les données formatées en tant qu'HTML */}
                            <div dangerouslySetInnerHTML={{ __html: this.state.contenu }} />
                        </div>
                        <div>
                            <span>{this.state.auteur} - {this.state.datePublication}</span>
                        </div>
                    </div>
                    <div className="actions">
                        <h3>Actions</h3>
                        <br />
                        <a className="btn btn-primary" onClick={() => this.setState({ showModifier : true} )}>Modifier</a>
                        <a className="btn btn-danger" onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer ce chef d\'oeuvre ?')) this.delete(this.props.match.params.id) }}>Supprimer</a>


                    </div>
                </div>
            );
        }
        else {
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

                    <div className="submit d-flex justify-content-end"><button className="btn btn-success">Enregistrer</button></div>

                </form >
            )
        }
    }
}

export default ArticleDetail;