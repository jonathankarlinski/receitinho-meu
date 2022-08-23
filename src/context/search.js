import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  fetchByFirstLetter,
  fetchByName,
  fetchByIngredient,
} from '../services/searchAPI';

const SearchContext = createContext({
  search: () => {},
  items: [],
});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchFoods = async () => {
      const type = location.pathname === '/foods' ? 'meal' : 'cocktail';

      if (filter === 'ingredient') {
        setItems(await fetchByIngredient(query, type));
      } else if (filter === 'name') {
        setItems(await fetchByName(query, type));
      } else if (filter === 'first-letter') {
        setItems(await fetchByFirstLetter(query, type));
      }
    };

    fetchFoods();
  }, [filter, query, location.pathname]);

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
