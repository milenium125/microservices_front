import Header from "./header";
import {AccountInformationTrabajador} from "./AccountInformation";
import React, { useState , useEffect} from 'react';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from "react-router-dom";
import Empleos from "./Empleos";
import { SolicitudesTrabajador } from "./SolicitudesTrabajador";


let cookies = document.cookie;
          var id_login = 0;
          var value = "";
          var key = "";
          console.log(`Todas las cookies: ${cookies}`);
          for (let i = 0; i < cookies.length ; i++) {   
              console.log(cookies[i]); 
              
              if(cookies[i] === "="){
                  while(cookies[i] == ";" || i < cookies.length){
                      console.log(`key / value : ${key} / ${value}`); 
                      if(cookies[i] === "="){
                          i++;
                          continue;
                      }
                      value = value + cookies[i];

                      i++;
                  }
                  if(key === "id_sesion"){
                      id_login = parseInt(value);
                      console.log(`key / value ok : ${key} / ${value}`); 
                      i++;
                      break;
                  }else{
                      key = "";
                      value = "";
                  }
                  
              }else{
                  key = key + cookies[i];
              } 
          }

function SideBar(props){
    
    return(
                <>
                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                    >
                    <li>
                        <a className="dropdown-item" href="#">Mi cuenta</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Cerrar Sesión</a>
                    </li>
                    </ul>
                     {/* sidebar profile*/}
                     <div>
                                <div className="card mb-4">
                                <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-circle mb-3" style={{width: 150+"px"}} alt="Avatar" />
                                <h5 class="mb-2"><strong>{props.nombre}</strong></h5>
                                <p class="text-muted">Trabajador <span class="badge bg-danger">{props.estado}</span></p>
                                    <p className="text-muted mb-4">{props.ocupacion}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">Editar</button>
                                    <button type="button" className="btn btn-outline-primary ms-1">Configuracion</button>
                                    </div>
                                </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fas fa-user-tie"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => props.content(AccountInformationTrabajador)}>Informacion de la cuenta</a>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fas fa-list-check"></i>
                                        <Link to="/solicitudes-trabajador" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => props.content(SolicitudesTrabajador)}>Solicitudes</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i class="bi bi-plus-square-fill"></i>
                                        <Link to="/servicios" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Mis servicios</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fa-solid fa-circle-question"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Centro de ayuda</a>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i class="fa-solid fa-bag-shopping"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => props.content(Empleos)}>Empleos</a>
                                    </li>            
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fas fa-credit-card"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => props.content()}>Mis ganancias</a>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                        </div>
                </>
            )
}
export default function PerfilTrabajador(){

    const [contentAccount, setContentAccount] = useState(AccountInformationTrabajador);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [documento, setDocumento] = useState("");
    const [email, setEmail] = useState("");
    const [especializacion, setEspecializacion] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [estado, setEstado] = useState("");
    const [tipoEmpleado, setTipoEmpleado] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {   
            // const result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/persona/${id_login}`);
            const result_client = await axios.get(`http://localhost:3200/api/trabajador/find/${id_login}`);
            console.log(result_client.data);
            setNombre(result_client.data._firstNameUser);
            setApellido(result_client.data._lastNameUser);
            setTelefono(result_client.data._phoneNumberUser);
            setDireccion(result_client.data._addressUser);
            setDocumento(result_client.data._numberDocument);
            setEmail(result_client.data._emailUser);
            setEspecializacion(result_client.data._especialidad);
            setExperiencia(result_client.data._experiencia);
            setTipoEmpleado(result_client.data._ocupacion);
            setEstado(result_client.data._stateTrabajador);

          } catch (error) {
            console.error("Error fetching data:", error);

          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures useEffect runs once on mount
    

    return(
        <>

        <section style={{backgroundColor: "#eee"}} className="pb-5">
            <Header />
            {/* <!-- Navbar --> */}
            <div className="container d-flex py-5">
            {/* <!-- Navbar --> */}
                
                <div>
                    {/* sidebar profile*/}
                    <SideBar content = {setContentAccount} ocupacion = {tipoEmpleado} estado = {estado} nombre = {nombre + " " + apellido}/>
                    {/* sidebar profile*/}
                </div>
                <div className='w-100 ms-4'>
                    {/* Account Information*/}
                    <h2 className="text-center">Información personal</h2>
                    <div className="">
                        <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Nombre Completo</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{nombre + " " + apellido}</p>
                            </div>
                            </div>
                            <hr />
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Correo Electronico</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{email}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Celular</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">(57) {telefono}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Direccion</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{direccion}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Documento</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{documento}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Especialización</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{especializacion}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Experiencia</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{experiencia}</p>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Estado</p>
                            </div>
                            <div className="col-sm-2 btn btn-success">
                                <p className="text-muted mb-0">{estado}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                            <div className="card-body">
                                <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> En Curso
                                </p>
                                <p className="mb-1" style={{fontSize: .77+"rem"}}>Limpieza de Instalaciones</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 80+"%"}} aria-valuenow="80"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Mantenimiento Preventivo</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 72+"%"}} aria-valuenow="72"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Adecuacion Zonas Verdes</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 89+"%"}} aria-valuenow="89"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                            <div className="card-body">
                                <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> Historial
                                </p>
                                <p className="mb-1" style={{fontSize: .77+"rem"}}>Satisfaccion del Cliente</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 80+"%"}} aria-valuenow="80"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Ordenes Ultimo Mes</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 72+"%"}} aria-valuenow="72"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Puntuación Usuario</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 89+"%"}} aria-valuenow="89"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </section>
        </>
    );

}