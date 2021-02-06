import React, { useState, useEffect } from "react";
import "./findMovie.css";

import { RouteComponentProps } from "react-router";

import { Link } from "react-router-dom";

import emptyFilm from "../../assets/emptyfilm.png";

import load from "../../assets/ld.gif";

import Moment from "react-moment";
import "moment/locale/pt-br";
Moment.globalLocale = "pt-br";

type Params = { search?: string };
type SearchListDetailProps = RouteComponentProps<Params>;

interface Props {
  movie?: [] | undefined | null;
  search?: string;
  title?: string;
  release_date?: string;
  overview?: string;
}

const SearchList: React.FC<SearchListDetailProps> = ({ match }) => {
  const [movie, setMovie] = useState<Props[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadList() {
    const matchParams = match.params.search;
    setTimeout(() => {
      let querySearch = `https://api.themoviedb.org/3/search/movie?api_key=5f0de47789bd5535f17999cce273751e&query=${`${matchParams}`}&language=pt-BR`;
      fetch(querySearch)
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          }
          if (r.status === 404 || r.status === 400) {
            throw Error(r.statusText);
          }
        })
        .then((json) => {
          setMovie(json.results);
        })
        .catch((error) => {
          console.log(`catch: ${error}`);
        });
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout();
  }

  return (
    <main className="searchList-container">
      {isLoading === true ? (
        <div id="loadingTheme-container">
          <div
            id="loadingTheme-gif"
            style={{
              backgroundImage: `url(${load})`,
            }}
          ></div>
        </div>
      ) : (
        <div className="searchList-box">
          {movie.length === 0 ? (
            <div className="empty-search-container">
              <div className="empty-search-box">
                <p>
                  Ops.. Não foram encontrados filmes que correspondam aos seus
                  critérios de busca. :(
                </p>
                <Link to={`${"/Home"}`}>
                  <i className="fas fa-long-arrow-alt-left"> </i>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {movie.map((itens: any) => {
                return (
                  <div className="searchList-card">
                    <Link
                      to={`${`/Filme/${itens.id}`}`}
                      className="poster_path"
                      style={
                        itens.poster_path == null
                          ? {
                              backgroundImage: `url(${`${emptyFilm}`})`,
                              backgroundPosition: "center",
                              backgroundSize: "50px 50px",
                              backgroundRepeat: "no-repeat",
                            }
                          : {
                              backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${itens.poster_path}`})`,
                            }
                      }
                    ></Link>
                    <h2> {itens.title} </h2>

                    <p>
                      <Moment
                        locale="pt-br"
                        format="DD/MM/YYYY"
                        date={itens.release_date}
                      ></Moment>
                    </p>

                    {itens.overview === "" ? (
                      <p> Sinopse Indisponível </p>
                    ) : (
                      <h5> {itens.overview} </h5>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default SearchList;
