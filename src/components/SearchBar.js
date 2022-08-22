import React, { useState, useContext } from 'react';
import SearchContext from '../context/search';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const { search } = useContext(SearchContext);

  return (
    <div>
      <button
        type="button"
        onClick={ () => setVisible(!visible) }
      >
        <img
          className="searchIcon"
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="Search"
        />
      </button>
      {
        visible && (
          <>
            <input
              type="text"
              data-testid="search-input"
              value={ query }
              onChange={ (e) => setQuery(e.target.value) }
            />
            <label htmlFor="radio-ingredient">
              Ingredient
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                name="radio"
                id="radio-ingredient"
                checked={ filter === 'ingredient' }
                onChange={ () => setFilter('ingredient') }
              />
            </label>
            <label htmlFor="radio-name">
              Name
              <input
                type="radio"
                data-testid="name-search-radio"
                name="radio"
                id="radio-name"
                checked={ filter === 'name' }
                onChange={ () => setFilter('name') }
              />
            </label>
            <label htmlFor="radio-first-letter">
              First letter
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                name="radio"
                id="radio-first-letter"
                checked={ filter === 'first-letter' }
                onChange={ () => setFilter('first-letter') }
              />
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => search(filter, query) }
            >
              Search
            </button>
          </>
        )
      }
    </div>
  );
}
