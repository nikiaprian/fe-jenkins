import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Component/pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </React.Suspense>
          }
        />
        {/* routes lainnya */}
      </Routes>
    </>
  );
}

export default App;



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
