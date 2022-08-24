import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
  const history = useHistory();

  const type = useMemo(() => (
    location.pathname.includes('foods') ? 'meal' : 'cocktail'
  ), [location.pathname]);

  useEffect(() => {
    const fetchAPI = async () => {
      let searchResults = {};

      if (filter === 'ingredient') {
        searchResults = await fetchByIngredient(query, type);
      } else if (filter === 'name') {
        searchResults = await fetchByName(query, type);
      } else if (filter === 'first-letter') {
        searchResults = await fetchByFirstLetter(query, type);
      } else {
        return setItems([]);
      }

      setItems(searchResults);
    };

    fetchAPI();
  }, [filter, query]);

  useEffect(() => {
    if (Array.isArray(items) && items.length === 1) {
      history.push(`${
        location.pathname.includes('foods') ? '/foods' : '/drinks'
      }/${
        items[0][location.pathname === '/foods' ? 'idMeal' : 'idDrink']
      }`);
    }
  }, [items]);

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