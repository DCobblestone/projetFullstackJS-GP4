import React, { Component } from 'react';
import '../styles/Articles.css';

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/articles', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
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

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.
            return (
                <div className="card-articles">
                    {this.state.data.data.map((item, index) =>
                    <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.titre}</h5>
                                <p className="card-text">{item.contenu}</p>
                                <p className="card-text"><i>{item.auteur} - {item.datePublication}</i></p>
                                <a href="#" className="btn btn-primary">Lire la suite</a>
                            </div>
                    </div>
                )}
                </div>
            );
        }
    }
}

export default Articles;