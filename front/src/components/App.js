import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './Header';
import Articles from "./Articles";
import ArticleForm from './ArticleForm';
import ArticleDetail from './ArticleDetail';
import Navigation from './Navigation';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="row accueil">
            <Navigation />
            <Switch>
              <Route path="/" component={Articles} exact />
              <Route path="/articles-form" component={ArticleForm} exact />
              <Route path="/article/:id" component={ArticleDetail} exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>

    )
  }

}

export default App;
