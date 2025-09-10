import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Page from './page'
import Navbar from './navbar'
import Card from './card'
import Countrypage from './countryPage'
import { DarkModeProvider } from './DarkModeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Navbar/>
      <Card/>
      {/* <Countrypage/> */}
    {/* <Page/> */}
    <p>fdf

    </p>
    <h1>fsdf</h1>
    </DarkModeProvider>
  </StrictMode>,
)
