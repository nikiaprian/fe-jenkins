import { render, screen, act } from '@testing-library/react';
import App from './App';

test('menampilkan tautan learn react', async () => {
  // Render komponen
  await act(async () => {
    render(<App />);
  });

  // Temukan elemen tautan
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
