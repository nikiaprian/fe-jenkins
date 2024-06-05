import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders homepage elements', async () => {
  await act(async () => {
    const { getByText, getByAltText, queryByTestId, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Print DOM for debugging
    debug();

    // Tunggu sampai elemen loading hilang
    await waitFor(() => {
      expect(queryByTestId('three-circles-wrapper')).not.toBeInTheDocument();
    });

    // Memastikan judul halaman muncul
    await waitFor(() => {
      expect(getByText(/Website untuk membantu/)).toBeInTheDocument();
    });

    // Memastikan deskripsi platform muncul
    await waitFor(() => {
      expect(
        getByText(/Platform ini dibuat untuk memberikan kemudahan bagi Programmer/)
      ).toBeInTheDocument();
    });

    // Memastikan tombol "Tentang" muncul
    await waitFor(() => {
      expect(getByText(/Tentang/)).toBeInTheDocument();
    });

    // Memastikan gambar utama muncul
    await waitFor(() => {
      expect(getByAltText('')).toBeInTheDocument();  // sesuaikan dengan alt text gambar utama
    });

    // Memastikan judul dan deskripsi produk muncul
    await waitFor(() => {
      expect(
        getByText(/Produk Forum Tanya Jawab/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        getByText(/Produk Forum Tanya Jawab merupakan sebuah platform Programmer untuk Tanya jawab/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        getByText(/Produk Blog/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        getByText(/Produk Blog merupakan sebuah platform Programmer untuk bisa membuat informasi atau melihat informasi/)
      ).toBeInTheDocument();
    });

    // Memastikan bagian testimoni muncul
    await waitFor(() => {
      expect(
        getByText(/Testimonial/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        getByText(/Apa yang pelanggan katakan, tentang pengalaman mereka bersama kami/)
      ).toBeInTheDocument();
    });

    // Memastikan bagian FAQ muncul
    await waitFor(() => {
      expect(
        getByText(/FaQ CodeIn/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        getByText(/Punya pertanyaan seputar produk dan layanan CodeIn?/)
      ).toBeInTheDocument();
    });
  });
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
