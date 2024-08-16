// src/Component/molecules/DeleteContent.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // untuk matchers seperti toBeInTheDocument
import DeleteContent from './DeleteContent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForumStore, useBlogStore } from '../store/ProductStore';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock dependencies
jest.mock('axios');
jest.mock('sweetalert2');
jest.mock('../store/ProductStore', () => ({
  useForumStore: jest.fn(),
  useBlogStore: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('DeleteContent Component', () => {
  const mockNavigate = jest.fn();
  const mockUseForumStore = useForumStore;
  const mockUseBlogStore = useBlogStore;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the TrashIcon if user ID matches', () => {
    mockUseForumStore.mockReturnValue({ forumId: { id: 1, user: { id: 1 } } });
    mockUseBlogStore.mockReturnValue({ blogId: { id: 1, user: { id: 1 } } });

    window.localStorage.setItem('idUser', '1');
    window.localStorage.setItem('ACCESS_KEY', 'fake-access-key');

    render(
      <Router>
        <DeleteContent type="deleteForum" />
      </Router>
    );

    const trashIcon = screen.getByRole('img', { name: /trash/i });
    expect(trashIcon).toBeInTheDocument();
  });

  test('does not render TrashIcon if user ID does not match', () => {
    mockUseForumStore.mockReturnValue({ forumId: { id: 1, user: { id: 2 } } });
    mockUseBlogStore.mockReturnValue({ blogId: { id: 1, user: { id: 2 } } });

    window.localStorage.setItem('idUser', '1');
    window.localStorage.setItem('ACCESS_KEY', 'fake-access-key');

    render(
      <Router>
        <DeleteContent type="deleteForum" />
      </Router>
    );

    const trashIcon = screen.queryByRole('img', { name: /trash/i });
    expect(trashIcon).toBeNull();
  });

  test('calls handleDelete and shows success alert on successful delete', async () => {
    mockUseForumStore.mockReturnValue({ forumId: { id: 1, user: { id: 1 } } });
    mockUseBlogStore.mockReturnValue({ blogId: { id: 1, user: { id: 1 } } });

    window.localStorage.setItem('idUser', '1');
    window.localStorage.setItem('ACCESS_KEY', 'fake-access-key');

    axios.delete.mockResolvedValue({ status: 200 });
    Swal.fire = jest.fn();

    render(
      <Router>
        <DeleteContent type="deleteForum" />
      </Router>
    );

    const trashIcon = screen.getByRole('img', { name: /trash/i });
    fireEvent.click(trashIcon);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Berhasil!',
      'Anda Telah Berhasil Menghapus!',
      'success'
    );
  });

  test('shows error alert on delete failure', async () => {
    mockUseForumStore.mockReturnValue({ forumId: { id: 1, user: { id: 1 } } });
    mockUseBlogStore.mockReturnValue({ blogId: { id: 1, user: { id: 1 } } });

    window.localStorage.setItem('idUser', '1');
    window.localStorage.setItem('ACCESS_KEY', 'fake-access-key');

    axios.delete.mockRejectedValue(new Error('Delete failed'));
    Swal.fire = jest.fn();

    render(
      <Router>
        <DeleteContent type="deleteForum" />
      </Router>
    );

    const trashIcon = screen.getByRole('img', { name: /trash/i });
    fireEvent.click(trashIcon);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Gagal!',
        text: 'Gagal Menghapus!',
        icon: 'error',
      })
    );
  });
});
