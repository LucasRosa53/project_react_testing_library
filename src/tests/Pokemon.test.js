import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonName = 'pokemon-name';
    const nomePokemon = screen.getByTestId(pokemonName);
    expect(nomePokemon.innerHTML).toBe('Pikachu');
  });
  test('O tipo correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);
    const typePokemon = 'pokemon-type';
    const elementoPokemon = screen.getByTestId(typePokemon);
    expect(elementoPokemon.innerHTML).toBe('Electric');
  });
  test('O peso médio do Pokémon deve ser exibido na tela', () => {
    renderWithRouter(<App />);
    const averageW = 'pokemon-weight';
    const pesoPokemon = screen.getByTestId(averageW);
    expect(pesoPokemon.innerHTML).toBe('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More Details/i);
    expect(moreDetails).toBeInTheDocument();
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(buttonDetails);
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    renderWithRouter(<App />);
    const pokemonId = screen.getByRole('link', { name: /More details/i });
    expect(pokemonId).toBeInTheDocument();
    expect(pokemonId).toHaveAttribute('href', '/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const buttonFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(buttonFavorite);
    const detalhesIcone = screen.getByAltText('Pikachu is marked as favorite');
    expect(detalhesIcone).toHaveAttribute('src', '/star-icon.svg');
    expect(detalhesIcone).toBeInTheDocument();
  });
});
