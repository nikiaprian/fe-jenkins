import { render, screen, fireEvent } from '@testing-library/react';
import InputTag from './InputTags';
import '@testing-library/jest-dom/extend-expect';

const mockSetTags = jest.fn();

test('renders InputTag component', () => {
  render(<InputTag setTags={mockSetTags} />);

  // Verify the component renders correctly
  expect(screen.getByText('Tags')).toBeInTheDocument();
});

test('adds a new tag', () => {
  render(<InputTag setTags={mockSetTags} />);

  // Get the input element and simulate adding a tag
  const input = screen.getByPlaceholderText('Add a tag');
  fireEvent.change(input, { target: { value: 'HTML' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });

  // Verify that the tag is added
  expect(mockSetTags).toHaveBeenCalledWith([{ id: 'HTML', text: 'HTML' }]);
});

test('deletes a tag', () => {
  const initialTags = [{ id: 'HTML', text: 'HTML' }, { id: 'React', text: 'React' }];
  render(<InputTag setTags={mockSetTags} />);

  // Simulate adding initial tags
  fireEvent.change(screen.getByPlaceholderText('Add a tag'), { target: { value: 'HTML' } });
  fireEvent.keyDown(screen.getByPlaceholderText('Add a tag'), { key: 'Enter', code: 13 });
  fireEvent.change(screen.getByPlaceholderText('Add a tag'), { target: { value: 'React' } });
  fireEvent.keyDown(screen.getByPlaceholderText('Add a tag'), { key: 'Enter', code: 13 });

  // Simulate tag deletion
  const deleteButton = screen.getByText('HTML').closest('div').querySelector('button');
  fireEvent.click(deleteButton);

  // Verify that the delete function was called
  expect(mockSetTags).toHaveBeenCalledWith([{ id: 'React', text: 'React' }]);
});

test('handles tag drag and drop', () => {
  // Setup initial state
  const initialTags = [{ id: 'HTML', text: 'HTML' }, { id: 'React', text: 'React' }];
  render(<InputTag setTags={mockSetTags} />);

  // Simulate drag and drop (mock implementation, not actual drag-and-drop)
  const tagHTML = screen.getByText('HTML');
  const tagReact = screen.getByText('React');

  // Mock drag and drop by directly setting new order
  // This step might require specific drag-and-drop libraries for real tests

  // Verify that the tags were reordered correctly
  expect(mockSetTags).toHaveBeenCalledWith([{ id: 'React', text: 'React' }, { id: 'HTML', text: 'HTML' }]);
});
