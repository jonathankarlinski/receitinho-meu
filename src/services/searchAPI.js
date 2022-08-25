const NO_RESULTS_ERROR = 'Sorry, we haven\'t found any recipes for these filters.';
const MAX_CATEGORIES = 5;
const NUM_CHAR = 13;

export const fetchCategories = async (type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    return results.slice(0, MAX_CATEGORIES);
  } catch (err) {
    console.log(err);
  }
};

export const fetchByCategory = async (category, type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    if (!results || results.length === 0) {
      global.alert(NO_RESULTS_ERROR);
      return [];
    }

    return results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchByName = async (name, type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    if (!results || results.length === 0) {
      global.alert(NO_RESULTS_ERROR);
      return [];
    }

    return results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchByIngredient = async (ingredient, type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    if (!results || results.length === 0) {
      global.alert(NO_RESULTS_ERROR);
      return [];
    }

    return results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchByFirstLetter = async (firstLetter, type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/search.php?f=${firstLetter}`;

  try {
    if (firstLetter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }

    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    if (!results || results.length === 0) {
      global.alert(NO_RESULTS_ERROR);
      return [];
    }

    return results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchById = async (id, type) => {
  const url = `https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data[type === 'meal' ? 'meals' : 'drinks'];

    if (!results || results.length === 0) {
      global.alert(NO_RESULTS_ERROR);
      return {};
    }

    return {
      ...results[0],
      ingredients: Object.entries(results[0]).filter(([key, value]) => (
        key.includes('strIngredient') && value
      )).map(([key, value]) => ({
        name: value,
        qty: results[0][`strMeasure${key.slice(NUM_CHAR)}`],
      })),
    };
  } catch (err) {
    console.log(err);
  }
};
