import React, { useEffect, useState } from 'react';
// import clipboardCopy from 'clipboard-copy';
// import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneArray, setDoneArray] = useState();
  const getDoneRecipes = () => {
    setDoneArray(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  useEffect(() => {
    getDoneRecipes();
  }, []);

  // const location = useLocation();

  // const type = useMemo(() => ({
  //   route: location.pathname.includes('foods') ? '/foods' : '/drinks',
  // }), [location.pathname]);

  // const handleCopy = (e, id) => {
  //   e.target.innerText = 'Link copied!';
  //   clipboardCopy([`http://localhost:3000${type.route}/${id}`]);
  //   setTimeout(() => {
  //     e.target.innerText = 'Share';
  //   }, Number('750'));
  // };

  return (
    <div>
      <Header
        search={ false }
        title="Done Recipes"
      />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>

      {doneArray
      && doneArray.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'food' ? recipe.nationality : recipe.alcoholicOrNot }
            { ' - ' }
            {recipe.category}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <img
            src={ shareIcon }
            alt="ShareIcon"
            data-testid={ `${index}-horizontal-share-btn` }
            // onClick={ (e) => handleCopy(e, recipe.id) }
          />
          { recipe.tags.slice(0, 2).map((item) => (
            <p
              data-testid={ `${index}-${item}-horizontal-tag` }
              key={ item }
            >
              {item}
            </p>
          )) }
        </div>
      ))}
    </div>
  );
}
