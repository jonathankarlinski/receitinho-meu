import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneArray, setDoneArray] = useState();
  const getDoneRecipes = () => {
    setDoneArray(JSON.parse(localStorage.getItem('doneRecipes')));
  };
  const [doneRecipes, setDoneRecipes] = useState('');

  useEffect(() => {
    getDoneRecipes();
  }, []);

  const handleCopy = (e, id, type) => {
    const typeRecipes = type === 'food' ? 'foods' : 'drinks';
    e.target.innerText = 'Link copied!';
    clipboardCopy(`http://localhost:3000/${typeRecipes}/${id}`);
  };

  return (
    <div>
      <Header
        search={ false }
        title="Done Recipes"
      />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setDoneRecipes('') }
      >
        All
      </button>

      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setDoneRecipes('food') }
      >
        Food
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setDoneRecipes('drink') }
      >
        Drinks
      </button>

      {doneArray
      && doneArray.filter(({ type }) => type.includes(doneRecipes))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              to={
                recipe.type === 'food' ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`
              }
            >
              <img
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
                style={ { maxWidth: '100vw' } }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'food' ? recipe.nationality : recipe.alcoholicOrNot }
              { ' - ' }
              {recipe.category}
            </p>
            <Link
              to={
                recipe.type === 'food' ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`
              }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            <button
              type="button"
              onClick={ (e) => handleCopy(e, recipe.id, recipe.type) }
            >
              <img
                src={ shareIcon }
                alt="ShareIcon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
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
