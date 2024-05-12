import Header from "../Header"
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTextArea
} from 'mdb-react-ui-kit';

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

export default function FindServices(){
    const [centredModal, setCentredModal] = useState(false);
    const [servicios, setServicios] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [nombre, setNombre] = useState("");
    const [detalles, setDetalles] = useState("");
    const [precio, setPrecio] = useState("");
    const [idServicio, setIdServicio] = useState(0);
    const [categoria, setCategoria] = useState(0);
    const [estado, setEstado] = useState("");

    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [fotoEmpleado, setFotoEmpleado] = useState("");
    const [profesionEmpleado, setProfesionEmpleado] = useState("");
    const [idPersonaEmpleado, setIdPersonaEmpleado] = useState("");

    var result_client = [];

    var [classModalServicio, setClassModalServicio] = useState("d-block");
    var [classModalTrabajadores, setModalTrabajadores] = useState("d-none");
    var [classModalFinalizarSolicitud, setModalFinalizarSolicitud] = useState("d-none");

    useEffect( () => { 
        const fetchData = async () => {
          try {  
            var result_client = await consultarServicios();
            console.log(result_client);
            var servicios = [];
            var result_client_json;
            for (let i = 0; i < result_client.data.length; i++) {
                result_client_json = JSON.parse(result_client.data[i]);
                console.log("Datos servicio");
                console.log(result_client_json);
                if (result_client_json.estado === 1) {
                    servicios.push({
                        id: result_client_json.id_servicio,
                        content: card_servicio(
                            result_client_json.servicio,
                            result_client_json.descripcion,
                            result_client_json.precio,
                            toggleShow,
                            result_client_json.id_servicio
                        )
                    });
                }
            }
            setServicios(servicios);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures useEffect runs once on mount
    
    
    var toggleShow = () => {
        setCentredModal(!centredModal);
        console.log("funciona"+centredModal);
        setClassModalServicio("d-block");
        setModalTrabajadores("d-none");
        setModalFinalizarSolicitud("d-none");
        //console.log(result_client.data[id_servicio]);  
    };

    var changeModal = (accion) => {
        
        if(accion == 1){
            setClassModalServicio("d-block");
            setModalTrabajadores("d-none");
            setModalFinalizarSolicitud("d-none");
        }if(accion==2){
            setClassModalServicio("d-none");
            setModalTrabajadores("d-block");
            setModalFinalizarSolicitud("d-none");
        }if(accion==3){
            setClassModalServicio("d-none");
            setModalTrabajadores("d-none");
            setModalFinalizarSolicitud("d-block");
        }
    };

    //Funcion para mostrar los empleados que prestan el servicio seleccionado por el cliente
    const getEmpleadosByService = async (id) =>{
        let result_employees = await axios.get(`http://localhost:3200/api/service/trabajador/${(id)}`);
        console.log("result_employees.data");
        let employeesData = [];
        var result_employee_json;
        console.log("dato: "+result_employees.data);
        for (let i = 0; i < result_employees.data.length; i++) {
            let result_employees_data = await axios.get(`http://localhost:3200/api/trabajador/find/${result_employees.data[i]}`);
            result_employee_json = result_employees_data.data;
            console.log(result_employee_json);
            var profesion;
            if(result_employee_json.id_rol === 1){
                profesion = "Trabajador";
            }
            if(true) {
                employeesData.push({
                    id: result_employee_json.id_servicio,
                    content: card_employee(
                        result_employee_json._pictureProfile,
                        (result_employee_json._firstNameUser + " " + result_employee_json._lastNameUser),
                        result_employee_json._ocupacion,
                        result_employee_json._idUser,
                        result_employee_json._idTrabajador
                    )
                });
            }
            console.log(result_employees_data.data);
        }
        console.log();
        setEmpleados(employeesData);
    }

    // Funcion para seleccionar el empleado que se desea que preste el servicio, 
    const seleccionar = async (id) =>{
        let result_employees_data = await axios.get(`http://localhost:3200/api/trabajador/find/${id}`);
        var profesion;
        setNombreEmpleado((result_employees_data.data._firstNameUser + " " + result_employees_data.data._lastNameUser));
        setFotoEmpleado(result_employees_data.data.foto_perfil);
        if(result_employees_data.data.id_rol === 1){
            profesion = "Trabajador";
        }else{
            profesion = "None";
        }
        setProfesionEmpleado(result_employees_data.data._ocupacion);
        setIdPersonaEmpleado(result_employees_data.data._idTrabajador);
    }


    const card_servicio = (servicio, descripcion, precio_servicio, toggle, id) =>{
        console.log("id "+id);
        return (
            <div key={id} className="mx-2 my-2 shadow-3">
                <MDBCard className="">
                <MDBCardBody>
                    <MDBCardTitle>{servicio}</MDBCardTitle>
                    <MDBCardText>{descripcion}</MDBCardText>
                </MDBCardBody>
                <MDBCardFooter>${precio_servicio}</MDBCardFooter>
                <MDBBtn href='#' onClick={ async () => {
                    setIdServicio(id);
                    await consultarServicios(id);
                    toggle();
                    }
                    }>Solicitar</MDBBtn>
                </MDBCard>
            </div>
        );
    }

    const card_employee = (foto, nombre, profesion, id_persona, id_trabajador) =>{
        console.log(empleados);
        console.log("id empleado: "+id_trabajador);
        return (
            <tr>
                <td>
                    <div className='d-flex align-items-center'>
                    <img
                        src={foto}
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{nombre}</p>
                        <p className='text-muted mb-0'>puntuacion</p>
                    </div>
                    </div>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{profesion}</p>
                </td>
                <td>
                    <MDBBadge color='success' pill>
                    Ver
                    </MDBBadge>
                </td>
                <td>
                    <MDBBtn color='link' rounded size='sm' onClick={()=>{changeModal(3); seleccionar(id_trabajador)}}>
                    Seleccionar
                    </MDBBtn>
                </td>
            </tr>
        );
    }
    
    const consultarServicios = async (id) =>{
        
        try {
            var sql;
            if(!id){
                sql = `http://localhost:3200/api/service/available`;
            }else{
                sql = `http://localhost:3200/api/service/find/${id}`;
            }
            console.log("option: "+id+" , sql: "+sql);
            result_client = await axios.get(sql);
            console.log(result_client);

            if(id){
                console.log("result: "+result_client.data);
                console.log("id servicio: "+idServicio);
                let result_client_json = result_client.data;
                setDetalles(result_client_json.descripcion);
                setPrecio(result_client_json.precio);
                setNombre(result_client_json.servicio);
                setCategoria(result_client_json.categoria);
            }
            return result_client;
        }catch(e){
            console.log(e)
        }
    }

    const guardarSolicitud = async (detalle) => {
        
        var parametros1 = {
            "total_solicitud": precio,
            "metodo_pago": 1,
            "estado": 4
        }
        var pago = await axios.post("http://localhost:3200/api/payment/create",parametros1,{
            headers: {
                'Content-Type': 'application/json'
            }
            });
            console.log("id pago: "+pago.data);

        const id_cliente = await axios.get("http://localhost:3200/api/client/find/user/"+id_login);
        console.log("id cliente: "+id_cliente.data._idClient)
        
        var parametros2 = {
            "descripcion": detalle,
            "total": precio,
            "pago": parseInt(pago.data),
            "empleado": idPersonaEmpleado,
            "cliente": id_cliente.data._idClient,
            "estado": 4
        }
        var confirmacion = await axios.post("http://localhost:3200/api/request/create",parametros2,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var parametros3 = {
            "id_servicio": idServicio,
            "id_solicitud": confirmacion.data._idRequest
        }
        var servicio_solicitud = await axios.post("http://localhost:3200/api/service-solicitud/create",parametros3,{
            headers: {
                'Content-Type': 'application/json'
            }
            });

        if(confirmacion.status === 200 && servicio_solicitud.status === 200){
            let fecha_now = new Date();
            let segundos = fecha_now.getSeconds();
            fecha_now.setSeconds(segundos + 1);
            console.log(confirmacion.data)
            document.cookie = `estado_success=1;max-age=2;path=/;`;
            window.location.replace("http://localhost:3000/solicitud");
        }
    }
    
    function DetalleServicio(props){
        return(

                <MDBModalContent className={classModalServicio}>
                <MDBModalHeader>
                    
                    <MDBModalTitle>{props.categoria}</MDBModalTitle>
                          
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBCardText>{props.servicio}</MDBCardText>
                    <MDBCardImage position='top' alt='...' src='https://st2.depositphotos.com/1008336/5216/v/450/depositphotos_52162507-stock-illustration-water-electricity-gas-utilities-household.jpg' />  
                    <p className="p-3">
                        {props.detalles}
                    </p>
                    <MDBCardText className="text-end me-3">{props.precio}</MDBCardText>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                        Cancelar
                    </MDBBtn>
                    <MDBBtn onClick={()=>{ getEmpleadosByService(props.id); changeModal(2)}}>Solicitar</MDBBtn>
                </MDBModalFooter>
             </MDBModalContent>

        );
    }

    function MostrarTrabajadores(){
        return(

                <MDBModalContent scrollable className={classModalTrabajadores}>
                <MDBModalHeader>
                    
                    <MDBModalTitle>Seleccione al tecnico</MDBModalTitle>
                          
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    
                    <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Area u ocupación</th>
                        <th scope='col'>Perfil</th>
                        <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>

                    {empleados.map(empleado => (
                        <tbody key={empleado.id} >
                            {empleado.content}
                        </tbody>
                    )) }

                    </MDBTable>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                        Cancelar
                    </MDBBtn>
                    <MDBBtn onClick={()=>changeModal(1)}>Atras</MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            
        
        );
    }

    function SeleccionarFinalizarSolicitud(){

        var submit = () => {
            var detalle = document.getElementById("detalle-solicitud").value;
            confirmAlert({
              title: 'Aceptar para continuar',
              message: 'Click en Aceptar si desea realizar esta solicitud, de lo contrario Click en Cancelar',
              buttons: [
                {
                  label: 'Continuar',
                  onClick: () => guardarSolicitud(detalle)
                },
                {
                  label: 'Cancelar',
                  onClick: () => alert('Click No')
                }
              ]
            });
          };

        return(

                <MDBModalContent scrollable className={classModalFinalizarSolicitud}>
                <MDBModalHeader>
                    
                    <MDBModalTitle>Detalle de la solicitud</MDBModalTitle>
                          
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    
                    <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Servicio Seleccionado</MDBCardTitle>
                        <MDBCardText>
                            <MDBCardText>{nombre}</MDBCardText>
                            <MDBCardImage position='top' alt='...' src='https://cenacap.edu.co/wp-content/uploads/2021/12/electricidad-residencial.jpg' />  
                            <p className="p-3">
                            {detalles}
                            </p>
                            <MDBCardText className="text-end me-3">{precio}</MDBCardText>
                        </MDBCardText>
                        <MDBBtn>cambiar</MDBBtn>
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
                                src={fotoEmpleado}
                                alt=''
                                style={{ width: '45px', height: '45px' }}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{nombreEmpleado}</p>
                                <p className='text-muted mb-0'>puntuacion</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{profesionEmpleado}</p>
                        </td>
                        </tr>
                        
                    </MDBTableBody>
                    </MDBTable>
                    <MDBTextArea id="detalle-solicitud" rows={6} label="Descripción" >

                    </MDBTextArea>
                    </MDBCardBody>
                    </MDBCard>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn onClick={()=>{submit(); toggleShow(); }}>Finalizar </MDBBtn>
                

                    <MDBBtn color='secondary' onClick={toggleShow}>
                        Cancelar
                    </MDBBtn>
                    <MDBBtn onClick={()=>changeModal(2)}>Atras</MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            
        
        );
    }
    return(
        <>
            <Header />
            <div className="container-fluid px-5">
                <nav className="d-flex flex-row bg-primary py-2 align-items-center container-fluid rounded-2">                  
                        <span className="inline mx-4 align-self-start">Categorias: </span>
                        <ul className="list-inline my-1">
                            <li className="list-inline-item mx-3 fs-6">Electricidad domestica</li>
                            <li className="list-inline-item mx-3 fs-6">Plomería y acueducto</li>
                            <li className="list-inline-item mx-3 fs-6">Construcción</li>
                            <li className="list-inline-item mx-3 fs-6">Aseo y limpieza</li>
                            <li className="list-inline-item mx-3 fs-6">Complementarios</li>
                            <li className="list-inline-item mx-3 text-light">Populares</li>
                        </ul>  
                </nav>              
                <div >
                    <div className="d-flex justify-content-center mt-5 p-3">
                        <div className="outline col-2">
                            <nav>
                                <div className="accordion" >
                                    <div className="accordion-item">
                                        <h3 className="accordion-header" >
                                            <button className="accordion-button" type="button" data-bs-toggle="collapsed" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">Categorias</button>
                                        </h3>
                                        <div  className="accordion-collapsed collapsed show">
                                            <div className="accordion-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        Limpieza y aseo
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        Electricidad
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        Plomeria y acueducto
                                                    </label>
                                                </div>
                                                
                                                    
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="accordion-item" id="accordionPanelsStayOpenExample">
                                        <h3 className="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">Precio</button>
                                        </h3>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                            <div className="accordion-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        $0 - $100.000
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        $100.000 - $200.000
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        $200.000 - $300.000
                                                    </label>
                                                </div>
                                                
                                                    
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item" id="accordionPanelsStayOpenExample">
                                        <h3 className="accordion-header" id="panelsStayOpen-headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">Ubicación</button>
                                        </h3>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                            <div className="accordion-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        hasta 1 Km
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        hasta 2 Km
                                                    </label> 
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                        Menos de 1 Km
                                                    </label>
                                                </div>
                                                
                                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-10">
                            <div className="d-flex justify-content-end pe-4 col-3 ms-5 mb-3">
                                <div className="form-outline col-4">
                                    <select className="form-select form-select-sm">
                                        <option >Ordenar por:</option>
                                        <option >Nombre</option>
                                        <option >Precio: Ascendente</option>
                                        <option >Precio: Descendente</option>  
                                    </select>
                                    <span className="select-arrow"></span>
                                </div>
                            </div>
                            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                            <MDBModalDialog centered  size="lg">
                            
                                <DetalleServicio detalles={detalles} precio={precio} servicio={nombre} id={idServicio} categoria={categoria}/>
                                <MostrarTrabajadores/>
                                <SeleccionarFinalizarSolicitud/>
                            </MDBModalDialog>
                            </MDBModal>     
                            {/* Bloque para armar cada una de las cards que se visulizan al pichar sobre buscar servicios o Solicitar Servicios*/}
                            <div className="d-flex flex-wrap container-fluid justify-content-around" id="panel-servicios">
                                {servicios.map(servicio => (
                                    <div key={servicio.id} className="col-5 mx-2 my-2 shadow-3">
                                        {servicio.content}
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
}
