import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Articles-form.css';
import { Editor } from '@tinymce/tinymce-react';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            contenu: '',
            tag: '',
            datePublication: new Date().toLocaleString(),
            auteur: ''
        };

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
        const data = {
            titre: this.state.titre,
            contenu: this.state.contenu,
            tag: this.state.tag,
            datePublication: this.state.datePublication,
            auteur: this.state.auteur
        };

        fetch('http://localhost:8000/article', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
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

export default ArticleForm;