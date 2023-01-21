import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(
  'Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('Teste se a aplicação é redirecionada para a página inicial, na URL `/` ao clicar no link `Home` da barra de navegação', () => {
      renderWithRouter(<App />);

      const home = screen.getByText(/home/i);
      expect(home).toBeInTheDocument();
    });
    test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
      renderWithRouter(<App />);
      const about = screen.getByText(/about/i);
      expect(about).toBeInTheDocument();
    });
    test('Teste se a aplicação é redirecionada para a página de Favorite Pokémon,na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
      renderWithRouter(<App />);
      const pokemonFavoritados = screen.getByText(/Favorite Pokémon/i);
      expect(pokemonFavoritados).toBeInTheDocument();
    });
    test('Not Found', () => {
      renderWithRouter(<App />);
    });
  },
);
