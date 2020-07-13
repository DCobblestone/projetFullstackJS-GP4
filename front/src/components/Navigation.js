import React from 'react';

import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';
import Search from './Search'

const Navigation = () => {
    return (
        <div className="drawernav">
            <Search />
            <br></br>
            <div><NavLink to="/">Accueil</NavLink></div>
            <div><NavLink to="/articles-form">Ajouter un article</NavLink></div>
            <div>Catégories</div>
            <div>
                <ul>
                    <li><NavLink to={{pathname:'/articles/Sport'}} >Sport</NavLink></li>
                    <li><NavLink to={{pathname:'/articles/Sciences'}}>Sciences</NavLink></li>
                    <li><NavLink to={{pathname:'/articles/Jeux vidéos'}}>Jeux vidéos</NavLink></li>
                    <li><NavLink to={{pathname:'/articles/Politique'}}>Politique</NavLink></li>
                    <li><NavLink to={{pathname:'/articles/Faits divers'}}>Faits divers</NavLink></li>
                    <li><NavLink to={{pathname:'/articles/Autres'}}>Autres</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;