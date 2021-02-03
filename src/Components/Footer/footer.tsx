

import React from 'react';
import "./footer.css";
import './medias.css';

import logo from '../../assets/logo.png'

const Footer: React.FC = () => {
  return (
    <footer className="Footer-box">
        <div className="Footer-content">
            <a href='https://www.themoviedb.org/' rel="noreferrer" target="_blank">
                <strong> 
                    <img src={logo} alt="logo" />
                </strong>
            </a>                                      
        </div>                
    </footer>  
  )
}

export default Footer;