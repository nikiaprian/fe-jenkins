import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import axios from 'axios';
import { useBlogStore, useForumStore } from '../store/ProductStore';

// Mock axios
jest.mock('axios');
jest.mock('../store/ProductStore', () => ({
  useBlogStore: jest.fn(),
  useForumStore: jest.fn(),
}));

test('renders ProfilePage with user profile and list of created forums and blogs', async () => {
  // Mock the API responses
  axios.get.mockResolvedValue({
    data: {
      data: {
        username: 'Test User',
        photo: 'test-photo-url',
      },
    },
  });
  
  // Mock Zustand store fetchBlogs and fetchForums
  useBlogStore.mockReturnValue({
    fetchBlogs: jest.fn(),
    blogs: [{ title: 'Test Blog', id: 1 }],
  });
  useForumStore.mockReturnValue({
    fetchForums: jest.fn(),
    forums: [{ title: 'Test Forum', id: 1 }],
  });

  render(<ProfilePage />);
  
  // Wait for the profile data to be loaded
  await waitFor(() => expect(screen.getByText(/Test User/i)).toBeInTheDocument());

  // Assert that the profile info and lists are rendered
  expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Blog/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Forum/i)).toBeInTheDocument();
});
