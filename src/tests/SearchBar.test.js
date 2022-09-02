import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from '../components/SearchBar';
import { SearchProvider } from '../context/search';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa do componente SearchBar', () => {
  it('Testa se existe o componente', async () => {
    renderWithRouter(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );

    jest.spyOn(global, 'alert').mockImplementation(() => {});
    jest.spyOn(global, "fetch")
    
    const iconSearch = screen.getByTestId('search-top-btn');
    
    expect(iconSearch).toBeInTheDocument();

    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId('search-input');
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch)
    userEvent.type(inputSearch, 'milk');

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(1)
    }, { timeout: 3000 })
    
    userEvent.click(ingredientSearch);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2)
    }, { timeout: 3000 })
    
    userEvent.click(nameSearch);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(3)
    }, { timeout: 3000 })
    
    userEvent.clear(inputSearch)
    userEvent.type(inputSearch, 'f');
    
    userEvent.click(firstLetterSearch);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(4)
    }, { timeout: 3000 })
    
    expect(inputSearch).toBeInTheDocument();
    
    userEvent.clear(inputSearch)
    userEvent.type(inputSearch, 'Arrabiata');
    
    userEvent.click(nameSearch);
    userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(5)
    }, { timeout: 3000 })
    
    userEvent.clear(inputSearch)
    userEvent.type(inputSearch, 'jonasCarlinhos');
    
    userEvent.click(nameSearch);
    userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.')
    }, { timeout: 3000 })

    userEvent.click(firstLetterSearch);
    userEvent.click(searchButton);

    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character')
  });
});
