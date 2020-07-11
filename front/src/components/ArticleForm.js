import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            contenu: '',
            tag: '',
            datePublication: '',
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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('http://localhost:8000/article', {
            method: 'POST',
            body: data,
        })
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="titre">Titre de l'article</label>
                    <input
                        id="titre"
                        name="titre"
                        type="text"
                        value={this.state.titre}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="contenu">Contenu</label>
                    <textarea
                        id="contenu"
                        name="contenu"
                        value={this.state.contenu}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="tag">Tag(s)</label>
                    <input
                        id="tag"
                        name="tag"
                        type="text"
                        value={this.state.tag}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="datePublication">Date de publication</label>
                    <input
                        id="datePublication"
                        name="datePublication"
                        type="text"
                        value={this.state.datePublication}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="auteur">Auteur</label>
                    <input
                        id="auteur"
                        name="auteur"
                        type="text"
                        value={this.state.auteur}
                        onChange={this.handleChange} />
                </div>

                <button>Enregistrer</button>

            </form>
        )
    }
}

export default ArticleForm;