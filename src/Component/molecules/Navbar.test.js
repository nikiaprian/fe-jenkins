import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(<Navbar />);
  
  // Mendapatkan semua elemen dengan teks "Daftar"
  const daftarButtons = screen.getAllByText(/Daftar/i);
  
  // Mengecek apakah setidaknya satu elemen "Daftar" ada di dokumen
  expect(daftarButtons.length).toBeGreaterThan(0);
  
  // Kamu bisa melakukan asersi lebih lanjut pada elemen spesifik
  expect(daftarButtons[0]).toBeInTheDocument();

  const masukButtons = screen.getAllByText(/Masuk/i);
  expect(masukButtons.length).toBeGreaterThan(0);
  expect(masukButtons[0]).toBeInTheDocument();
});

test('renders Navbar component when logged in', () => {
  render(<Navbar isLoggedIn={true} />);
  
  // Mendapatkan semua elemen dengan teks "Keluar"
  const keluarButtons = screen.getAllByText(/Keluar/i);
  
  // Mengecek apakah setidaknya satu elemen "Keluar" ada di dokumen
  expect(keluarButtons.length).toBeGreaterThan(0);
  
  // Kamu bisa melakukan asersi lebih lanjut pada elemen spesifik
  expect(keluarButtons[0]).toBeInTheDocument();
});
