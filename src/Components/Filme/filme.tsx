/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import "./filme.css";
import './medias.css';

import load from "../../assets/ld.gif";

import EmptyMovie from '../../assets/emptyfilm.png';

import { RouteComponentProps } from "react-router";

import Moment from "react-moment";
import "moment/locale/pt-br";
Moment.globalLocale = "pt-br";

type Params = { id?: string };
type FilmeDetailProps = RouteComponentProps<Params>;

interface Props {
  movie?: {} | undefined | null
  poster_path?: string
  backdrop_path?: string
  vote_average?: any
  vote_count?: string
  title?: string
  name?: string
  runtime?: any
  release_date?: string
  tagline?: string
  overview?: string | any
  isloading?: boolean
  window?: HTMLElement
}
interface GenresProps {
  genres?: []
  name?: string 
  genero?: string
  id?: number
}

const Filme: React.FC<FilmeDetailProps> = ({ match }) => {
  const [trailler, setTrailler] = useState(); 
  const [director, setDirector] = useState();
  const [writing, setWriting] = useState();
  const [credits, setCredtis] = useState<[]>([]);
  const [movie, setMovie] = useState<Props>({});
  const [genres, setGenres] = useState<GenresProps[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  // movie
  useEffect(() => {
    window.scrollTo(0,0); 
    setTimeout(() => {      
      fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`
      )
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          }
          if (r.status === 404 || r.status === 400) {
            throw Error(r.statusText);
          }          
        })
        .then((json) => {
          setMovie(json);
          setGenres(json.genres);
        })
        .catch((error) => {
          console.log(`Catch: ${error}`);
        });
      setisLoading(false);      
    }, 1000);  
    return () => clearTimeout();
  }, [match.params.id]);  

  // url trailler
  useEffect(() => {
    let id = match.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
    fetch(url)
    .then((r) => {
      if (r.status === 200) {
        return r.json();
      }
      if (r.status === 404 || r.status === 400) {
        throw Error(r.statusText);
      }
    })
      .then((json) => {
        json.results.map((key: any) => {
          return setTrailler(key.key);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params.id]);

  // creditos
  useEffect(() => {
      let id = match.params.id;
      let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
      fetch(url)
      .then((r) => {
        if (r.status === 200) {
          return r.json();
        }
        if (r.status === 404 || r.status === 400) {
          throw Error(r.statusText);
        }
      })
        .then((json) => {
          // eslint-disable-next-line array-callback-return
          json.crew.map((crew: any) => {         
             switch( crew.job !== '' ) {

              case crew.job === 'Director':
                setDirector(crew.original_name);
                break;

              case crew.job === '':
                console.log('diretor não encontrado.');
                break;

              case crew.known_for_department === 'Writing':
                setWriting(crew.original_name);
                break;

              case crew.departament === 'Writing':
                setWriting(crew.original_name);
                break;

              default:
                return <p> Indisponível </p>;
             }             
          })
          setCredtis(json.cast);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [match.params.id]);

  const backgroundGenres = genres.map((genero: GenresProps) => {
    switch( genero !==  '' ) {                   
      case genero.name === "Ação" : 
        return <p className="generos-name" style={{background:'rgb(15, 64, 197)'}}> {genero.name} </p>; 
          
      case genero.name === "Aventura" :
        return <p className="generos-name" style={{background:'rgb(27, 146, 134)'}}> {genero.name} </p>;  
          
      case genero.name === "Crime" :
        return <p className="generos-name" style={{background:'rgb(15, 33, 71)'}}> {genero.name} </p>;
          
      case genero.name === "Drama" : 
        return <p className="generos-name" style={{background:'#ce4610'}}> {genero.name} </p>;
          
      case genero.name === "Thriller" : 
        return <p className="generos-name" style={{background:'rgb(100, 100, 100)'}}> {genero.name} </p>

      case genero.name === "Romance" : 
        return <p className="generos-name" style={{background:'rgb(200, 70, 70)'}}> {genero.name} </p>

      case genero.name === "Faroeste" : 
        return <p className="generos-name" style={{background:'#af5d00'}}> {genero.name} </p>

      case genero.name === 'Comédia' :
        return  <p className="generos-name" style={{background:'#470f5e'}}> {genero.name} </p>

      case genero.name === 'Terror' : 
        return  <p className="generos-name" style={{background:'#000000'}}> {genero.name} </p>

      case genero.name === 'Fantasia' : 
        return  <p className="generos-name" style={{background:'#c8467c'}}> {genero.name} </p>

      case genero.name === 'Família' : 
        return  <p className="generos-name" style={{background:'#d6ad7f'}}> {genero.name} </p>

      case genero.name === 'Animação' : 
        return  <p className="generos-name" style={{background:'#978ec2'}}> {genero.name} </p>

      case genero.name === 'Ficção Científica' : 
        return  <p className="generos-name" style={{background:'whitesmoke'}}> {genero.name} </p>
           
        default : return <p className="generos-name" style={{display:'none'}}> </p>; 
   }});
   
  return (
    <section id="divider-svg">
      <div>
        {isLoading === true ? (
          <div id="loadingTheme-container">
            <div id="loadingTheme-gif" style={{
                backgroundImage: `url(${load})`
                }}>
            </div>
          </div>
        ) : (
          <div className="filme-container">            
            <div
              className="backdrop_path"
              style={{
                backgroundImage: `linear-Gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
                  url(${`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`})`,
              }}
            >
              
              {movie?.poster_path === null ?                 
                (<div id="empty-poster-path"
                    style={{ backgroundImage: `url(${EmptyMovie})`}}>
                  </div>)
                :
               (<div className="poster_path"
                    style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movie?.poster_path}`})`}}>
                  </div>)
              }

              <div className="titleOrName">
                <p> {movie.title || movie.name} </p>
              </div>

              <div className="release_date_container">
                <label> Lançamento: &nbsp;</label>
                <div className="release_date">
                   <p>
                      <Moment                        
                        locale="pt-br"
                        format="DD/MM/YYYY"
                        date={movie.release_date}               
                      ></Moment>   
                    </p>                
                </div>
              </div>

              <div className="runtime_container">
                <label>Duração:&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</label>
                <div className="run_time">
                  <p> {movie.runtime} min </p>
                </div>
              </div>

              <div className="generos">
                <p> {backgroundGenres} </p> 
              </div>          

              <div className="tagline">
              <p> {movie.tagline} </p>
              </div>

              <div className="vote_count">
                <p>
                  <i className="fas fa-heart"></i> {movie.vote_count}
                </p>
              </div>
            </div>
           
            <div className="infos">            
              <div id="youtube-container">             
                {trailler !== undefined ? (                  
                  <button type="button">
                    <a
                      href={`https://www.youtube.com/embed/${trailler}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i id="youtube" className="fab fa-youtube"></i>
                    </a>
                  </button>
                ) : (
                  <button type="button" id="disabledYouTubeButton">
                    <i id="disabledYouTube" className="fab fa-youtube"></i>
                  </button>
                )}
              </div>

              <div className="overview">
                <h4 className="sinopse"> Sinopse </h4>
                {movie?.overview?.length > 0 ? (
                  <p> {movie?.overview} </p>
                ) : (
                  <p className="empty-overview"> Sinopse indisponível </p>
                )}
              </div>

              {director !== '' ? 
              <div className="diretor">
                <label>Diretor<p>{director}</p></label>
              </div>
              :
              <p></p>}

              {writing !== '' ? 
              <div className="Writing">
                <label>História<p> {writing} </p></label>
              </div>
              : <p> Indisponível </p>} 

              <h4 className="elenco"> Elenco </h4>
              <div className="elenco-container">
                    {credits.map((credits: any) => {
                      return(                      
                        <div className="elenco-box">
                          {credits.profile_path == undefined ?                            
                            <i id="person-undefined" className="fas fa-user-slash"> </i> 
                            :                            
                            <img src={`${`https://image.tmdb.org/t/p/w500${credits?.profile_path}`}`} alt="ator" />
                          }                         
                          <p> {credits.name} </p>
                        </div>                        
                      )
                    })}
              </div>              
            </div>
          </div>
        )}       
      </div>
    
    </section>
  );
};

export default Filme; 
