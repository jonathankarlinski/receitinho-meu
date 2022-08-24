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
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => search('', '') }
        >
          All
        </button>
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
        { (type === 'Meal' && !categories.length) && (
          <>
            <button
              type="button"
              data-testid="Beef-category-filter"
              onClick={ () => search('category', 'Beef') }
            >
              Beef
            </button>
            <button
              type="button"
              data-testid="Breakfast-category-filter"
              onClick={ () => search('category', 'Breakfast') }
            >
              Breakfast
            </button>
            <button
              type="button"
              data-testid="Chicken-category-filter"
              onClick={ () => search('category', 'Chicken') }
            >
              Chicken
            </button>
            <button
              type="button"
              data-testid="Dessert-category-filter"
              onClick={ () => search('category', 'Dessert') }
            >
              Dessert
            </button>
            <button
              type="button"
              data-testid="Goat-category-filter"
              onClick={ () => search('category', 'Goat') }
            >
              Goat
            </button>
          </>
        ) }
        { (type === 'Drink' && !categories.length) && (
          <>
            <button
              type="button"
              data-testid="Ordinary Drink-category-filter"
              onClick={ () => search('category', 'Ordinary Drink') }
            >
              Ordinary Drink
            </button>
            <button
              type="button"
              data-testid="Cocktail-category-filter"
              onClick={ () => search('category', 'Cocktail') }
            >
              Cocktail
            </button>
            <button
              type="button"
              data-testid="Shake-category-filter"
              onClick={ () => search('category', 'Shake') }
            >
              Shake
            </button>
            <button
              type="button"
              data-testid="Other/Unknown-category-filter"
              onClick={ () => search('category', 'Other/Unknown') }
            >
              Other/Unknown
            </button>
            <button
              type="button"
              data-testid="Cocoa-category-filter"
              onClick={ () => search('category', 'Cocoa') }
            >
              Cocoa
            </button>
          </>
        ) }
      </div>
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
