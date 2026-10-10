import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotesContextProvider } from './context/notesContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
