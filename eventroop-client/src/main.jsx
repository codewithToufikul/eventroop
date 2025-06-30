import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './Pages/Routes.jsx';
import { AlertProvider } from './components/AlertContext.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>,
)
