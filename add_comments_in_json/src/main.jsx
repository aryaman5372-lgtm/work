import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './List.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <List/>
  </StrictMode>,
)
