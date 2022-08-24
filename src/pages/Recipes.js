import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/search';
import Header from '../components/Header';

export default function Recipes() {
  const location = useLocation();
  const { items } = useContext(SearchContext);
  const MAX_RESULTS = 12;

  const type = useMemo(() => (
    location.pathname.includes('foods') ? 'Meal' : 'Drink'
  ), [location.pathname]);

  return (
    <div>
      <Header
        title={ location.pathname.includes('foods') ? 'Foods' : 'Drinks' }
      />
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
    </div>
  );
}
