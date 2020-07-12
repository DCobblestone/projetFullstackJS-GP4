import React, { Component } from 'react';
import '../styles/ArticleDetail.css';

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
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
                    <div className="article-container">
                        <div>
                            <h1>{this.state.data.data.titre}</h1>
                            {/* <p>{this.state.data.data.contenu}</p> */}
                            {/* {this.state.data.data.contenu} */}
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.data.contenu }} />
                        </div>
                        <div>
                            <span>{this.state.data.data.auteur} - {this.state.data.data.datePublication}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ArticleDetail;