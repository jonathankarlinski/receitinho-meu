import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/search';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes() {
  const location = useLocation();
  const { items, categories, search } = useContext(SearchContext);
  const MAX_RESULTS = 12;

  const type = useMemo(() => (
    location.pathname.includes('foods') ? 'Meal' : 'Drink'
  ), [location.pathname]);

  return (
    <div>
      <Header
        title={ location.pathname.includes('foods') ? 'Foods' : 'Drinks' }
      />
      { categories.map(({ strCategory: category }, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${category}-category-filter` }
          onClick={ () => search('category', category) }
        >
          { category }
        </button>
      )) }
      {
        (
          Array.isArray(items)
        ) && items.slice(0, MAX_RESULTS).map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item[`str${type}Thumb`] }
              alt={ `${item[`str${type}`]}` }
              style={ {
                width: '100%',
                maxWidth: '80vw',
              } }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {item[`str${type}`]}
            </p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
