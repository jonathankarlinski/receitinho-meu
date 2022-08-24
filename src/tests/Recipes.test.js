import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Testa do componente Recipes', () => {
  test('Testa se existe os links de perfil e search', () => {
    renderWithRouter(<Recipes />);
    
    const profile = screen.getByTestId('profile-top-btn')
    const search = screen.getByTestId('search-top-btn')
  
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
  test('Testa comportamento de click no botão All', () => {
    renderWithRouter(<Recipes />);

    const btn = screen.getByTestId('All-category-filter')

    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
  })

});
