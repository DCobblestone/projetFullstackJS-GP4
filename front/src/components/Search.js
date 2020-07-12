import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            titre: ''
        }

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
        const data = {
            titre: this.state.titre
        };
        fetch('http://localhost:8000/article/search/titre', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        results: result.data.titre
                    });
                    console.log(this.state.results)
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    };




    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="titre">Recherche par titre</label>
                        </div>
                        <input
                            className="form-control"
                            id="titre"
                            name="titre"
                            type="text"
                            placeholder="Recherche par titre"
                            value={this.state.titre}
                            onChange={this.handleChange} />
                    </div>

                    <div className="submit d-flex justify-content-end"><button className="btn btn-primary">Rechercher</button></div>
                </form>


                {this.state.results.map((results, key) =>
                    <div>{results}</div>
                )}
            </div>




        )
    }
}

export default Search;