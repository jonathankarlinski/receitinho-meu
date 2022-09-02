import React, { useEffect, useMemo, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { fetchById } from '../services/searchAPI';
import FavoriteButton from '../components/FavoriteButton';

export default function RecipeInProgress() {
  const [steps, setSteps] = useState([]);
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  console.log(steps);

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const type = useMemo(() => ({
    route: location.pathname.includes('foods') ? '/foods' : '/drinks',
    path: location.pathname.includes('foods') ? 'meal' : 'cocktail',
    name: location.pathname.includes('foods') ? 'Meal' : 'Drink',
  }), [location.pathname]);

  useEffect(() => {
    const fetchAPI = async () => {
      const item = await fetchById(id, type.path);

      const recipes = JSON.parse(
        localStorage.getItem('inProgressRecipes') || '{}',
      );

      setSteps(item.ingredients.map(({ name, qty }, index) => ({
        name,
        qty,
        done: recipes[`${type.path}s`] && recipes[`${type.path}s`][id]
          ? recipes[`${type.path}s`][id].some((i) => (
            index === i
          ))
          : false,
      })));
      setRecipe(item);
    };

    fetchAPI();
  }, [id]);

  const handleClick = (event, index) => {
    const seiLa = steps.map((step, i) => ({
      ...step,
      done: index === i ? event.target.checked : step.done,
    }));

    setSteps(seiLa);

    const recipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...recipes,
        [`${type.path}s`]: {
          ...(
            recipes[`${type.path}s`]
              ? recipes[`${type.path}s`]
              : {}
          ),
          [id]: seiLa.reduce((acc, curr, i) => (
            curr.done ? [...acc, i] : acc
          ), []),
        },
      }),
    );
  };

  const handleCopy = (e) => {
    e.target.innerText = 'Link copied!';

    clipboardCopy(window.location.href.split('/in-progress')[0]);

    setTimeout(() => {
      e.target.innerText = 'Share';
    }, Number('750'));
  };

  const handleDoneRecipes = () => {
    const date = new Date().toLocaleDateString().split('/');
    const removeDay = date.splice(1, 1)[0];
    const newArr = [removeDay].concat(date).join('/');
    console.log(recipe.strTags);
    const tagsArr = recipe.strTags === null ? [] : recipe.strTags.split(',');
    const recipeDone = [{
      id: recipe.idMeal || recipe.idDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      doneDate: newArr,
      tags: tagsArr,
      nationality: recipe.strArea,
      type: type.route === '/foods' ? 'food' : 'drink',
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDone));
    history.push('/done-recipes');
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${type.name}Thumb`] }
        alt={ recipe[`str${type.name}`] }
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${type.name}`] }
      </h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleCopy }
      >
        Share
      </button>
      <FavoriteButton recipe={ recipe } />
      <p data-testid="recipe-category">
        { recipe.strCategory }
        &nbsp;
        { recipe.strAlcoholic }
      </p>
      { steps.map((step, index) => (
        <div
          key={ index }
        >
          <label
            htmlFor={ `checkbox-${index}` }
            data-testid={ `${index}-ingredient-step` }
            style={ {
              display: 'flex',
              gap: '0.75rem',
              flexDirection: 'row-reverse',
              justifyContent: 'start',
            } }
          >
            <p
              style={ {
                textDecoration: step.done ? 'line-through' : 'none',
              } }
            >
              <strong>{step.name}</strong>
              &nbsp;
              <span>{step.qty}</span>
            </p>
            <input
              type="checkbox"
              id={ `checkbox-${index}` }
              checked={ step.done }
              onChange={ (e) => handleClick(e, index) }
            />
          </label>
        </div>
      )) }
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleDoneRecipes }
        disabled={ !steps.every(({ done }) => (done)) }
        style={ {
          position: 'fixed',
          bottom: 0,
        } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
