import { render, screen, fireEvent } from '@testing-library/react';
import CreateBlogPage from './CreateBlogPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

test('renders CreateBlogPage with all necessary components', () => {
  render(
    <MemoryRouter>
      <CreateBlogPage />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Judul Blog/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Masukkan judul Blog/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload Image Banner Blog/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Deskripsi/i)).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeInTheDocument();

  // Jika input tags tidak muncul, coba periksa nama atau labelnya
  // const inputTag = screen.getByRole('textbox', { name: /Tags/i });
  // fireEvent.change(inputTag, { target: { value: 'Test Tag' } });
  // expect(inputTag.value).toBe('Test Tag');

  expect(screen.getByText(/Preview/i)).toBeInTheDocument();
});
