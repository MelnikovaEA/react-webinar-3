import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './main';
import InfoPage from './info-page';
import '../index.css'

/**
 * Компонент приложения с внутренним роутингом
 * @returns {React.ReactElement}
 */
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/item/:_id',
      element: <InfoPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
