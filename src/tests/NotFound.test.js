import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2', () => {
    const { history } = renderWithRouter(<NotFound />);
    act(() => {
      history.push('/test');
    });

    const title2 = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(title2).toBeInTheDocument();
  });
  test('Teste se a página mostra uma imagem', () => {
    const { history } = renderWithRouter(<NotFound />);
    act(() => {
      history.push('/test');
    });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
