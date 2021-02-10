import React from 'react';
import './error.css';
import './medias.css';

import { Link } from 'react-router-dom';

const Err: React.FC = () => {
  return (
      <main>
          <div className="error-container">
              <div className="empty-error-box">
                <p>
                  Página não encontrada :(
                </p>
                <Link to={`${"/Home"}`}>
                  <i className="fas fa-long-arrow-alt-left"></i>
                </Link>
              </div>
            </div>
      </main>
  )
}

export default Err;