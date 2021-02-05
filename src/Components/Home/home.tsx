

import { FunctionComponent } from 'react';
import './home.css';

import Trending from '../Filmes/Trendings/trending';
import Rated from '../Filmes/Rated/rated';
import Popular from '../Filmes/Popular/popular';
import WatchingNow from '../Filmes/WatchingNow/watching';
import Search from '../Search/search';

const Home: FunctionComponent = () => {

  return (
    <main>   
      <Search />    
      <Trending /> 
      <Rated />
      <Popular />
      <WatchingNow />
   </main>
  )
}

export default Home;