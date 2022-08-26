import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchById, fetchByName } from '../services/searchAPI';

export default function RecipeDetails() {
  const MAX_CARDS = 6;
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  const [itemRecommended, setItemRecommended] = useState([]);

  const { id } = useParams();
  const location = useLocation();

  const type = useMemo(() => ({
    route: location.pathname.includes('foods') ? '/foods' : '/drinks',
    path: location.pathname.includes('foods') ? 'meal' : 'cocktail',
    name: location.pathname.includes('foods') ? 'Meal' : 'Drink',
    recommendation: {
      path: location.pathname.includes('foods') ? 'cocktail' : 'meal',
      name: location.pathname.includes('foods') ? 'Drink' : 'Meal',
    },
  }), [location.pathname]);

  const isDone = useMemo(() => (
    localStorage.getItem('doneRecipes')
      && JSON.parse(
        localStorage.getItem('doneRecipes'),
      ).some(({ id: recipeId }) => (
        recipeId === id
      ))
  ), [location.pathname]);

  const inProgress = useMemo(() => (
    localStorage.getItem('inProgressRecipes')
      && Object.keys(
        JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type.path}s`],
      ).some((key) => (
        key === id
      ))
  ), [location.pathname]);

  useEffect(() => {
    const fetchAPI = async () => {
      const item = await fetchById(id, type.path);
      const recommended = await fetchByName('', type.recommendation.path);

      console.warn(localStorage.getItem('inProgressRecipes'));

      setItemRecommended(recommended);
      setRecipe(item);
    };

    fetchAPI();
  }, []);

  return (
    <div>
      <img
        src={ recipe[`str${type.name}Thumb`] }
        alt={ recipe[`str${type.name}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${type.name}`] }
      </h1>
      <p data-testid="recipe-category">
        { recipe.strCategory }
        &nbsp;
        { recipe.strAlcoholic }
      </p>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Add to favorites
      </button>
      <h3>Ingredients</h3>
      { recipe.ingredients.map((ingredient, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            <strong>{ingredient.name}</strong>
            &nbsp;

            <span>{ingredient.qty}</span>
          </p>
        </div>
      )) }
      <h3>Instructions</h3>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      { recipe.strYoutube && (
        <div>
          <iframe
            width="400"
            height="250"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${
              recipe.strYoutube.split('?v=')[1]
            }` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) }
      <h3>Recommendations</h3>
      <section
        style={ {
          display: 'flex',
          overflowX: 'scroll',
          maxWidth: '100vw',
          gap: '1rem',
          padding: '0.75rem',
        } }
      >
        { itemRecommended.slice(0, MAX_CARDS).map((recom, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            style={ {
              width: '60vw',
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recom[`str${type.recommendation.name}Thumb`] }
              alt={ `${recom[`str${type.recommendation.name}`]}` }
              style={ {
                height: '12rem',
              } }
            />
            <p data-testid={ `${index}-recomendation-title` }>
              {recom[`str${type.recommendation.name}`]}
            </p>
          </div>
        )) }
      </section>
      {
        !isDone && (
          <Link
            to={
              `${type.route}/${id}/in-progress`
            }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ {
                position: 'fixed',
                bottom: 0,
              } }
            >
              { inProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>
        )
      }
    </div>
  );
}
