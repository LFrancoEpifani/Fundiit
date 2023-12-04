import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import './index.css';



import {RouterProvider} from "react-router-dom";
import router from './reactRouter.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
      <Header/>
    </RouterProvider>

);