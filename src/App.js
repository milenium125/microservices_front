import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/usuario/Home';
import {Profile} from './components/usuario/Profile';
import FindServices from './components/usuario/FindServices';
import {Solicitud} from './components/usuario/Solicitud';
import TrabajaConNosotros from './components/trabajador/TrabajaConNosotros';
import {PerfilTrabajador} from './components/trabajador/PerfilTrabajador';
import { AccountInformation } from './components/usuario/AccountInformation';
import { SolicitudesTrabajador } from './components/trabajador/SolicitudesTrabajador';
import { Servicios } from './components/trabajador/Servicios'; 
import { CentroAyuda } from './components/trabajador/CentroAyuda';
import { ChatAtencionEmpleado } from './components/trabajador/ChatTrabajadorEmpleado';

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
        <Route path="/centro-ayuda" element={<CentroAyuda/>} />
        <Route path="/chat-atencion" element={<ChatAtencionEmpleado/>} />
      </Routes>
    </Router>
  );
}

export default App;
