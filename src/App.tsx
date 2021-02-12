

import { BrowserRouter as Router } from 'react-router-dom'

import Header from './Components/Header/header';

import Footer from './Components/Footer/footer';

import Routes from './Routes';

import './App.css';

const App = () => {
  return (
    <div className="App">       
      <Router>        
          <Header />  
            <Routes />
          <Footer />    
      </Router>    
    </div>
  );
}
export default App;


