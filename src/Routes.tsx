import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './Components/Login/login';
import Home from './Components/Home/home';
import Filme from './Components/Filme/filme';
import SearchList from './Components/SearchList/findMovie';
import Err from './Components/error/error';


const Routes: React.FC = () => {
    return (      
      <Router>        
        <Switch>    
          <Route  exact path="/" component={Login} />     
          <Route  exact path="/Home" component={Home} />
          <Route  exact path="/Filme/:id" component={Filme} />
          <Route  exact path ="/SearchList/:search" component={SearchList} />
          <Route                 path="*" component={Err} />
        </Switch>
      </Router>
    );
  }

export default Routes;