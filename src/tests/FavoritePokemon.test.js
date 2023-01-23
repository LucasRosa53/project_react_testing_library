import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFound = screen.getByText(/No favorite Pokémon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[0]] } />);
    const pokemonFav = screen.getByText(/Pikachu/i);
    expect(pokemonFav).toBeInTheDocument();
  });
});
