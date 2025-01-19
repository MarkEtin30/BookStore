import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext.tsx'
import { AuthenticationProvider } from './contexts/AuthenticationContext.tsx'
import 'bootswatch/dist/lux/bootstrap.min.css';
import { CartProvider } from './contexts/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  
  
  <StrictMode>
    
    <BrowserRouter> 
    <AuthenticationProvider>
    <DarkModeProvider>
    <CartProvider>
{/* followed by   npm i react-router-dom   command this code BrowserRouter will make 
the SQL and back end possible, and create a combintion of from and back end!!!!!!!!*/}

    <App />
    </CartProvider>
    </DarkModeProvider>
    </AuthenticationProvider>
    </BrowserRouter>
  </StrictMode>
  
)
