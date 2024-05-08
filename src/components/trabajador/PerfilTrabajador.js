import Header from "../Header";
import {AccountInformationTrabajador} from "../usuario/AccountInformation";
import React, { useState , useEffect} from 'react';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from "react-router-dom";
import Empleos from "./Empleos";
import { SolicitudesTrabajador } from "./SolicitudesTrabajador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClipboard } from '@fortawesome/free-solid-svg-icons';



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
    
    var colorBtn = '';
    console.log(props.estado);
    if(props.estado == "Activo"){
        console.log("1");
        colorBtn = 'bg-success';
    }if(props.estado == "Por verificar"){
        console.log("2");
        colorBtn = 'bg-warning';
    }if(props.estado == "Cancelado"){
        console.log("3");
        colorBtn = 'bg-danger';
    }
    console.log(colorBtn);
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
                     {/* sidebar profile {props.img}*/}
                     <div>
                                <div className="card mb-4">
                                <div className="card-body text-center">
                                <img src={`http://localhost:3200/api/img/${props.img}`} className="rounded-circle mb-3" style={{width: 150+"px"}} alt="Avatar" />
                                <h5 className="mb-2"><strong>{props.nombre}</strong></h5>
                                <p className="text-muted">Trabajador <span className={`badge ${colorBtn}`}>{props.estado}</span></p>
                                    <p className="text-muted mb-4">{props.ocupacion}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">Editar</button>
                                    </div>
                                </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-user-tie"></i>
                                        <Link to="/perfil-trabajador" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Informacion de la cuenta</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-list-check"></i>
                                        <Link to="/solicitudes-trabajador" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Solicitudes</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="bi bi-plus-square-fill"></i>
                                        <Link to="/servicios" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Mis servicios</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fa-solid fa-circle-question"></i>
                                        <Link className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} to="/centro-ayuda">Centro de ayuda</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Empleos</a>
                                    </li>            
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-credit-card"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Mis ganancias</a>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                        </div>
                </>
            )
}
export async function getSidebarInformation(){

    try {   
      // const result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/persona/${id_login}`);
      const result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/persona/${id_login}`);
      const result_persona = await axios.get(`http://localhost:3200/api/trabajador/find/${result_trabajador.data._idTrabajador}`);

      console.log(result_persona.data);
      
      return({
            "nombre":result_persona.data._firstNameUser,
            "apellido":result_persona.data._lastNameUser,
            "telefono": result_persona.data._phoneNumberUser,
            "direccion": result_persona.data._addressUser,
            "documento": result_persona.data._numberDocument,
            "email": result_persona.data._emailUser,
            "especializacion": result_persona.data._especialidad,
            "experiencia": result_persona.data._experiencia,
            "ocupacion": result_persona.data._ocupacion,
            "estado":result_persona.data._stateTrabajador,
            "img": result_persona.data._pictureProfile
         })

    } catch (error) {
      console.error("Error fetching data:", error);

    }
}
export function PerfilTrabajador(){

    const [contentAccount, setContentAccount] = useState(AccountInformationTrabajador);
    const [trabajador, setTrabajador] = useState({});

    
    useEffect(() => {
        const fetchData = async () => {
            let datosTrabajador = await getSidebarInformation();
            let objTrabajador = {
                "nombre": datosTrabajador.nombre,
                "apellido": datosTrabajador.apellido,
                "telefono": datosTrabajador.telefono,
                "direccion": datosTrabajador.direccion,
                "documento": datosTrabajador.documento,
                "email": datosTrabajador.email,
                "especializacion": datosTrabajador.especializacion,
                "experiencia": datosTrabajador.experiencia,
                "estado": datosTrabajador.estado,
                "tipoEmpleado": datosTrabajador.ocupacion,
                "imgEmpleado": datosTrabajador.img
            }
            setTrabajador(objTrabajador);
        }
        fetchData();
      }, []); // Empty dependency array ensures useEffect runs once on mount
    

    return(
        <>

        <section style={{backgroundColor: "#eee"}} className=" px-4">
            <Header user={2}/>
            {/* <!-- Navbar --> */}
            <div className="container-fluid d-flex py-3 px-0">
            {/* <!-- Navbar --> */}
                
                <div className="px-1">
                    {/* sidebar profile*/}
                    <SideBar ocupacion = {trabajador.tipoEmpleado} estado = {trabajador.estado} nombre = {trabajador.nombre + " " + trabajador.apellido} img={trabajador.imgEmpleado}/>
                    {/* sidebar profile*/}
                </div>
                <div className='w-100 ms-4 px-5'>
                    {/* Account Information*/}
                    <h2 className="text-center">Información personal</h2>
                    <div className="">
                        <div className="d-flex">
                            <div className="card mb-4 col-sm-6 pb-4 pe-5 me-5">
                                <div className="card-body pb-5">
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Nombre Completo</p>
                                    </div>
                                    <div className="col-sm-9 p-0 m-0">
                                        <p className="text-muted mb-0">{trabajador.nombre + " " + trabajador.apellido}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Correo Electronico</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.email}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Celular</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.telefono}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Direccion</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.direccion}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Documento</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.documento}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Especialización</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.especializacion}</p>
                                    </div>
                                    </div>

                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Experiencia</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.experiencia}</p>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            <div className="card mb-4 col-sm-5 pb-4 ">
                                <div className="card-body pb-5">
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Nombre Completo</p>
                                    </div>
                                    <div className="col-sm-9 p-0 m-0">
                                        <p className="text-muted mb-0">{trabajador.nombre + " " + trabajador.apellido}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Correo Electronico</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.email}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Celular</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.telefono}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Direccion</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.direccion}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Documento</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.documento}</p>
                                    </div>
                                    </div>
                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Especialización</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.especializacion}</p>
                                    </div>
                                    </div>

                                    <div className="row py-2 border-bottom">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Experiencia</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{trabajador.experiencia}</p>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6 pb-4">
                            <div className="card mb-4 mb-md-0 h-100">
                            <div className="card-body">
                                <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> En Curso
                                </p>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Adecuacion Zonas Verdes</p>
                                <div className="progress rounded" style={{height: 5+"px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: 89+"%"}} aria-valuenow="89"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div>
                                    <span>No hay ordenes disponibles</span>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6 pb-4">
                            <div className="card mb-4 mb-md-0 h-100">
                            <div className="card-body">
                                <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> 
                                Historial
                                </p>
                                <p className="mb-1" style={{fontSize: .77+"rem"}}>Satisfaccion del Cliente</p>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x"/>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x"/>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <div className="d-inline-block">
                                        <small>5 puntos</small><br/>
                                        <small>9 Reseñas</small>
                                    </div>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Ordenes Ultimo Mes</p>
                                    <FontAwesomeIcon className="mx-1" icon={faClipboard} color="blue" size="2x"/>
                                    <small>10 pedidos</small>
                                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Puntuación Usuario</p>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x"/>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x"/>
                                    <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="2x" />
                                    <div className="d-inline-block">
                                        <small>5 puntos</small><br/>
                                        <small>40 Reseñas</small>
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
