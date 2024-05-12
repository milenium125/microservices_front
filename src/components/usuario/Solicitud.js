import {Link, Routes, BrowserRouter} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Header from '../Header';
import NuevaSolicitud from './NuevaSolicitud';
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
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  } from 'mdb-react-ui-kit';
import { stringify } from 'circular-json';

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

export const DetalleSolicitud = (props) =>{
    
    const Botones = () =>{
        if(props.tab === 1){
        return(<MDBBtn color='secondary' onClick={()=>{props.toggleShow(); confirmAlert({
            title: 'Aceptar para continuar',
            message: 'Click en Aceptar si desea cancelar el pedido, de otra forma oprima en cancelar para salir',
            buttons: [
              {
                label: 'Aceptar',
                onClick: () => {props.cancelar(props.idSolicitud, props.tab)}
              },
              {
                label: 'Cancelar',
                onClick: () => props.toggleShow()
              }
            ]
          });}}>
              Cancelar Solicitud
          </MDBBtn>)}

        if(props.tab === 2){
            return(<></>)}
        if(props.tab === 3){
            return(<></>)}
        if(props.tab === 4){
            //en el props.usuario se determina el tiousuario para mostrar botones diferentes 1 para cliente y para trabajador
            if(props.usuario === 1){
                return(<MDBBtn color='secondary' onClick={()=>{props.toggleShow(); confirmAlert({
                    title: 'Aceptar para continuar',
                    message: 'Click en Aceptar si desea cancelar el pedido, de otra forma oprima en cancelar para salir',
                    buttons: [
                      {
                        label: 'Aceptar',
                        onClick: () => {props.cancelar(props.idSolicitud, props.tab)}
                      },
                      {
                        label: 'Cancelar',
                        onClick: () => props.toggleShow()
                      }
                    ]
                  });}}>
                      Cancelar Solicitud
                  </MDBBtn>)
            }
            if(props.usuario === 2){
                return(<MDBBtn color='secondary' onClick={()=>{props.toggleShow(); props.cancelar(props.idSolicitud, props.tab)}}>
                  Confirmar
              </MDBBtn>)
            }
            
              }
        
    }

    const BtnFinalizar = (props2) =>{
        console.log(props2.cliente);
        if(props2.cliente === 2 && props.tab === 1){
        return(<MDBBtn color='secondary' onClick={()=>{props.toggleShow(); confirmAlert({
            title: 'Aceptar para continuar',
            message: '¿Desea Finalizar la solicitud? Aceptar para continuar, de lo contrario click en cancelar',
            buttons: [
            {
                label: 'Aceptar',
                onClick: () => {props.finalizar(props.idSolicitud)}
            },
            {
                label: 'Cancelar',
                onClick: () => props.toggleShow()
            }
            ]
        });}}>
            Completar Solicitud
        </MDBBtn>)
        }
    }
    return(
        <>
        <MDBModalHeader>          
            <MDBModalTitle>{props.categoria}</MDBModalTitle>          
            <MDBBtn className='btn-close' color='none' onClick={props.toggleShow}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Detalle del Servicio</MDBCardTitle>
                        <MDBCardText>
                            <MDBCardText>{props.servicio}</MDBCardText>
                            <MDBCardImage position='top' alt='...' src='https://cenacap.edu.co/wp-content/uploads/2021/12/electricidad-residencial.jpg' />  
                            <p className="p-3">
                            {props.descripcion}
                            </p>
                            <MDBCardText className="text-end me-3">{props.precio}</MDBCardText>
                        </MDBCardText>
                        <hr />
                        <MDBCardText>Tecnicó Seleccionado</MDBCardText>
                        <MDBModalHeader>
                </MDBModalHeader>
                    
                    <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Area u ocupación</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                            <img
                                src={props.foto}
                                alt=''
                                style={{ width: '45px', height: '45px' }}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{props.nombreEmpleado}{props.nombreCliente}</p>
                                <p className='text-muted mb-0'>puntuacion</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{props.profesionEmpleado}</p>
                        </td>
                        </tr>
                        
                    </MDBTableBody>
                    </MDBTable>
                        <BtnFinalizar cliente={props.usuario} />
                    <MDBCardText>
                        {props.descripcionSolicitud}
                    </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
        </MDBModalBody>
        <MDBModalFooter>
            <Botones/>
            <MDBBtn onClick={()=>{props.toggleShow()}}>Cerrar</MDBBtn>
        </MDBModalFooter>
        </>
    );
}



