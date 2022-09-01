import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from '../utils/renderWithRouter';
jest.mock('clipboard-copy');

const favoriteItems = [
  {
    alcoholicOrNot: "Alcoholic",
    category: "Ordinary Drink",
    id: "17203",
    image: "https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg",
    name: "Kir",
    nationality: "",
    type: "drink",
  }
]

describe('Testa do componente Favorite Recipes', () => {
  test('Testa se existe o componente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteItems))

    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem')

    renderWithRouter(<FavoriteRecipes />);
    
    const text = screen.getByText('Favorite Recipes')

    const filterByAllButton = screen.getByTestId("filter-by-all-btn")
    const filterByFoodButton = screen.getByTestId("filter-by-food-btn")
    const filterByDrinkButton = screen.getByTestId("filter-by-drink-btn")
    const image = screen.getByTestId("0-horizontal-image")
    const shareButton = screen.getByTestId("0-horizontal-share-btn")
    const removeFavoriteButton = screen.getByTestId("0-horizontal-favorite-btn")

    userEvent.click(shareButton.parentElement)

    await waitFor(() => {
      expect(screen.getByText('Link copied!')).toBeInTheDocument()
    }, { timeout: 1000 })

    expect(image).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Share')).toBeInTheDocument()
    }, { timeout: 1000 })

    userEvent.click(removeFavoriteButton)

    expect(Object.getPrototypeOf(localStorage).setItem).toBeCalledWith("favoriteRecipes", "[]")

    expect(image).not.toBeInTheDocument()

    expect(filterByAllButton).toBeInTheDocument()
    userEvent.click(filterByAllButton)

    expect(image).not.toBeInTheDocument()

    expect(filterByDrinkButton).toBeInTheDocument()
    userEvent.click(filterByDrinkButton)

    expect(image).not.toBeInTheDocument()

    expect(filterByFoodButton).toBeInTheDocument()
    userEvent.click(filterByFoodButton)

    expect(image).not.toBeInTheDocument()

    expect(text).toBeInTheDocument();

    expect(Object.getPrototypeOf(localStorage).getItem).toBeCalledTimes(3)
    expect(Object.getPrototypeOf(localStorage).setItem).toBeCalledTimes(1)
  });

  test('Testa se existe o componente', async () => {
    renderWithRouter(<FavoriteRecipes />);
  });
});
