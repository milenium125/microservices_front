import {Link, Routes, BrowserRouter} from 'react-router-dom';
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import Header from '../Header';
import MediosPago from '../MediosPago';

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

export function SideBar(props){
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
                                <img  src={props.foto} class="rounded-circle mb-3" style={{width: 150+"px"}} alt="Avatar" />
                                <h5 class="mb-2"><strong>{props.nombre}</strong></h5>
                                <p class="text-muted">{props.categoria}<span class="badge bg-primary">{props.tipo}</span></p>
                                    <p className="text-muted mb-4">Bucaramanga, Santander</p>
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
                                        <Link to="/profile" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Informacion de la cuenta</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fas fa-list-check"></i>
                                        <Link to="/solicitud" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Historial Servicios</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i class="bi bi-plus-square-fill"></i>
                                        <Link to="/findServices" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Solicitar servicio</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fa-solid fa-circle-question"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Centro de ayuda</a>
                                    </li>
                                                
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i class="fas fa-credit-card"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => props.content(MediosPago)}>Medios de pago</a>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                        </div>
                </>
            )
}

export function Profile() {
    const [contentAccount, setContentAccount] = useState("");
    const [foto_perfil, setFotoPerfil] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [documento, setDocumento] = useState("");
    const [estado, setEstado] = useState("");
    const [email, setEmail] = useState("");
    const [tipo_cliente, setTipoCliente] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [categoria_cliente, setCategoriaCliente] = useState("");
    const [loading, setLoading] = useState(true);
  
    const updateSelectedContent = (newContent) => { 
        try {
            // Espera a que la Promise se resuelva
            // Actualiza el contenido seleccionado
            setContentAccount(newContent);  
          } catch (error) {
            console.error("Error updating selected content:", error);
          }
      };

      

    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const result_client = await axios.get(`http://localhost:3200/api/client/find/user/${id_login}`);
          const result = await axios.get(`http://localhost:3200/api/client/find/${result_client.data._idClient}`);
  
          setFotoPerfil(result.data._pictureProfile);
          setTipoCliente(result.data._rolClient);
          setNombre(result.data._firstNameUser);
          setApellido(result.data._lastNameUser);
          setEmail(result.data._emailUser);
          setDireccion(result.data._addressUser);
          setDocumento(result.data._numberDocument);
          setTelefono(result.data._phoneNumberUser);
          setEstado(result.data._stateClient);
  
          if (result.data._rolClient === "Premium") {
            setCategoriaCliente("Pymes");
          } else if (result.data._rolClient === "Standard") {
            setCategoriaCliente("Hogar");
          }
  
          setLoading(false);

        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures useEffect runs once on mount
  
    if (loading) {
      // Puedes renderizar un indicador de carga mientras los datos se están cargando
      return <div>Loading...</div>;
    }
  
    return (
      <>
        <section style={{ backgroundColor: "#eee" }} className="pb-5">
          <Header />
          {/* <!-- Navbar --> */}
          <div className="container d-flex py-5">
            {/* <!-- Navbar --> */}
            <div>
              {/* sidebar profile*/}
              <SideBar
                foto={foto_perfil}
                tipo={tipo_cliente}
                nombre={nombre + " " + apellido}
                categoria={categoria_cliente}
              />
              {/* sidebar profile*/}
            </div>
            <div id="contenido" className='w-100 ms-4'>
              {/* Account Information*/}
              <h2 className="text-center">Información personal</h2>
              <div className="">
                <div className="card mb-4">
                  <div className="card-body">
                    <hr />
                    <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Nombre</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{nombre + " "+ apellido}</p>
                    </div>
                  </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Documento</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{documento}</p>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Telefono</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{telefono}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Direccion</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{direccion}</p>
                    </div>
                  </div>
                    <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Nivel Cuenta</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{tipo_cliente}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Estado</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{estado}</p>
                    </div>
                  </div>
                  
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">Ordenes</span> En Curso
                        </p>
                        <MDBProgress>
                          <MDBProgressBar label="Limpieza de Instalaciones" value={80} />
                        </MDBProgress>
                        <MDBProgress>
                          <MDBProgressBar label="Mantenimiento Preventivo" value={72} />
                        </MDBProgress>
                        <MDBProgress>
                          <MDBProgressBar label="Adecuacion Zonas Verdes" value={89} />
                        </MDBProgress>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">Ordenes</span> Historial
                        </p>
                        <MDBProgress>
                          <MDBProgressBar label="Satisfaccion del Cliente" value={80} />
                        </MDBProgress>
                        <MDBProgress>
                          <MDBProgressBar label="Ordenes Ultimo Mes" value={72} />
                        </MDBProgress>
                        <MDBProgress>
                          <MDBProgressBar label="Puntuación Usuario" value={89} />
                        </MDBProgress>
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
 