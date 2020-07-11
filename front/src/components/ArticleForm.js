import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ArticleForm extends Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('/articles', {
            method: 'POST',
            body: data,
        })
    }

    render() {
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="titre">Titre de l'article</label>
            <input id="titre" name="titre" type="text" />

            <label htmlFor="contenu"></label>

        </form>
    }
}