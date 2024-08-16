import { render, screen, fireEvent } from '@testing-library/react';
import InputTag from './InputTag';
import { KEYIT } from '../../Assets/keyTag/key';

// Mock the key tags
jest.mock('../../Assets/keyTag/key', () => ({
  KEYIT: ['HTML', 'React', 'CSS'],
}));

test('renders InputTag component with correct placeholder and initial tags', () => {
  const setTags = jest.fn();

  render(<InputTag setTags={setTags} />);

  // Check if the placeholder is rendered correctly
  expect(screen.getByPlaceholderText(/Add a tag/i)).toBeInTheDocument();
});

test('allows addition of tags', () => {
  const setTags = jest.fn();
  
  render(<InputTag setTags={setTags} />);

  // Get the input field
  const inputField = screen.getByPlaceholderText(/Add a tag/i);

  // Simulate adding a tag
  fireEvent.change(inputField, { target: { value: 'JavaScript' } });
  fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Verify if setTags has been called with the new tag
  expect(setTags).toHaveBeenCalledWith(expect.arrayContaining([{ id: 'JavaScript', text: 'JavaScript' }]));
});

test('allows deletion of tags', () => {
  const setTags = jest.fn();
  
  // Initial tags
  const initialTags = [{ id: 'HTML', text: 'HTML' }, { id: 'React', text: 'React' }];

  // Render InputTag with initial tags
  render(<InputTag setTags={setTags} />);

  // Simulate deletion of a tag
  fireEvent.click(screen.getByText('HTML').closest('div').querySelector('button'));

  // Verify if setTags has been called with the remaining tags
  expect(setTags).toHaveBeenCalledWith([{ id: 'React', text: 'React' }]);
});

test('allows reordering of tags', () => {
  const setTags = jest.fn();

  // Initial tags
  const initialTags = [{ id: 'HTML', text: 'HTML' }, { id: 'React', text: 'React' }];

  // Render InputTag with initial tags
  render(<InputTag setTags={setTags} />);

  // Get the tags list
  const tagList = screen.getAllByText(/HTML|React/i);

  // Simulate dragging and dropping the first tag to the second position
  // (The actual drag and drop simulation may require a different approach or library)

  // Verify if setTags has been called with the updated tag order
  expect(setTags).toHaveBeenCalledWith([{ id: 'React', text: 'React' }, { id: 'HTML', text: 'HTML' }]);
});
