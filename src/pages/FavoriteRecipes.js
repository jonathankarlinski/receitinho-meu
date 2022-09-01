import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
  }, []);

  useEffect(() => {
    console.log(favoriteRecipes);
  }, [favoriteRecipes]);

  const removeFavorite = (id) => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteItems.filter((item) => (
        item.id !== id
      )),
    ));

    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
  };

  const handleCopy = (e, recipe) => {
    e.target.innerText = 'Link copied!';

    clipboardCopy(`${window.location.origin}/${recipe.type}s/${recipe.id}`);

    setTimeout(() => {
      e.target.innerText = 'Share';
    }, Number('750'));
  };

  return (
    <div>
      <Header
        title="Favorite Recipes"
        search={ false }
      />
      <p data-testid="filter-by-all-btn" />
      <p data-testid="filter-by-food-btn" />
      <p data-testid="filter-by-drink-btn" />
      { favoriteRecipes.map((recipe, index) => (
        <>
          <img data-testid={ `${index}-horizontal-image` } src={ recipe.image } alt="" />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality || recipe.alcoholicOrNot}
            &nbsp;
            -
            &nbsp;
            {recipe.category}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
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
          </button>
          <button
            type="button"
            onClick={ () => removeFavorite(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt=" favorite"
            />
          </button>
        </>
      )) }

    </div>
  );
}
