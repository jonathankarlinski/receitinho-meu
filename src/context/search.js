import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  fetchCategories,
  fetchByName,
  fetchByFirstLetter,
  fetchByIngredient,
  fetchByCategory,
} from '../services/searchAPI';

const SearchContext = createContext({
  search: () => {},
  items: [],
  categories: [],
});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const type = useMemo(() => (
    location.pathname.includes('foods') ? 'meal' : 'cocktail'
  ), [location.pathname]);

  useEffect(() => {
    const fetchAPI = async () => {
      const results = await fetchCategories(type);

      setCategories(results);
    };

    fetchAPI();
  }, [type]);

  useEffect(() => {
    const fetchAPI = async () => {
      let searchResults = [];

      if (filter === 'ingredient') {
        console.log('ingrediente');
        searchResults = await fetchByIngredient(query, type);
      } else if (filter === 'name') {
        console.log('name');
        searchResults = await fetchByName(query, type);
      } else if (filter === 'first-letter') {
        console.log('first-letter');
        searchResults = await fetchByFirstLetter(query, type);
      } else if (filter === 'category') {
        console.log('category');
        searchResults = await fetchByCategory(query, type);
      } else {
        console.log('ultimo');
        searchResults = await fetchByName(query, type);
      }

      setItems(searchResults);
    };

    fetchAPI();
  }, [filter, query, type]);

  useEffect(() => {
    if (filter === 'category') {
      return;
    }

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
      <SearchContext.Provider value={ { search, items, categories } }>
        { children }
      </SearchContext.Provider>
    </div>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchContext;
