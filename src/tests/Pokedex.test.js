import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const listaDePokemons = pokemonList;

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(title).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(button).toBeInTheDocument();
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const nomeDoPokemon = 'pokemon-name';
    const pokemonNameEl = screen.getByTestId(nomeDoPokemon);
    listaDePokemons.forEach((pokemon) => {
      expect(pokemonNameEl.innerHTML).toBe(pokemon.name);
      userEvent.click(button);
    });
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista:
    expect(pokemonNameEl.innerHTML).toBe(listaDePokemons[0].name);
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = 'pokemon-name';
    const nomePokemon = screen.getAllByTestId(pokemon);
    expect(nomePokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const idButton = 'pokemon-type-button';
    const button = screen.getAllByTestId(idButton);
    const nomeButtons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    button.forEach((botao, index) => {
      expect(botao).toHaveTextContent(nomeButtons[index]);
      userEvent.click(botao);
      const todosNomes = screen.getAllByText(nomeButtons[index]);
      expect(todosNomes).toHaveLength(2);
    });
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(button).toBeEnabled();
    userEvent.click(button);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
