import Header from "../Header"
import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faClipboard } from '@fortawesome/free-solid-svg-icons'
import tip1 from "../assets/img/tip1.jpg"
import tip2 from "../assets/img/tip2.jpg"
import tip3 from "../assets/img/tip3.jpg"
import { CookieValidation } from "../../scripts/CookiesValidation"
import Footer from "../Footer"




//Componente principal el cual devuelve JSX de el sideBar recibe parametros para la personalizacion segun el usuario que este autenticado
export function SideBar(props){
    var colorBtn = '';//variable para almacenar la clase la cual definira el color del boton, este varia segun el estado del trabajador
    console.log(props.estado);
    //If para definir el color del boton segun estado del Trabajador
    if(props.estado === "Activo"){
        console.log("1");
        colorBtn = 'bg-success';
    }if(props.estado === "Por verificar"){
        console.log("2");
        colorBtn = 'bg-warning';
    }if(props.estado === "Cancelado"){
        console.log("3");
        colorBtn = 'bg-danger';
    }
    console.log(colorBtn);

    return(
            <>
                {/*Ventana flotante de opciones para cerrar sesion o acceder a la informacion de la cuenta*/}
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

                <div>
                    {/*Seccion en la cual se muestra la foto el rol de usuario su estado y un boton para editar informacion */}
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={`http://localhost:3200/api/img/${props.img}`} className="rounded-circle mb-3" style={{width: 150+"px"}} alt="Avatar" /> {/*Imagen de perfil */}
                            <h5 className="mb-2"><strong>{props.nombre}</strong></h5>
                            <p className="text-muted">Trabajador <span className={`badge ${colorBtn}`}>{props.estado}</span></p>
                            <p className="text-muted mb-4">{props.ocupacion}</p>
                            {/*Boton para editar*/}
                            <div className="d-flex justify-content-center mb-2">
                                <button type="button" className="btn btn-primary">Editar</button>
                            </div>
                        </div>
                    </div>
                    {/*opciones de menu de sideBar, estas opciones van directamente relacionadas con el funcionamiento del negocio y de la aplicacion*/}
                    <div className="card mb-4 mb-lg-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                                {/*Opcion para acceder al perfil del Trabajador y muestra toda su informacion personal y informacion relevante de su rendimiento*/}
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fas fa-user-tie"></i>
                                    <Link to="/perfil-trabajador" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Informacion de la cuenta</Link>
                                </li>
                                {/*Muestra la informacion de las solicitudes de ordenes que tiene el trabajador, entre las que incluye: por aceptar, activas, completadas y canceladas.*/}
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fas fa-list-check"></i>
                                    <Link to="/solicitudes-trabajador" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Solicitudes</Link>
                                </li>
                                {/*Opcion para mostrar los servicios que actualmente presta el trabajador y que ademas puede añadir mas a su portfolio*/}
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                <i className="bi bi-plus-square-fill"></i>
                                    <Link to="/servicios" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Mis servicios</Link>
                                </li>
                                {/*OPcion para acceder al centro de ayuda para resolver cualquier anomalia relacionada con un pedido o directamente con el funcionamiento de la plataforma*/}
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fa-solid fa-circle-question"></i>
                                    <Link className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} to="/centro-ayuda">Centro de ayuda</Link>
                                </li>
                                {/*Seccion disponible para que el trabajador pueda aplicar a la vacante en algun perfil u ocupacion que tenga, solo disponible cuando el trabajador tiene el estado por verificar*/}
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                <i className="fa-solid fa-bag-shopping"></i>
                                    <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Empleos</a>
                                </li> 
                                {/*Opcion la cual mostrara la informacion financiera del trabajador */}           
                                <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="fas fa-credit-card"></i>
                                    <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} >Mis ganancias</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </>
            );
}
//Componente el cual muestra y actualiza informacion sobre las ordenes que tiene en curso el trabajador
function InfoOrdenesCurso(props){
    console.log("props.ordenes");
    console.log(props.ordenes);
        if(props.ordenes === undefined){
        return(
            <>
            <div className="col px-0 d-flex align-items-center">
                <div className="card mb-4 mb-md-0 h-100 w-100 me-2 ">
                    <div className="mt-auto">
                        <p className="text-center">No hay ordenes disponibles</p>
                    </div>
                </div>
            </div>
            </>
        );
    }else{
        return(
            <>
            
                <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>{props.ordenes} - </p>
                <div className="progress rounded" style={{height: 5+"px"}}>
                    <div className="progress-bar" role="progressbar" style={{width: 25+"%"}} aria-valuenow="25"aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            
            </>
        );
    }
    
}
//Componente el cual muestra y actualiza informacion sobre el historial de ordenes, en especifico las ultimas 3
function InfoHistorialOrdenes(props){
    return(
        <>
        <div className="col px-0">
            <div className="card mb-4 mb-md-0 h-100">
                <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> 
                        Historial
                    </p>
                    <p className="mb-1" style={{fontSize: .77+"rem"}}>Satisfaccion del Cliente</p>
                    <div className="d-flex align-items-center">
                        <div className="me-3">
                            <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="1x"/>
                            <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="1x" />
                            <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="1x" />
                            <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="1x"/>
                            <FontAwesomeIcon className="mx-1" icon={faStar} color="blue" size="1x" />
                        </div>
                       
                        <div className="d-inline-block">
                            <small>{props.nota}</small><br/>
                            <small>{props.resenas} Reseñas</small>
                        </div>
                    </div>
                    <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Ordenes Ultimo Mes</p>
                    <FontAwesomeIcon className="mx-1" icon={faClipboard} color="blue" size="1x"/>
                    <small className="ms-3">{props.pedidos} pedidos</small>
                    
                </div>
            </div>
        </div>
        </> 
    );
}
//Componente el cual tiene la funcion de mostrar y actualizar informacion sobre el dinero acomulado por el trabajador.
function InfoGanancias(props){
    return(
        <>
        <div className="card mb-4 mb-md-0 h-100 me-2">
            <div className="card-body pb-2">
                <p>Ganancias acomuladas</p>
                <div className="d-flex ">
                    <p style={{fontSize: 24+"px"}}><strong>${props.ganancias}</strong></p>
                    <button type="button" className="btn btn-outline-success btn-sm h-75 ms-4">Ir al pago</button>     
                </div>
            </div>
        </div>
        </>
    );
}
//Componente el cual tiene como funcion mostarr y actualizar informacion sobre el total de pedidos en curso, es decir que tienen estado de activos
function CountPedidosCurso(props){
    console.log(props.countC);
    return(
        <>
        <div className="row px-3 my-2">
            <div className="card mb-4 mb-md-0 h-100 me-2">
                <div className="card-body pb-0">
                    <p>Pedidos en curso</p> 
                    <p className="" style={{fontSize: 30+"px"}}><strong>{props.countC}</strong></p>                                          
                </div>
            </div>
        </div>
        </>
    );
}
//Componente el cual tiene como funcion mostarr y actualizar informacion sobre el total de pedidos pendientes, es decir que tienen estado de Por aceptar
function CountPedidosPendientes(props){
    console.log(props.countP);
    return(
        <>
        <div className="row px-3 ms-4 my-2">
            <div className="card mb-4 mb-md-0 h-100 me-2">
                <div className="card-body pb-0">
                    <p>Pedidos pendientes</p> 
                    <p style={{fontSize: 30+"px"}}><strong>{props.countP}</strong></p>                                
                </div>
            </div>
        </div>
        </>
    );
}
//Componente el cual tiene como funcion para mostrar 4 tips para el exito en la plataforma, estos varian segun el perfil de usuario
function SectionTips(props){
    return(
        <>
            <div className="card mb-4 mb-md-0 h-100 me-2 px-0">
                <div className="card-body p-3">
                    <p>Tips</p>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner" style={{maxHeight: 8+"rem"}}>
                            <div className="carousel-item active"  style={{maxHeight: 8+"rem"}}>
                                <div className="card d-flex flex-row justify-content-center" style={{maxHeight: 8+"rem"}}>
                                    <img src={tip1} className="card-img-top" alt="..." style={{maxWidth: 10+"rem"}}/>
                                    <div className="card-body">
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                            </div>
                        <div className="carousel-item" style={{maxHeight: 8+"rem"}}>
                            <div className="card d-flex flex-row justify-content-center" style={{maxHeight: 8+"rem"}}>
                                <img src={tip2} className="card-img-top" alt="..."  style={{maxWidth: 10+"rem"}}/>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{maxHeight: 8+"rem"}}>
                            <div className="card d-flex flex-row justify-content-center" style={{maxHeight: 8+"rem"}}>
                                <img src={tip3} className="card-img-top" alt="..." style={{maxWidth: 10+"rem"}}/>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>                                       
            </div>
        </div>
        </>
    );
}
//Componente cuya funcion es mostrar y gestionar las notas que desee guardar el usuario como recordatorio, 
//solo se podran almacenar una maximo de 5 notas por usuario y una vez eliminadas no hay forma de recuperarlas
function Notas(props){
    return(
        <>
        <div className="card mb-5 mb-md-0 h-100 me-2">
            <p className="mt-0 pt-2">Notas</p>
            <div className="card-body pb-1">  
                <div className="row px-3 mb-5 ">
                    <div className="card mb-5 mb-md-0 h-100 me-2">
                        <div className="card-body">
                            <p>Sin Notas disponibles</p>
                            <button type="button" className="btn btn-outline-secondary"><i className="fa-solid fa-plus"></i>Agregar</button>                                            
                        </div>
                    </div>
                </div>                                            
            </div>
        </div>
        </>
    );
}
//Componente principal de la ruta en el cual se ordenan los diferentes componentes para mostrar la interfaz de usuario al trabajador
export function PerfilTrabajador(props){
    //Variable cuyo valor esta determinado por el valor de retorno de la funcion CookiValidation
    //esta funcion lee la cookie y devuelve su valor
    const id_login = CookieValidation();
    const [trabajador, setTrabajador] = useState({}); //constante para almacenar los datos del usuario en un objeto
    const [infoPerfil, setInfoPerfil] = useState({});//Variable para almacenar los datos que se muestran en las cards del perfil: Ganancias, pedidos finalizados, pedidos pendientes, pedidos en curso
    const [ordenesCurso, setOrdenesCurso] = useState([]);//Variable para almacenar los servicios que tienes activos en las solicitudes.

    useEffect(() => {
        console.log("id_login");
        console.log(id_login);
        const fetchData = async () => {
            try{
                let datosTrabajador = await getSidebarInformation();
                if(datosTrabajador){
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
                }else{
                    let objTrabajador = {
                        "nombre": "Sin datos",
                        "apellido": "Sin datos",
                        "telefono": "Sin datos",
                        "direccion": "Sin datos",
                        "documento": "Sin datos",
                        "email": "Sin datos",
                        "especializacion": "Sin datos",
                        "experiencia": "Sin datos",
                        "estado": "Sin datos",
                        "tipoEmpleado": "Sin datos",
                        "imgEmpleado": "Sin datos"
                    }
                    setTrabajador(objTrabajador);
                }
            }catch(error){
                alert("Error al consultar informacion, verifique e intentelo de nuevo");
                console.log("Error useEffect perfilTrabajaor: "+error)
            }           
        }

        const cargarInformacion = async () =>{
            //Primeramente se cargara la informacion de ganancias, por lo cual se debe
            //Hacer una peticion al servidor para recolectar la informacion del la columna de total de la base de datos llamada ingresos_tranajador
            //y con la condicion de que estos pertenezcan al trabajador y que esten en estado no pago
            //la funcion recorrera el array y sumara los totales para mostrarlos
            var enCurso = 0;
            var pendientes = 0;
            var calificacion = 0;
            var ganancias = 0;
            var totalResenas = 0
            var pedidos = 0;
            var ordenes = [];
            var servicios = [];
            try{
                var url = `http://localhost:3200/api/trabajador/find/persona/${id_login}`;
                var trabajador = await axios.get(url);
                // console.log(trabajador.data);
                url = `http://localhost:3200/api/ingreso/find/${trabajador.data._idTrabajador}/1`;
                let responseGanancias = await axios.get(url);
                ganancias = new Intl.NumberFormat('es-MX').format(responseGanancias.data.totalIngresos);
                
            }catch(error){
                console.log(error);
            }
            //Luego la funcion hará una consulta al servidor para obtener los datos de las solicitudes que estan asignadas al trabajador y que
            //estan en estado por aceptar, estas se cargaran a la vista de los pedidos en pendientes por medio de su componente
            try{
                url = "http://localhost:3200/api/request/find/trabajador";
                let solicitudPendientes = await axios.post(url, {
                    "id_trabajador": id_login,
                    "estado": 4
                },{
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                if(solicitudPendientes.data === "Objeto no encontrado"){
                    pendientes = 0
                }else{
                    pendientes = solicitudPendientes.data.length;
                }  
            }catch(error){
                pendientes = 0;
                console.log(error);
            }

            //Luego la funcion consultara los pedidos activos (curso) y mostrara una card con la informacion del pedido y el avance de su gestion
            //debera recorrer el array para crear una card por pedido.
            
            //Luego la funcion hará una consulta al servidor para obtener los datos de las solicitudes que estan asignadas al trabajador y que
            //estan en estado activas, estas se cargaran a la vista de los pedidos en curso por medio de su componente
            try{
                let url = "http://localhost:3200/api/request/find/trabajador";
                // console.log(trabajador)
                var solicitudActivos = await axios.post(url, {
                    "id_trabajador": id_login,
                    "estado": 1
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(typeof(solicitudActivos.data[0]));
                if(solicitudActivos.data === "Objeto no encontrado"){
                    enCurso = 0;
                }else{
                    enCurso = solicitudActivos.data.length;
                    for (let i = 0; i < solicitudActivos.data.length; i++) {
                        let servicio =  JSON.parse(solicitudActivos.data[i]);
                        
                        console.log("servicio");
                        console.log();
                        servicios.push(servicio.id_solicitud);
                    }
                } 
                console.log("servicios");
                console.log(servicios);
            }catch(error){
                console.log(error);
                enCurso = 0;
            }
            //En esta parte de la funcion se consultara para obtener los datos del historial de solicitudes: primero consultara la calificacion de la tabla de nivel de servicio
            //para obtener las calificaciones que ha recibido el trabajador y poder tomar un promedio, segun este dato se podra mostrar un progressbar de forma de estrellas.
            //De la misma forma se consultara la informacion acerca de la calificacion de trabajador y de igual forma se calculara el promedio y tambien se mostrara el prograssbar.
            try{
                url = `http://localhost:3200/api/calificacion/find/${id_login}`;
                let responseCalificacion = await axios.get(url);
                calificacion = responseCalificacion.data.calificacionPromedio;
                totalResenas = responseCalificacion.data.totalResenas
                
            }catch(error){
                console.log(error);
            }
            //En este bloque de codigo se toma la informacion ya consulta de de la base de datos sobre
            //las ordenes activas del trabajador y con el id solicitud se consulta el nombre del servicio para poder consultar la informacion
        
            try{
                console.log("servicios");
                console.log(servicios);
                for (let i = 0; i < servicios.length; i++) {
                    var response = await axios.get(`http://localhost:3200/api/service-solicitud/find/solicitud/${servicios[i]}`);
                    console.log("response");
                    console.log(response);
                    url = `http://localhost:3200/api/service/find/${response.data._idServicio}`;
                    let responseSolicitud = await axios.get(url);
                    ordenes.push(responseSolicitud.data);
                    
                    url = "http://localhost:3200/api/request/find/trabajador";
                    var solicitudFinalizadas = await axios.post(url, {
                        "id_trabajador": id_login,
                        "estado": 2
                    },{
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    });
                    
                }
                if(solicitudFinalizadas.data === "Objeto no encontrado"){
                    pedidos = 0
                }else{
                    pedidos = solicitudFinalizadas.data.length;
                }
            }catch(error){
                console.log(error);
            }
            
            setOrdenesCurso(ordenes);
            setInfoPerfil({
                "ganancias": ganancias,
                "pedidos_curso": enCurso,
                "pedidos_pendientes": pendientes,
                "calificacion":calificacion,
                "resenas": totalResenas,
                "pedidos": pedidos
            });
            console.log("infoPerfil:");
            console.log(infoPerfil);
        }
        fetchData();
        cargarInformacion();
      }, []);
    
    return(
        <>
        <section style={{backgroundColor: "#eee", maxWidth: 100 + "%"}}className="d-flex flex-column w-100">
            {/*Header*/}
            <Header user={2}/>
            {/*Fin Header*/}

            <div className="container-fluid d-flex pt-3 px-0 ">
                <div className="ps-4 pe-1">
                    {/* sidebar profile*/}
                    <SideBar ocupacion = {trabajador.tipoEmpleado} estado = {trabajador.estado} nombre = {trabajador.nombre + " " + trabajador.apellido} img={trabajador.imgEmpleado}/>
                    {/* Fin sidebar profile*/}
                </div>
                <div className='d-flex w-100 ms-4'>
                    {/*Seccion de datos del usuario*/}
                    <div className="col-8">
                        {/*Informacion personal*/}
                        <div className="d-flex row">
                            <div className="col px-0">
                                <div className="card mb-4 col pb-4 pe-3 px-3">
                                    <h3 className="text-center mt-4">Información personal</h3>

                                    <div className="card-body pb-5 pt-0">
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
                        </div>
                        {/*Fin Informacion personal*/}
                        {/*Datos de Ordenes en curso y Historial de Ordenes*/}
                        <div className="row">
                            <div className="col px-0">
                                <div className="card mb-4 mb-md-0 h-100 me-2">
                                    <div className="card-body">
                                    <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> En Curso</p>
                                    {ordenesCurso.map(orden => (
                                        <InfoOrdenesCurso key={orden.id_servicio} ordenes={orden.servicio}/>      
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <InfoHistorialOrdenes nota={infoPerfil.calificacion} resenas={infoPerfil.resenas} pedidos={infoPerfil.pedidos}/>        
                        </div>
                    </div>
                    {/*Fin Seccion de datos del usuario*/}
                    {/*Seccion de datos relevantes*/}
                    <div className="col-4 d-flex flex-column align-items">
                        <div className="row px-5 mb-4">
                            <InfoGanancias ganancias={infoPerfil.ganancias}/>
                        </div>

                        <div className="d-flex">
                            <CountPedidosPendientes countP={infoPerfil.pedidos_pendientes}/>
                            <CountPedidosCurso countC={infoPerfil.pedidos_curso}/>  
                        </div>
                        <div className="row px-5 my-4">
                            <SectionTips />
                        </div>

                        <div className="row px-5 my-2">
                            <Notas />
                        </div>
                    </div> 
                    {/*Fin Seccion de datos relevantes*/}    
                </div>
            </div>
            {/*Footer*/}
            <Footer />
            {/*Fin Footer*/}
        </section>
        </>
    );
}
//Metodo para consultar los datos del trabajador no recibe parametros ya que consulta la variable globla id_login la cual determina el valor la cookie
export async function getSidebarInformation(){
    const id_login = CookieValidation();

    try {   
      const result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/persona/${id_login}`);//consultar trabajador por el id_persona del id_login
      const result_persona = await axios.get(`http://localhost:3200/api/trabajador/find/${result_trabajador.data._idTrabajador}`);//consultar datos del trabajador por el id_trabajador
      console.log(result_persona.data);
      //return donde se crea el objeto trabajador y se devuelve como respuesta.
      return({"nombre":result_persona.data._firstNameUser,
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
         }
         )
    } catch (error) {
      console.error("Error getSidebarInformation:", error);
      return(undefined);//devuelve undefined en caso de error
    }
}
