import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './Header';
import Articles from "./Articles";
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
            <Route path="/" component={Articles} exact/>
            <Route path="/articles-form" component={ArticleForm} exact />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
