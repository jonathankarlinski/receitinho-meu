import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar() {
  const [visible, setVisible] = useState(false);

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
            />
            <label htmlFor="radio-ingredient">
              <input
                type="radioio"
                data-testid="ingredient-search-radio"
                name="radio"
                id="radio-ingredient"
              />
            </label>
            <label htmlFor="radio-name">
              <input
                type="radio"
                data-testid="name-search-radio"
                name="radio"
                id="radio-name"
              />
            </label>
            <label htmlFor="radio-first-letter">
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                name="radio"
                id="radio-first-letter"
              />
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </>
        )
      }
    </div>
  );
}
