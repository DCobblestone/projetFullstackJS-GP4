import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Articles from "./Articles";
import ArticleForm from './ArticleForm';
import ArticleDetail from './ArticleDetail';
import Navigation from './Navigation';
import ArticleCategorie from "./ArticleCategorie";
import Search from "./Search";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value_key: null
    }
  }

  parentFunction = (data_from_search) => {
    this.setState({ value_key: data_from_search });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="row accueil">
            <Navigation functionCallFromApp={this.parentFunction.bind(this)} />
            <Switch>
              <Route path="/" component={Articles} exact />
              <Route path="/articles-form" component={ArticleForm} exact />
              <Route path="/article/:id" component={ArticleDetail} exact />
              <Route path="/articles/:id" component={ArticleCategorie} exact />
              <Route path="/search" component={Search} exact />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
