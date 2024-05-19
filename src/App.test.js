import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('menampilkan tautan learn react', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
