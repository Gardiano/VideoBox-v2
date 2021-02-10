import React, { useState, ChangeEvent } from "react";
import './search.css';
import './medias.css'

import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  function onChangeInput(event: ChangeEvent & { target: Element }) {
    setSearch((event.target as HTMLInputElement).value);
  }

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={onChangeInput}
          placeholder="Procure pelo seu filme favorito!"
        />

        {search !== "" ? (
          <Link to={`${`/SearchList/${search}`}`}>
            <i className="fas fa-search search-icon"></i>
          </Link>
        ) : (
          <button className="search-icon-disabled">
            <i className="fas fa-search"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
