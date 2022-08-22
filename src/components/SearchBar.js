import React from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar() {
  return (
    <div>
      <img
        className="searchIcon"
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="Search"
      />
    </div>
  );
}
