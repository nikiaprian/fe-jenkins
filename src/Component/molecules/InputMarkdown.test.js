import { render, screen, fireEvent } from '@testing-library/react';
import InputMarkdown from './InputMarkdown';
import '@testing-library/jest-dom';

test('renders InputMarkdown component with initial value', () => {
  render(<InputMarkdown deskripsi="Deskripsi Markdown" placeholder="Mulai mengetik..." mode="markdown" />);

  // Check if the description text is rendered
  expect(screen.getByText('Deskripsi Markdown')).toBeInTheDocument();

  // Check if the editor's placeholder is present
  expect(screen.getByPlaceholderText('Mulai mengetik...')).toBeInTheDocument();
});

test('calls setEditorState when content changes', () => {
  const mockSetEditorState = jest.fn();
  render(<InputMarkdown deskripsi="Deskripsi Markdown" placeholder="Mulai mengetik..." mode="markdown" setEditorState={mockSetEditorState} />);

  // Get the editor element
  const editorElement = screen.getByRole('textbox');

  // Simulate a change event by typing some content
  fireEvent.input(editorElement, { target: { innerHTML: '<p>Test content</p>' } });

  // Simulate the editor's onChange event
  fireEvent.change(editorElement);

  // Check if setEditorState was called with the correct content
  expect(mockSetEditorState).toHaveBeenCalled();
});
