import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

import Header from './Header';
import ArticleForm from './ArticleForm';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Header />
        <ArticleForm />



      </header>
    </div>

  );
}

export default App;
