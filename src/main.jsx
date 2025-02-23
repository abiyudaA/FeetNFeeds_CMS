import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
