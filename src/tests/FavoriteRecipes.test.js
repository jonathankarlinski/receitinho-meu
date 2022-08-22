import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa do componente Favorite Recipes', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<FavoriteRecipes />);
    
    const text = screen.getByText('Favorite Recipes')
  
    expect(text).toBeInTheDocument();
  });
});
