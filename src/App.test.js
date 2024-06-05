import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders homepage elements', async () => {
  await waitFor(() => {
    render(<App />);
  });

  // Check if the text "Website untuk membantu" is in the document
  const element = screen.queryByText(/Website untuk membantu/);
  expect(element).toBeInTheDocument(); // Expect the element to be in the document or null
});



// import React from 'react';
// import { render } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// import App from './App';

// test('renders learn react link', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   // Your test assertions here
// });
