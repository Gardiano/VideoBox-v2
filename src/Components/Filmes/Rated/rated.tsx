import { useEffect, FunctionComponent, useState } from "react";
import '../../FilmesList/filmesList.css';

import load from '../../../assets/loading.gif';

import { Link } from "react-router-dom";

interface Props {
  trendings?: string[] | undefined | null;
  poster_path?: string;
  vote_average?: any;
  id?: number;
  title?: string;
  name?: string;
}

const Rated: FunctionComponent<Props> = () => {
  const [rated, setRated] = useState<Props[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlMostRated] = useState<string>(`
  https://api.themoviedb.org/3/movie/top_rated?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=2
  `);

  useEffect(() => {
    loadRated();
  }, []);

  function loadRated() {
     setTimeout(() => {
      fetch(urlMostRated)
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          }
          if (r.status === 404 || r.status === 400) {
            throw Error(r.statusText);
          }
        })
        .then((json) => {
          setRated(json.results);
        })
        .catch((error) => {
          console.log(`Catch: ${error}`);
        });
      setLoading(false);
    }, 1000);
    return () => clearTimeout();
  }

  return (
    <section className="list-container">
      <h1 className="titles"> Bem Avaliados </h1>
      {loading === true ? (
        <img id="loadingTheme" src={load} alt="load" />
      ) : (
        <div className="list-card">
          {rated.map((item) => {
            return (
              <Link
                id="main-link"
                to={`Filme/${item?.id}`}
                style={
                  item?.poster_path == null
                    ? {
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }
                    : {
                        backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item?.poster_path}`})`
                      }
                }
              >
                
                  <div
                    className="circlet"
                    style={
                      item.vote_average < 6
                        ? { border: "3px solid gold" }
                        : { border: "3px solid green" }
                    }
                  >
                    {item?.vote_average}
                  </div>

                  <div className="width-cards"></div>                  
                   <div className="titulo-box">
                    <p className="titulo" key={item?.id}>
                      {item?.title || item?.name}
                    </p>
                  </div>
                
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Rated;