export function Solicitud(){
    const [contentAccount, setContentAccount] = useState(NuevaSolicitud);
    const [estadoSuccess, setEstadoSuccess] = useState("none");
    const [fillActive, setFillActive] = useState('tab1');
    const [solicitudes, setSolicitudes] = useState([]); //Aqui se guardaran las solicitudes del trabajador en un Array
    var [centredModal, setCentredModal] = useState(false);

    const [servicio, setServicio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [fotoEmpleado, setFotoEmpleado] = useState("");
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [profesionEmpleado, setProfesionEmpleado] = useState("");
    const [idSolicitud, setIdSolicitud] = useState("");
    const [tab, setTab] = useState(1);
    const [descripcionSolicitud, setDescripcionSolicitud] = useState("");


    function toggleShow() {setCentredModal(!centredModal);};

    const cargarSolicitud = async (idSolicitud) =>{
        let result = await axios.get(`http://localhost:3200/api/request/find/${(idSolicitud)}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin':'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
        }});
        console.log("result.data");

        console.log(result.data);
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
        //     console.log("result_servicio.data");
        // console.log(result_servicio.data);
        let result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/${(result.data._employee)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin':'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin'
            }});
        console.log(result_trabajador.data);

        setServicio(result_servicio.data.servicio);
        setCategoria(result_servicio.data.categoria);
        setDescripcion(result_servicio.data.descripcion);
        setPrecio(result_servicio.data.precio);
        setDescripcionSolicitud(result.data._description);
        setFotoEmpleado("https://mdbcdn.b-cdn.net/img/new/avatars/8.webp");
        setNombreEmpleado(result_trabajador.data._firstNameUser + " " + result_trabajador.data._lastNameUser);
        setProfesionEmpleado(result_trabajador.data._ocupacion);
        setIdSolicitud(result.data._idRequest);


    }

    const cambiarEstado = async (id, tab) => {
        var estado = 0;
        console.log("id, tab: "+id+", "+tab);
        switch (tab) {
            case 1:
                estado = 3;
                break;
            case 2:
                estado = 1;
                break;
            case 4:
                console.log("ENTRE");
                estado = 3;
                break;
            default:
                break;
        }
        
        console.log("parametros");
        console.log(estado);
        var actualizar_estado = await axios.post("http://localhost:3200/api/request/find/estado",{"id_solicitud": id, "estado": estado},{
            headers: {
                'Content-Type': 'application/json'
            }
            });
        
            if(actualizar_estado.status === 200 ){
                window.location.replace("http://localhost:3000/solicitud");
            }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {

            handleFillClick('tab1');
            mostrarServicios(1);
            if(estado_success === 1){
                setEstadoSuccess('block');
                console.log("block")
            }else{
                setEstadoSuccess('none');
            }
            setTimeout(() => {
                setEstadoSuccess('none');
                
                
            }, 2000);
  
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
        let result = await axios.post("http://localhost:3200/api/request/find/trabajador",{"id_cliente": id_login,"estado": estado} ,{
            headers: {
              'Content-Type': 'application/json'
            }
          });
        for (let i = 0; i < result.data.length && typeof(result.data) != "string"; i++) {
            
            let result_json = JSON.parse(result.data[i]);
            console.log(result_json);
            console.log("--------------------------------------");
            let result_empleado = await axios.get(`http://localhost:3200/api/trabajador/find/${result_json.empleado}`);
            console.log("empleado");
            console.log(result_empleado.data);
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
            console.log(result_json.fecha_inicio);
            console.log(result_empleado.data._firstNameUser + " " + result_empleado.data._lastNameUser);
            console.log(estadoString());
            console.log(result_json.total_solicitud);
            
            let solicitud = {
                "fecha": fecha_formato,
                "trabajador": result_empleado.data._firstNameUser + " " + result_empleado.data._lastNameUser,
                "estado": estadoString(),
                "costo": result_json.total_solicitud,
                "id_solicitud": result_json.id_solicitud
            }
            arrayServicios.push(solicitud);
            
          }
        setSolicitudes(arrayServicios);
        console.log(solicitudes);
    }

    
    return(
        <>

        <section style={{backgroundColor: "#eee", height: "100vh"}} className="pb-5">
            <Header />
            {/* <!-- Navbar --> */}
            <div className="container d-flex py-5">
            {/* <!-- Navbar --> */}
                <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <DetalleSolicitud servicio={servicio} categoria={categoria} descripcion={descripcion} precio={precio} profesionEmpleado={profesionEmpleado} nombreEmpleado={nombreEmpleado} foto={fotoEmpleado} toggleShow={toggleShow} idSolicitud={idSolicitud} cancelar={cambiarEstado} tab={tab} usuario={1}/>
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
                                                <p className='fw-normal mb-1'>{solicitud.trabajador}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <span class="btn btn-lg btn-success">
                                                {solicitud.estado}
                                                </span>
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
                                    <th scope='col'>Tecnic@</th>
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
                                                <p className='fw-normal mb-1'>{solicitud.trabajador}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <span class="btn btn-lg btn-success">
                                                {solicitud.estado}
                                                </span>
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
                        <MDBTabsPane show={contentTab('tab2')} >
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
                                                <p className='fw-normal mb-1'>{solicitud.trabajador}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <span class="btn btn-lg btn-success">
                                                {solicitud.estado}
                                                </span>
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
                        <MDBTabsPane show={contentTab('tab3')} >
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
                                                <p className='fw-normal mb-1'>{solicitud.trabajador}</p>
                                                <p className='text-muted mb-0'></p>
                                            </td>
                                            <td>
                                                <span class="btn btn-lg btn-success">
                                                {solicitud.estado}
                                                </span>
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
                    </MDBTabsContent>
                </div>
                
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
                        <i class="fa-solid fa-circle-question"></i>
                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Carrito de Compras</a>
                    </li>
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

