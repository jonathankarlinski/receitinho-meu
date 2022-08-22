import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testa do componente RecipeDetails', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<RecipeDetails />);
    
    const text = screen.getByText('Recipe Details')
  
    expect(text).toBeInTheDocument();
  });
});
