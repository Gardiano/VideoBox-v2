
import React, {useState, useCallback, ChangeEvent} from 'react';
import "./search.css";


const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [movies, setMovies] = useState<[]>([]);
  
  function onChangeInput(event: ChangeEvent & { target: Element }) { 
    setSearch((event.target as HTMLInputElement).value);
  }

  const handeSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit() {
      let querySearch = `https://api.themoviedb.org/3/search/movie?api_key=5f0de47789bd5535f17999cce273751e&query=${`${search}`}&language=pt-BR`;
      await fetch(querySearch)
        .then((r) => r.json())
        .then((json) => {
          console.log('api', json);
          if (search !== '' && search !== ' ') {
            json.results.sort((movie1: any, movie2: any) => {
              const movie1Index = movie1.title.toLowerCase().indexOf(search);
              const movie2Index = movie2.title.toLowerCase().indexOf(search);
              if (movie1Index === -1 && movie2Index === -1) return 0;
              if (movie1Index === -1) return 1;
              if (movie2Index === -1) return -1;
              return movie1Index < movie2Index
                ? -1
                : movie1Index > movie2Index
                ? 1
                : 0;
            });
            setMovies( json.results );
            setSearch('');        
          }
        })
        .catch((error) => {
          console.log("error: " + error);
        });
      }
      submit();     
  },[search]);
 

  return(
      <div className="search-container">
          <div className="search-box">
              <input 
                type="text"
                value={search}
                onChange={onChangeInput}
                placeholder="Procure pelo seu filme favorito!"
                />
              <button 
                type="submit"
                onClick={handeSubmit}> buscar
              </button>   
          </div>      
      </div>
  )
}

export default Search;