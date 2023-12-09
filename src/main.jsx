import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';



import {RouterProvider} from "react-router-dom";
import router from './reactRouter.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider 
  domain='dev-1caiugpj4be1yzto.us.auth0.com'
  clientId='GRH04QhSadBfPn4rHFiZsmFSr9BFF4Sl'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
    <RouterProvider router={router}>
      <Header/>
    </RouterProvider>
</Auth0Provider>
);