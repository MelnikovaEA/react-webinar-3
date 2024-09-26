import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import Main from "./app/main";
import InfoPage from "./app/info-page";

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
      {
        path: "/item/:_id",
        element: <InfoPage/>,
      },
    ]
  }
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router}/>
  </StoreContext.Provider>,
);
