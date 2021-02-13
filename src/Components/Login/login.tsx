
import React from 'react';
import './login.css';
import './medias.css';

import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
      <section className="login-container">
          <div className="login-box">
            <p className="login-title"> VideoBox </p>
            <Link className="login-button" to={`${'/Home'}`}>
              <i id="arrow-right-login" className="fas fa-long-arrow-alt-right"></i>
            </Link>
          </div>
      </section>
  )
}

export default Login;