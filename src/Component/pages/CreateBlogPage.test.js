import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateBlogPage from './CreateBlogPage';
import '@testing-library/jest-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Mock axios and Swal
jest.mock('axios');
jest.mock('sweetalert2');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CreateBlogPage', () => {
  const navigate = jest.fn();
  const mockSwalFire = Swal.fire;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
  });

  test('renders CreateBlogPage components', () => {
    render(<CreateBlogPage />);

    // Check if the components are rendered
    expect(screen.getByText('Judul Blog')).toBeInTheDocument();
    expect(screen.getByText('Deskripsi')).toBeInTheDocument();
    expect(screen.getByText('Click to upload')).toBeInTheDocument();
  });

  test('handles form submission and API call', async () => {
    // Setup mock responses
    axios.post.mockResolvedValue({ data: { message: 'success' } });
    mockSwalFire.mockResolvedValue({ isConfirmed: true });

    render(<CreateBlogPage />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Masukkan judul Blog'), { target: { value: 'Test Blog Title' } });
    fireEvent.change(screen.getByPlaceholderText('Tulis deskripsi anda disini'), { target: { value: 'Test Blog Content' } });

    // Mock file input
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Click to upload/i), { target: { files: [file] } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit')); // assuming the button has 'Submit' text

    // Assert axios.post is called with correct parameters
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://docker-alb-be-2139963268.us-west-2.elb.amazonaws.com:9090/blogs/new',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('ACCESS_KEY')}`,
          },
        }
      );
    });

    // Assert Swal.fire is called with success message
    await waitFor(() => {
      expect(mockSwalFire).toHaveBeenCalledWith('Berhasil!', 'Anda Telah Berhasil membuat Blog', 'success');
    });

    // Assert navigation is called
    expect(navigate).toHaveBeenCalledWith('/blog');
  });

  test('handles API error and logout', async () => {
    // Setup mock responses
    axios.post.mockRejectedValue({ response: { status: 401 } });
    mockSwalFire.mockResolvedValue({ isConfirmed: true });

    render(<CreateBlogPage />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Masukkan judul Blog'), { target: { value: 'Test Blog Title' } });
    fireEvent.change(screen.getByPlaceholderText('Tulis deskripsi anda disini'), { target: { value: 'Test Blog Content' } });

    // Mock file input
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Click to upload/i), { target: { files: [file] } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Assert Swal.fire is called with error message
    await waitFor(() => {
      expect(mockSwalFire).toHaveBeenCalledWith({
        title: 'Gagal!',
        text: 'Anda Tidak Berhasil membuat Blog',
        icon: 'error',
        confirmButtonText: 'ya, saya mencoba kembali',
      });
    });

    // Assert localStorage cleanup and navigation
    expect(localStorage.getItem('ACCESS_KEY')).toBe(null);
    expect(localStorage.getItem('idUser')).toBe(null);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
