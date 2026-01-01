import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
import { UserAuthContextProvider } from './context/userAuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
      <App />
    </UserAuthContextProvider>
  </StrictMode>,
)
