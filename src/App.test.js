import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import HomePage from './Component/pages/HomePage';

test('renders homepage elements', async () => {
  const { container, debug } = render(<HomePage />);

  // Print the rendered container for debugging
  debug(container);

  // Check if the text "Website untuk membantu" is in the document
  await waitFor(() => {
    const element = screen.getByText(/Website untuk membantu/);
    debug(element);  // Add this line
    expect(element).toBeInTheDocument();
  });
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
