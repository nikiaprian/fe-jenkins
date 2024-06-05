import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders homepage elements', () => {
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Memastikan judul halaman muncul
  expect(getByText(/Website untuk membantu/)).toBeInTheDocument();

  // Memastikan deskripsi platform muncul
  expect(
    getByText(/Platform ini dibuat untuk memberikan kemudahan bagi Programmer/)
  ).toBeInTheDocument();

  // Memastikan tombol "Tentang" muncul
  expect(getByText(/Tentang/)).toBeInTheDocument();

  // Memastikan gambar utama muncul
  expect(getByAltText('gambar utama')).toBeInTheDocument();

  // Memastikan judul dan deskripsi produk muncul
  expect(
    getByText(/Produk Forum Tanya Jawab/)
  ).toBeInTheDocument();
  expect(
    getByText(/Produk Forum Tanya Jawab merupakan sebuah platform Programmer untuk Tanya jawab/)
  ).toBeInTheDocument();

  expect(
    getByText(/Produk Blog/)
  ).toBeInTheDocument();
  expect(
    getByText(/Produk Blog merupakan sebuah platform Programmer untuk bisa membuat informasi atau melihat informasi/)
  ).toBeInTheDocument();

  // Memastikan bagian testimoni muncul
  expect(
    getByText(/Testimonial/)
  ).toBeInTheDocument();
  expect(
    getByText(/Apa yang pelanggan katakan, tentang pengalaman mereka bersama kami/)
  ).toBeInTheDocument();

  // Memastikan bagian FAQ muncul
  expect(
    getByText(/FaQ CodeIn/)
  ).toBeInTheDocument();
  expect(
    getByText(/Punya pertanyaan seputar produk dan layanan CodeIn?/)
  ).toBeInTheDocument();
});


// import React from 'react';
// import { render } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// import App from './App';

// test('renders learn react link', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   // Your test assertions here
// });
