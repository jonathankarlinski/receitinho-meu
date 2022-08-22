import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchByIngredient, fetchByName, fetchByFirstLetter } from '../services/foodAPI';

const SearchContext = createContext({
  search: () => {},
  items: [],
});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (filter === 'ingredient') {
      setItems(fetchByIngredient(query));
    } else if (filter === 'name') {
      setItems(fetchByName(query));
    } else if (filter === 'first-letter') {
      setItems(fetchByFirstLetter(query));
    }
  }, [filter, query]);

  const search = (newFilter, newQuery) => {
    setFilter(newFilter);
    setQuery(newQuery);
  };

  return (
    <div>
      <SearchContext.Provider value={ { search, items } }>
        { children }
      </SearchContext.Provider>
    </div>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchContext;
