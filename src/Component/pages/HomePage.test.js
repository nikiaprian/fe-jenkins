// HomePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage'; // sesuaikan path dengan lokasi file Anda

// Mock komponen-komponen yang digunakan di dalam HomePage
jest.mock('../atoms/ScrollButton', () => () => <div>ScrollButton</div>);
jest.mock('../molecules/Footer', () => () => <div>Footer</div>);
jest.mock('../molecules/Navbar', () => () => <div>Navbar</div>);
jest.mock('../../Assets/gambarUtama.png', () => 'gambarUtama.png');
jest.mock('../../Assets/forumin.png', () => 'forumin.png');
jest.mock('../../Assets/blogin.png', () => 'blogin.png');
jest.mock('../../Assets/comment2.png', () => 'comment2.png');
jest.mock('../../Assets/righticon.svg', () => 'righticon.svg');
jest.mock('../../ApiFake/dataFaqStatic', () => ({
  faqList: [
    { question: 'What is CodeIn?', answer: 'CodeIn is a platform for programmers to share and discuss information.' },
    // tambahkan lebih banyak FAQ jika diperlukan
  ],
}));

describe('HomePage', () => {
  test('renders HomePage correctly', () => {
    render(<HomePage />);

    // Cek keberadaan komponen yang di-render
    expect(screen.getByText(/Website untuk membantu Programmer menjadi lebih baik/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform ini dibuat untuk memberikan kemudahan bagi Programmer Indonesia/i)).toBeInTheDocument();
    expect(screen.getByText(/Tentang/i)).toBeInTheDocument();
    expect(screen.getByText(/Produk Forum Tanya Jawab/i)).toBeInTheDocument();
    expect(screen.getByText(/Produk Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Testimonial/i)).toBeInTheDocument();
    expect(screen.getByText(/FaQ CodeIn/i)).toBeInTheDocument();

    // Cek apakah gambar ada di dokumen
    expect(screen.getByAltText('')).toHaveAttribute('src', 'gambarUtama.png');
    expect(screen.getByAltText('')).toHaveAttribute('src', 'forumin.png');
    expect(screen.getByAltText('')).toHaveAttribute('src', 'blogin.png');
    expect(screen.getByAltText('')).toHaveAttribute('src', 'comment2.png');

    // Cek tampilan FAQ
    const faqItems = screen.getAllByText(/What is CodeIn\?/i);
    expect(faqItems).toHaveLength(1);
  });

  test('FAQ section expands and collapses correctly', () => {
    render(<HomePage />);

    // Temukan checkbox FAQ
    const checkbox = screen.getByRole('checkbox');
    
    // Cek apakah FAQ tersembunyi pada awalnya
    expect(screen.queryByText(/CodeIn is a platform for programmers to share and discuss information\./i)).not.toBeVisible();

    // Klik checkbox untuk membuka FAQ
    fireEvent.click(checkbox);

    // Cek apakah FAQ terlihat setelah diklik
    expect(screen.getByText(/CodeIn is a platform for programmers to share and discuss information\./i)).toBeVisible();

    // Klik checkbox lagi untuk menutup FAQ
    fireEvent.click(checkbox);

    // Cek apakah FAQ tersembunyi lagi
    expect(screen.queryByText(/CodeIn is a platform for programmers to share and discuss information\./i)).not.toBeVisible();
  });
});
