import { useEffect, FunctionComponent, useState } from "react";
import "../../FilmesList/filmesList.css";
import "../../FilmesList/medias.css";

import load from "../../../assets/ld3.gif";

import { Link } from "react-router-dom";
interface Props {
  trending?: string[] | undefined | null;
  poster_path?: string;
  vote_average?: any;
  id?: string;
  title?: string;
  name?: string;
  skeleton?: boolean;
}

const Trending: FunctionComponent<Props> = () => {
  const [trending, setTrending] = useState<Props[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlTrending] = useState<string>(`
  https://api.themoviedb.org/3/trending/movie/day?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=5
  `);

  useEffect(() => {
    loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadTrending() {
    window.scrollTo(0,0);
    setTimeout(() => {
      fetch(urlTrending)
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          }
          if (r.status === 404 || r.status === 400) {
            throw Error(r.statusText);
          }
        })
        .then((json) => {          
          setTrending(json.results);
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
      <h1 className="titles"> Tendências </h1>
      {loading === true ? (
        <img id="loadingTheme" src={load} alt="load" />
      ) : (
        <div className="list-card">
          {trending.map((item) => {
            return (
              <Link
                className="tst"
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
                        backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item?.poster_path}`})`,
                      }
                }
              >
                <>
                  <div
                    className="circlet"
                    style={
                      item.vote_average === 6
                        ? { border: "3px solid gold" }
                        : { border: "3px solid green" }
                    }
                  >
                    {item?.vote_average}
                  </div>
                </>

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

export default Trending;
