import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

// Test untuk Navbar saat pengguna tidak login
test('renders Navbar component with signup and login buttons when not logged in', () => {
  render(<Navbar isLoggedIn={false} />);
  
  // Mendapatkan semua elemen dengan teks "Daftar"
  const daftarButtons = screen.getAllByText(/Daftar/i);
  
  // Mengecek apakah setidaknya satu elemen "Daftar" ada di dokumen
  expect(daftarButtons.length).toBeGreaterThan(0);
  
  // Melakukan asersi lebih lanjut pada elemen spesifik
  expect(daftarButtons[0]).toBeInTheDocument();

  // Mendapatkan semua elemen dengan teks "Masuk"
  const masukButtons = screen.getAllByText(/Masuk/i);
  expect(masukButtons.length).toBeGreaterThan(0);
  expect(masukButtons[0]).toBeInTheDocument();
});

// Test untuk Navbar saat pengguna sudah login
test('renders Navbar component with logout button when logged in', () => {
  render(<Navbar isLoggedIn={true} />);
  
  // Mendapatkan semua elemen dengan teks "Keluar"
  const keluarButtons = screen.getAllByText(/Keluar/i);
  
  // Mengecek apakah setidaknya satu elemen "Keluar" ada di dokumen
  expect(keluarButtons.length).toBeGreaterThan(0);
  
  // Melakukan asersi lebih lanjut pada elemen spesifik
  expect(keluarButtons[0]).toBeInTheDocument();
});
