import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LikeUnlike from './LikeUnlike';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { useForumStore, useBlogStore } from '../store/ProductStore';

// Mocking axios and zustand store
jest.mock('axios');
jest.mock('../store/ProductStore', () => ({
  useForumStore: jest.fn(),
  useBlogStore: jest.fn(),
}));

const mockSetState = jest.fn();
const mockState = {
  is_you_like: false,
  total_likes: 0,
};

beforeEach(() => {
  jest.clearAllMocks();
  useForumStore.mockReturnValue({ forumId: { id: '123', is_you_like: false, total_likes: 0 } });
  useBlogStore.mockReturnValue({ blogId: { id: '456', is_you_like: false, total_likes: 0 } });
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
});

test('renders LikeUnlike component with heart outline icon', () => {
  render(<LikeUnlike type="likeForum" />);

  // Verify that the heart outline icon is rendered
  expect(screen.getByRole('img', { name: /heart outline/i })).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
});

test('renders LikeUnlike component with heart solid icon when liked', async () => {
  useForumStore.mockReturnValue({ forumId: { id: '123', is_you_like: true, total_likes: 10 } });
  render(<LikeUnlike type="likeForum" />);

  // Verify that the heart solid icon is rendered
  expect(screen.getByRole('img', { name: /heart solid/i })).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});

test('handles like button click', async () => {
  useForumStore.mockReturnValue({ forumId: { id: '123', is_you_like: false, total_likes: 0 } });
  render(<LikeUnlike type="likeForum" />);

  // Simulate click on the heart icon
  fireEvent.click(screen.getByRole('img', { name: /heart outline/i }));

  // Verify API call
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  expect(axios.post).toHaveBeenCalledWith('http://docker-alb-be-1593259606.us-west-2.elb.amazonaws.com:9090/like/forum/123', {}, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('ACCESS_KEY')}`,
    },
  });

  // Verify that the state is updated correctly
  await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
});

test('handles unlike button click', async () => {
  useForumStore.mockReturnValue({ forumId: { id: '123', is_you_like: true, total_likes: 10 } });
  render(<LikeUnlike type="likeForum" />);

  // Simulate click on the heart icon
  fireEvent.click(screen.getByRole('img', { name: /heart solid/i }));

  // Verify API call
  await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
  expect(axios.delete).toHaveBeenCalledWith('http://docker-alb-be-1593259606.us-west-2.elb.amazonaws.com:9090/like/forum/123', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('ACCESS_KEY')}`,
    },
  });

  // Verify that the state is updated correctly
  await waitFor(() => expect(screen.getByText('9')).toBeInTheDocument());
});
