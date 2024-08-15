import { render, screen} from '@testing-library/react';
import CreateBlogPage from './CreateBlogPage';
import { MemoryRouter } from 'react-router-dom';

test('renders CreateBlogPage with all necessary components', () => {
  render(
    <MemoryRouter>
      <CreateBlogPage />
    </MemoryRouter>
  );
  
  // Memastikan elemen dengan teks yang benar ada
  expect(screen.getByLabelText(/Judul Blog/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Masukkan judul Blog/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload Image Banner Blog/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Deskripsi/i)).toBeInTheDocument();
  
  // Memastikan tombol Submit ada
  expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  
  // // Memastikan input tags bekerja
  // const inputTag = screen.getByRole('textbox', { name: /Tags/i });
  // fireEvent.change(inputTag, { target: { value: 'Test Tag' } });
  // expect(inputTag.value).toBe('Test Tag');
  
  // Memastikan pratinjau markdown ada
  expect(screen.getByText(/Preview/i)).toBeInTheDocument();
});
