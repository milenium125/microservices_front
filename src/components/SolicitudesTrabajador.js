import {Link, Routes, BrowserRouter} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './header';
import NuevaSolicitud from './NuevaSolicitud';
import { DetalleSolicitud } from './Solicitud';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

  var estado_success = 'none';

  let cookies = document.cookie;
  var id_login = 0;
  var value = "";
  var key = "";
  console.log(`Todas las cookies: ${cookies}`);
  for (let i = 0; i < cookies.length ; i++) {   
      console.log(cookies[i]); 
      
      if(cookies[i] === "="){
          while(cookies[i] !== ";" && i < cookies.length){
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
  key = "";
  value = "";
  
  for (let i = 0; i < cookies.length ; i++) {   
      console.log(cookies[i]); 
      
      if(cookies[i] === "="){
          while(cookies[i] !== ";" && i < cookies.length){
              console.log(`key success / value : ${key} / ${value}`); 
              if(cookies[i] === "="){
                  i++;
                  continue;
              }
              value = value + cookies[i];
  
              i++;
          }
          if(key === " estado_success"){
              estado_success = parseInt(value);
              console.log(`key success 2/ value ok : ${key} / ${value}`); 
              i++;
              break;
          }else{
              estado_success = 0;
              key = "";
              value = "";
          }
          
      }else{
          key = key + cookies[i];
      } 
  
  }
export function SolicitudesTrabajador(){
    const [contentAccount, setContentAccount] = useState(NuevaSolicitud);
    const [estadoSuccess, setEstadoSuccess] = useState("none");
    const [fillActive, setFillActive] = useState('tab1');
    const [state, setState] = useState();
    var [centredModal, setCentredModal] = useState(false);

    const [solicitudes, setSolicitudes] = useState([]); //Aqui se guardaran las solicitudes del trabajador en un Array
    

    const [servicio, setServicio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [fotoCliente, setFotoCliente] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [profesionEmpleado, setProfesionEmpleado] = useState("");
    const [idSolicitud, setIdSolicitud] = useState("");
    const [tab, setTab] = useState(1);
    const [descripcionSolicitud, setDescripcionSolicitud] = useState("");
    function toggleShow() {setCentredModal(!centredModal);};function toggleShow() {setCentredModal(!centredModal);};
    
    useEffect(() => {
        const fetchData = async () => {
          try {

            handleFillClick('tab1');
            mostrarServicios(1);
  
          } catch (error) {
            console.error("Error fetching data:", error);

          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures useEffect runs once on mount

    

    const handleFillClick = (value) => {
        if (value === fillActive) {
        return;
        }

        setFillActive(value);
    };

    function contentTab(tab){
        if(tab === fillActive){
            return true;
        }else{
            return false;
        }
    }

 
    async function mostrarServicios(estado){
        let arrayServicios = [];

        let result = await axios.post("http://localhost:3200/api/request/find/trabajador",{"id_trabajador": id_login,"estado": estado} ,{
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          for (let i = 0; i < result.data.length && typeof(result.data) != "string"; i++) {
            
            let result_json = JSON.parse(result.data[i]);
            console.log(result_json);
            console.log("--------------------------------------");
            let result_cliente = await axios.get(`http://localhost:3200/api/client/find/${result_json.cliente}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'origin':'x-requested-with',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
                }});
            console.log("empleado");
            console.log(result_cliente.data);
            console.log("datos"+ parseInt(result_json.empleado));
            // console.log(result_json);
            const estadoString = () => {
                if(result_json.estado == 1){
                    return "Activo";
                }if(result_json.estado == 2){
                    return "Completado";
                }if(result_json.estado == 3){
                    return "Cancelado";
                }if(result_json.estado == 4){
                    return "Por Verificar";
                }
            }
            let fecha = new Date(result_json.fecha_inicio);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let año = fecha.getFullYear();
            let fecha_formato = "";

            if(mes < 10 & dia < 10){
                fecha_formato = `0${dia}-0${mes}-${año}`;
            }if(mes < 10 & dia >= 10){
                fecha_formato = `${dia}-0${mes}-${año}`;
                console.log(`fecha: ${dia} ${mes} ${año}`);
            }if(mes >= 10 & dia >= 10){
                fecha_formato = `${dia}-${mes}-${año}`;
            }if(mes >= 10 & dia < 10){
                fecha_formato = `0${dia}-${mes}-${año}`;
            }
            console.log(fecha_formato);
            console.log(result_cliente.data._firstNameUser + " " + result_cliente.data._lastNameUser);
            console.log(estadoString());
            console.log(result_json.total_solicitud);
            
            let solicitud = {
                "fecha": fecha_formato,
                "cliente": result_cliente.data._firstNameUser + " " + result_cliente.data._lastNameUser,
                "estado": estadoString(),
                "costo": result_json.total_solicitud,
                "id_solicitud": result_json.id_solicitud
            }
            arrayServicios.push(solicitud);
            
          }
        setSolicitudes(arrayServicios);
        console.log(solicitudes);
    }

    const cargarSolicitud = async (idSolicitud) =>{
        let result = await axios.get(`http://localhost:3200/api/request/find/${(idSolicitud)}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin':'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
        }});
        // console.log(result.data);
        let result_solicitud = await axios.get(`http://localhost:3200/api/service-solicitud/find/solicitud/${(result.data._idRequest)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin':'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
            }});
        //console.log(result_solicitud.data);
        let result_servicio = await axios.get(`http://localhost:3200/api/service/find/${(result_solicitud.data._idServicio)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin':'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
            }});
        //console.log(result_servicio.data);
        let result_cliente = await axios.get(`http://localhost:3200/api/client/find/${(result.data._client)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin':'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
            }});
        console.log(result_cliente.data);

        setServicio(result_servicio.data.servicio);
        setCategoria(result_servicio.data.categoria);
        setDescripcion(result_servicio.data.descripcion);
        setPrecio(result_servicio.data.precio);
        setDescripcionSolicitud(result.data._description);
        setFotoCliente("https://mdbcdn.b-cdn.net/img/new/avatars/8.webp");
        setNombreCliente(result_cliente.data._firstNameUser + " " + result_cliente.data._lastNameUser);
        setIdSolicitud(result.data._idRequest);
    }

    const cambiarEstado = async (id, tab) => {
        var parametros = {};
        console.log("id + tab");
        console.log(id + " + " + tab);
        if(tab === 1){
            parametros = {
            "id_solicitud": id,
            "estado": 3
        }
        }
        if(tab === 4){
            parametros = {
            "id_solicitud": id,
            "estado": 1
        }
        
        }
        console.log("parametros");
        console.log(parametros);
        var actualizar_estado = await axios.post("http://localhost:3200/api/request/find/estado",parametros,{
            headers: {
                'Content-Type': 'application/json'
            }
            });
        if(actualizar_estado.status === 200){
                window.location.replace("http://localhost:3000/solicitudes-trabajador");
            }
            
    }

    const finalizarSolicitud = async (id) => {
        var parametros = {
            "id_solicitud": id,
            "estado": 2
        };
        console.log("id ");
        console.log(id );
        
        var actualizar_estado = await axios.post("http://localhost:3200/api/request/find/estado",parametros,{
            headers: {
                'Content-Type': 'application/json'
            }
            });
        if(actualizar_estado.status === 200){
                window.location.replace("http://localhost:3000/solicitudes-trabajador");
            }
            
    }

    return(
        <>
            <section style={{backgroundColor: "#eee", height: "100vh"}} className="pb-5 w-100">
            <Header />
            {/* <!-- Navbar --> */}
            <div className="container d-flex py-5">
            {/* <!-- Navbar --> */}
            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            {/* Componente DetalleSolicitud se encuentra en el archivo Solicitud.js */}
                            <DetalleSolicitud servicio={servicio} categoria={categoria} descripcion={descripcion} precio={precio} profesionEmpleado={"Cliente"} nombreEmpleado={nombreCliente} foto={fotoCliente} toggleShow={toggleShow} idSolicitud={idSolicitud} cancelar={cambiarEstado} tab={tab} usuario={2} finalizar={finalizarSolicitud}/>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                <div>
                    {/* sidebar profile*/}
                    {sideBarSolicitud()}
                    {/* sidebar profile*/}
                </div>
                <div className='w-100 ms-4'>
                    {/* Account Information*/}
                    <MDBTabs fill className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => {handleFillClick('tab4'); mostrarServicios(4); setTab(4)}} active={fillActive === 'tab4'}>
                            Por Aceptar
                        </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => {handleFillClick('tab1'); mostrarServicios(1); setTab(1)}} active={fillActive === 'tab1'}>
                            Activas
                        </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => {handleFillClick('tab2'); mostrarServicios(2); setTab(2)}} active={fillActive === 'tab2'}>
                            Completadas
                        </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => {handleFillClick('tab3'); mostrarServicios(3); setTab(3)}} active={fillActive === 'tab3'}>
                            Canceladas
                        </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>
                    <MDBTabsPane show={contentTab('tab4')} >
                            <MDBTable align='middle'>
                                    <MDBTableHead>
                                        <tr>
                                        <th scope='col'>Servicio</th>
                                        <th scope='col'>Tecnic@</th>
                                        <th scope='col'>Estado</th>
                                        <th scope='col'>Costo</th>
                                        <th scope='col'>Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id='tab4'>
                                    {solicitudes.map(solicitud =>(
                                            <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{solicitud.fecha}</p>
                                                </div>
                                                </div>
                                           </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{solicitud.cliente}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <MDBBadge color='success'>
                                                {solicitud.estado}
                                                </MDBBadge>
                                            </td>
                                            <td>${solicitud.costo}</td>
                                            <td>
                                                <a href="#" onClick={() =>{toggleShow(); cargarSolicitud(solicitud.id_solicitud)}}>
                                                Ver detalles
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable> 
                        </MDBTabsPane>
                        <MDBTabsPane show={contentTab("tab1")} >
                            <div class="alert alert-success" role="alert" style={{display:estadoSuccess}}>
                            Realizaste la solicitud correctamente, realiza el pago para continuar.
                            </div>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Fecha creacion</th>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Costo</th>
                                    <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody id='tab1'>
                                    {solicitudes.map(solicitud =>(
                                            <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{solicitud.fecha}</p>
                                                </div>
                                                </div>
                                           </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{solicitud.cliente}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <MDBBadge color='success'>
                                                {solicitud.estado}
                                                </MDBBadge>
                                            </td>
                                            <td>{solicitud.costo}</td>
                                            <td>
                                                <a href="#" onClick={() =>{toggleShow(); cargarSolicitud(solicitud.id_solicitud)}}>
                                                Ver detalles
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                </MDBTableBody>
                            </MDBTable> 
                        </MDBTabsPane>
                        <MDBTabsPane show={contentTab('tab2')} >
                            <MDBTable align='middle'>
                                    <MDBTableHead>
                                        <tr>
                                        <th scope='col'>Servicio</th>
                                        <th scope='col'>Cliente</th>
                                        <th scope='col'>Estado</th>
                                        <th scope='col'>Costo</th>
                                        <th scope='col'>Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id='tab2'>
                                        {solicitudes.map(solicitud =>(
                                            <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{solicitud.fecha}</p>
                                                </div>
                                                </div>
                                           </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{solicitud.cliente}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <MDBBadge color='success'>
                                                {solicitud.estado}
                                                </MDBBadge>
                                            </td>
                                            <td>{solicitud.costo}</td>
                                            <td>
                                                <a href="#" onClick={() =>{toggleShow(); cargarSolicitud(solicitud.id_solicitud)}}>
                                                Ver detalles
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable> 
                        </MDBTabsPane>
                        <MDBTabsPane show={contentTab('tab3')} >
                        <MDBTable align='middle'>
                                    <MDBTableHead>
                                        <tr>
                                        <th scope='col'>Servicio</th>
                                        <th scope='col'>Cliente</th>
                                        <th scope='col'>Estado</th>
                                        <th scope='col'>Costo</th>
                                        <th scope='col'>Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id='tab3'>
                                        {solicitudes.map(solicitud =>(
                                            <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{solicitud.fecha}</p>
                                                </div>
                                                </div>
                                           </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{solicitud.cliente}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <MDBBadge color='success'>
                                                {solicitud.estado}
                                                </MDBBadge>
                                            </td>
                                            <td>{solicitud.costo}</td>
                                            <td>
                                                <a href="#" onClick={() =>{toggleShow(); cargarSolicitud(solicitud.id_solicitud)}}>
                                                Ver detalles
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable> 
                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
                
                {/* <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                        <MDBModalTitle>Modal title</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>...</MDBModalBody>

                        <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen}>
                            Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal> */}
                
            </div>
        </section>
        </>
    );

    function sideBarSolicitud(){
        return(
            <div>

                <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i class="fas fa-user-tie"></i>
                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Mis Solicitudes</a>
                    </li>
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i class="fas fa-list-check"></i>
                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Historial Solicitudes</a>
                    </li>
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                    <i class="bi bi-plus-square-fill"></i>
                        <Link to="/findServices" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Calificar Servicio</Link>
                    </li>
                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                        <i class="fa-solid fa-circle-question"></i>
                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Centro de ayuda</a>
                    </li>
                    </ul>
                </div>
                </div>
        </div>
        );
    }
}