import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import {Profile} from './components/profile';
import FindServices from './components/findServices';
import {Solicitud} from './components/Solicitud';
import TrabajaConNosotros from './components/TrabajaConNosotros';
import PerfilTrabajador from './components/PerfilTrabajador';
import { AccountInformation } from './components/AccountInformation';
import { SolicitudesTrabajador } from './components/SolicitudesTrabajador';
import { Servicios } from './components/Servicios'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<AccountInformation />} />
        <Route path="/findServices" element={<FindServices />} />
        <Route path="/solicitud" element={<Solicitud/>} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros/>} />
        <Route path="/perfil-trabajador" element={<PerfilTrabajador/>} />
        <Route path="/solicitudes-trabajador" element={<SolicitudesTrabajador/>} />
        <Route path="/servicios" element={<Servicios/>} />
      </Routes>
    </Router>
  );
}

export default App;
