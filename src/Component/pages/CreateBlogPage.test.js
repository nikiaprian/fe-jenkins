import { render, screen } from '@testing-library/react';
import CreateBlogPage from './CreateBlogPage';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument

test('renders CreateBlogPage component', () => {
  render(<CreateBlogPage />);

  // Mengecek apakah InputJudul dirender
  expect(screen.getByPlaceholderText(/Masukkan judul Blog/i)).toBeInTheDocument();

  // Mengecek apakah InputTags dirender
  expect(screen.getByText(/Tag/i)).toBeInTheDocument(); // atau teks lain yang relevan

  // Mengecek apakah InputFile dirender
  expect(screen.getByText(/Upload Image Banner Blog/i)).toBeInTheDocument();

  // Mengecek apakah InputMarkdown dirender
  expect(screen.getByPlaceholderText(/Tulis deskripsi anda disini/i)).toBeInTheDocument();

  // Mengecek apakah PreviewMarkdown dirender
  expect(screen.getByText(/Preview Markdown/i)).toBeInTheDocument(); // atau teks lain yang relevan

  // Mengecek apakah BackSubmit dirender
  expect(screen.getByText(/Kembali dan Kirim/i)).toBeInTheDocument(); // atau teks lain yang relevan

  // Mengecek apakah Navbar dirender
  expect(screen.getByText(/Navbar/i)).toBeInTheDocument(); // Pastikan Navbar berisi teks ini
});
