
import React from 'react';
import './header.css';
import './medias.css';

import { useHistory } from 'react-router';

const Header: React.FC = () => {

  let history = useHistory();

  return (
    <header>
      <div className="Header-box">
          <div className="Header-content">   
              <button id="goBack" type="button" onClick={() => history.goBack()}> <p >VIDEOBOX </p> </button>                      
          </div>                
        </div>                           
</header>
  )
}

export default Header;