import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import SearchBar from '../components/SearchBar'

describe('Testa do componente SearchBar', () => {
  it('Testa se existe o componente', () => {
    renderWithRouter(<SearchBar />);
    
    const iconSearch = screen.getByTestId('search-top-btn');
    
    expect(iconSearch).toBeInTheDocument();

    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId('search-input');
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'milk');
    
    userEvent.click(ingredientSearch);
    userEvent.click(searchButton);
    
    userEvent.click(nameSearch);
    userEvent.click(searchButton);
    
    userEvent.type(inputSearch, 'f');
    
    userEvent.click(firstLetterSearch);
    userEvent.click(searchButton);
    
    expect(inputSearch).toBeInTheDocument();
  });
});
