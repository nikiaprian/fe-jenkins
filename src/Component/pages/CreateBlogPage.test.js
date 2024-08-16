// import { render, screen, fireEvent } from '@testing-library/react';
// import CreateBlogPage from './CreateBlogPage';
// import { MemoryRouter } from 'react-router-dom';

// // Mocking axios and SweetAlert2
// jest.mock('axios', () => ({
//   post: jest.fn(() => Promise.resolve({ data: {} })),
// }));

// jest.mock('sweetalert2', () => ({
//   fire: jest.fn(),
// }));

// test('renders CreateBlogPage with all necessary components and functionality', () => {
//   render(
//     <MemoryRouter>
//       <CreateBlogPage />
//     </MemoryRouter>
//   );
  
//   // Memastikan elemen dengan teks yang benar ada
//   expect(screen.getByLabelText(/Judul Blog/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Masukkan judul Blog/i)).toBeInTheDocument();
//   expect(screen.getByText(/Upload Image Banner Blog/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Deskripsi/i)).toBeInTheDocument();
  
//   // Memastikan tombol Submit ada
//   expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  
//   // Memastikan input tags bekerja
//   const inputTag = screen.getByRole('textbox', { name: /Tags/i });
//   fireEvent.change(inputTag, { target: { value: 'Test Tag' } });
//   expect(inputTag.value).toBe('Test Tag');
  
//   // Memastikan pratinjau markdown ada
//   expect(screen.getByText(/Preview/i)).toBeInTheDocument();

//   // Memastikan komponen Navbar, BreadCrumbs, dan Footer ada
//   expect(screen.getByTestId('navbar')).toBeInTheDocument();
//   expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
//   expect(screen.getByTestId('footer')).toBeInTheDocument();
  
//   // Memastikan fungsi handleClick dipanggil saat tombol submit diklik
//   fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
//   expect(axios.post).toHaveBeenCalled();
// });
