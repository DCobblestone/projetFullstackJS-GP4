import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './Header';
import ArticleForm from './ArticleForm';
import Navigation from './Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Navigation />
          <Switch>

            <Route path="/articles-form" component={ArticleForm} exact />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
