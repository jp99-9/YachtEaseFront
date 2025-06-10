import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './paginas/Login';
import { Dashboard } from './paginas/Dashboard';
import { Perfiles } from './paginas/Perfiles';
import { Inventario } from './paginas/Inventario';
import { Mapa } from './paginas/Mapa';
import { Movements } from './paginas/Movements';
import { ContactUs } from './paginas/ContactUs';

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Inventario' element={<Inventario />} />
        <Route path='/' element={<Perfiles />} />
        <Route path='/Mapa' element={<Mapa />} />
        <Route path='/Movements' element={<Movements />} />
        <Route path='/ContactUs' element={<ContactUs />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
