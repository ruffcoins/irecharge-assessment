import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CityDetail from './components/CityDetail.tsx';
import HomeLayout from './components/layout/HomeLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout><App /></HomeLayout>,
  },
  {
    path: "/city-detail/:city",
    element: <HomeLayout><CityDetail /></HomeLayout>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
