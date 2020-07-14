import React, { Component } from 'react';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
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
                        results: result.data
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
        if(this.state.results != null){
            return (
                <div>
                    <div className="card-articles">
                        <div className="articles-container">

                            {this.state.results.map((item, index) =>
                                <div className="card" key={item}>
                                    <div className="card-body">
                                        <div className="part1">
                                            <h5 className="card-title">{item.titre}</h5>
                                            <div className="card-text truncate" dangerouslySetInnerHTML={{ __html: item.contenu }} />
                                        </div>
                                        <div className="part2">
                                            <p className="card-text"><i>{item.auteur} - {item.datePublication}</i></p>
                                            <a href={'/article/' + item._id} className="btn btn-primary">Lire la suite</a>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        {item.tag.map((tag, key) =>
                                            <div>{tag}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group d-flex col-md-10">
                            <input
                                className="form-control"
                                id="term"
                                name="term"
                                type="text"
                                placeholder="Titre ou tag"
                                value={this.state.term}
                                onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group d-flex col-md-10">
                        <input
                            className="form-control"
                            id="term"
                            name="term"
                            type="text"
                            placeholder="Titre ou tag"
                            value={this.state.term}
                            onChange={this.handleChange} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Search;