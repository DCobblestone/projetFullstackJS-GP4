import React from 'react';

import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
    return (
        <div className="drawernav">
            <div><NavLink to="/">Accueil</NavLink></div>
            <div><NavLink to="/articles-form">Ajouter un article</NavLink></div>
        </div>
    );
}

export default Navigation;