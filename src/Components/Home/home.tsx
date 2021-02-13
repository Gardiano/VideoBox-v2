

import { FunctionComponent } from 'react';
import './home.css';

import Trending from '../Filmes/Trendings/trending';
import Rated from '../Filmes/Rated/rated';
import Popular from '../Filmes/Popular/popular';
import WatchingNow from '../Filmes/WatchingNow/watching';
import Search from '../SearchBar/search';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const Home: FunctionComponent = () => {
  return (
    <main> 
      <Header /> 
      <Search />    
      <Trending /> 
      <Rated />
      <Popular />
      <WatchingNow />
      <Footer />
   </main>
  )
}

export default Home;