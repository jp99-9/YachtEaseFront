import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './paginas/Login';
import { Dashboard } from './paginas/Dashboard';
import { Perfiles } from './paginas/Perfiles';

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/' element={<Perfiles />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
