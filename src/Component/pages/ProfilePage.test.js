import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders ProfilePage with user profile and list of created forums and blogs', () => {
  render(<ProfilePage />);
  
  const profileInfo = screen.getByText(/Profile Information/i);
  const createdForums = screen.getByText(/Created Forums/i);
  const createdBlogs = screen.getByText(/Created Blogs/i);
  
  expect(profileInfo).toBeInTheDocument();
  expect(createdForums).toBeInTheDocument();
  expect(createdBlogs).toBeInTheDocument();
});
