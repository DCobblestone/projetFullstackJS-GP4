import React, { Component } from 'react';
import '../styles/ArticleDetail.css';

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null,
        };
        this.delete = this.delete.bind(this);
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
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.

            return (
                <div className="card-articles row">
                    <div className="article-container">
                        <div>
                            <h1>{this.state.data.data.titre}</h1>
                            {/* Affiche les données formatées en tant qu'HTML */}
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.data.contenu }} />
                        </div>
                        <div>
                            <span>{this.state.data.data.auteur} - {this.state.data.data.datePublication}</span>
                        </div>
                    </div>
                    <div className="actions">
                        <h3>Actions</h3>
                        <br />
                        <a className="btn btn-danger" onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer ce chef d\'oeuvre ?')) this.delete(this.state.data.data._id) }}>Supprimer</a>

                    </div>
                </div>
            );
        }
    }
}

export default ArticleDetail;