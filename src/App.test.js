import { render, screen, waitFor } from '@testing-library/react';
import LoginPage from '../Component/pages/LoginPage.js'; // Sesuaikan path ini dengan struktur folder Anda

test('Tombol "Masuk" ada di halaman login', async () => {
  render(<LoginPage />);

  // Menunggu hingga komponen LoginPage dimuat
  await waitFor(() => {
    const buttonElement = screen.getByRole('button', { name: /masuk/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
