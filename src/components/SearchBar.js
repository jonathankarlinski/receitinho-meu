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
        visible && <input
          type="text"
          data-testid="search-input"
        />
      }
    </div>
  );
}
