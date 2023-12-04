import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from './Header'
import Flyers from './Flyers';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/flyers",
    element: <Flyers/>
  }
]);

export default router;