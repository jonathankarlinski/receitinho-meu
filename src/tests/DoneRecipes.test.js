import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa do componente DoneRecipes', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<DoneRecipes />);
    
    const text = screen.getByText('Done Recipes')
  
    expect(text).toBeInTheDocument();
  });
});
