import React, { Component } from 'react';
import '../styles/ArticleCategorie.css';

class ArticleCategorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null,
            results: '',
            changed: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/categorie/' + this.props.match.params.id, {
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
                        data: result.data[0].articles
                    });
                    console.log(result.data[0].articles)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("url: " + this.props.match.params.id)
        console.log("avant : " + prevProps.match.params.id)
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({
                isLoaded: false
            });
            fetch('http://localhost:8000/categorie/' + this.props.match.params.id, {
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
                            data: result.data[0].articles
                        });
                        console.log(result.data[0].articles)
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
        return true;
    }


    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            console.log("affichage des articles")
            // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.
            return (
                <div className="categ">
                    <h2>Catégorie : {this.props.match.params.id}</h2>

                    <div className="card-articles">
                        <div className="articles-container">
                            {this.state.data.map((item, index) =>
                                <div className="card" key={index}>
                                    <div className="card-body">
                                        <div className="part1">
                                            <h5 className="card-title">{item.current.titre}</h5>
                                            <div className="card-text truncate" dangerouslySetInnerHTML={{ __html: item.current.contenu }} />
                                        </div>
                                        <div className="part2">
                                            <p className="card-text"><i>{item.current.auteur} - {item.current.datePublication}</i></p>
                                            <a href={'/article/' + item._id} className="btn btn-primary">Lire la suite</a>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        {item.current.tag.map((tag, key) =>
                                            <div>{tag}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            );
        }
    }
}

export default ArticleCategorie;