import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filterByType, setFilterByType] = useState('');
  const [copyMessage, setCopyMessage] = useState('Share');

  useEffect(() => {
    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
  }, []);

  const removeFavorite = (id) => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes'));

    localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteItems.filter((item) => (
        item.id !== id
      )),
    ));

    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes')),
    );
  };

  const handleCopy = (e, recipe) => {
    setCopyMessage('Link copied!');

    clipboardCopy(`${window.location.origin}/${recipe.type}s/${recipe.id}`);

    setTimeout(() => {
      setCopyMessage('Share');
    }, Number('750'));
  };

  return (
    <div>
      <Header
        title="Favorite Recipes"
        search={ false }
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterByType('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterByType('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterByType('drink') }
      >
        Drink
      </button>
      { favoriteRecipes && favoriteRecipes.filter(({ type }) => (
        type.includes(filterByType)
      )).map((recipe, index) => (
        <div
          key={ recipe.id }
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              style={ {
                maxWidth: '100vw',
              } }
              alt=""
            />
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality || recipe.alcoholicOrNot}
            &nbsp;
            -
            &nbsp;
            {recipe.category}
          </p>
          <button
            type="button"
            onClick={ (e) => handleCopy(e, recipe) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt=""
            />
            {copyMessage}
          </button>
          <button
            type="button"
            onClick={ () => removeFavorite(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      )) }

    </div>
  );
}
