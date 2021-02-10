
import React from 'react';
import "./login.css";

import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
      <div>
          <Link to={`${'/Home'}`}>
            ENTRAR!
          </Link>
      </div>
  )
}

export default Login;