

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

import './App.css';

const App: React.FC = () => {  
  return (
    <div className="App">
      <Router>            
          {/* <Header />   */}
            <Routes />
          {/* <Footer />     */}
      </Router>    
    </div>
  );
}
export default App;


