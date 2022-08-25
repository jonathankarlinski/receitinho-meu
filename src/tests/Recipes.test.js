import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import Recipes from '../pages/Recipes';
import { SearchProvider } from '../context/search';
import App from '../App';

describe('Testa do componente Recipes', () => {
  test('Testa se existe os links de perfil e search', () => {
    renderWithRouter(<Recipes />);

    const profile = screen.getByTestId('profile-top-btn')
    const search = screen.getByTestId('search-top-btn')

    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  test('Testa comportamento de filtro por categoria na página Drinks', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <Recipes />
      </SearchProvider>,
    );

    const btn = screen.getByTestId('All-category-filter')

    await waitFor(() => {
      expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument()
    })

    const shake = screen.getByText('Shake')

    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    expect(shake).toBeInTheDocument();
    userEvent.click(shake);

    await waitFor(() => {
      expect(screen.getByText('Blind Russian')).toBeInTheDocument()
    })

    const blindRussian = screen.getByText('Blind Russian')

    expect(blindRussian).toBeInTheDocument()
    userEvent.click(blindRussian);

    expect(history.location.pathname).toBe('/drinks/14356')
  });

  test('Testa comportamento de filtro por categoria na página Foods', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <Recipes />
      </SearchProvider>
    );

    history.push("/foods");
    expect(history.location.pathname).toBe("/foods")

    const btn = screen.getByTestId('All-category-filter')

    await waitFor(() => {
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument()
    })

    const goat = screen.getByText('Goat')

    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    expect(goat).toBeInTheDocument();
    userEvent.click(goat);

    await waitFor(() => {
      expect(screen.getByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument()
    })

    const roastedGoat = screen.getByText('Mbuzi Choma (Roasted Goat)')

    expect(roastedGoat).toBeInTheDocument()
    userEvent.click(roastedGoat);

    expect(history.location.pathname).toBe('/foods/52968')
  });
});
