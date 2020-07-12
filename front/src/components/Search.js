import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            term: ''
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
            term: this.state.term
        };
        fetch('http://localhost:8000/article/search', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        results: result
                    });
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
                            <label htmlFor="term">Rechercher un article</label>
                        </div>
                        <input
                            className="form-control"
                            id="term"
                            name="term"
                            type="text"
                            placeholder="Recherche par titre ou tag"
                            value={this.state.term}
                            onChange={this.handleChange} />
                    </div>

                    <div className="submit d-flex justify-content-end"><button className="btn btn-primary">Rechercher</button></div>
                </form>

            </div>




        )
    }
}

export default Search;