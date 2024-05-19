import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('menampilkan tombol Masuk di halaman Login', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  // Menunggu komponen untuk memuat jika menggunakan React.lazy
  const buttonElement = await screen.findByText(/Masuk/i);
  expect(buttonElement).toBeInTheDocument();
});
