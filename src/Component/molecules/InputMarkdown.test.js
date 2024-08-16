import { render, screen } from '@testing-library/react';
import InputMarkdown from './InputMarkdown';
import '@testing-library/jest-dom/extend-expect'; // Untuk matcher seperti `toBeInTheDocument`

test('renders InputMarkdown component with editor', () => {
  render(<InputMarkdown />);

  // Memastikan bahwa elemen editor yang memiliki placeholder ditampilkan
  const editorElement = screen.getByPlaceholderText(/Tutorial Penggunaan/i);
  expect(editorElement).toBeInTheDocument();
  
  // Memastikan bahwa deskripsi yang diterima sebagai props ditampilkan
  // Jika Anda tidak memberikan deskripsi saat render, ini mungkin tidak diperlukan
  // Anda dapat menambahkan props deskripsi jika ada di komponen
  // expect(screen.getByText(/Tutorial Penggunaan/i)).toBeInTheDocument();
});
