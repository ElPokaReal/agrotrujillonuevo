import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import {Container} from '@mui/material'
import Menu from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
