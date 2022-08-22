export const fetchByIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(err);
  }
};

export const fetchByName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(err);
  }
};

export const fetchByFirstLetter = async (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  try {
    if (firstLetter.length > 1) {
      global.alert('Your search must have only 1 (one) character');

      throw new Error();
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
