import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './DarkModeContext'
import Navbar from './navbar'
import Home from './Home'
import Countrypage from './countryPage'

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryName" element={<Countrypage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  )
}

export default App
