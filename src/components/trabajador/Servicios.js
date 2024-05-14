import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {SideBar, getSidebarInformation } from './PerfilTrabajador';
import { Link } from "react-router-dom";
import Header from '../Header';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from 'mdb-react-ui-kit'

var estado_success = 'none';

let cookies = document.cookie;
var id_login = 0;
var value = "";
var key = "";
var id_trabajador = 0;
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

export function Servicios(){
    const [fillActive, setFillActive] = useState('tab1');
    const [servicios, setServicios] = useState([]); //Aqui se guardaran los servicios del trabajador en un Array
    const [serviciosAdd, setServiciosAdd] = useState([]);
    const [estadoSuccess, setEstadoSuccess] = useState("none");
    const [tab, setTab] = useState(1);
    const [serviciosIndexs, setServiciosIndexs] = useState([]);
    const [perfilTrabajador, setPerfilTrabajador] = useState({});

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

    useEffect(() => {
        
        const fetchData = async () => {
        let trabajador = await getSidebarInformation();
        console.log(trabajador);
        setPerfilTrabajador(trabajador);
          try {
            
            let result_trabajador = await axios.get(`http://localhost:3200/api/trabajador/find/${id_login}`);
            console.log(result_trabajador.data)
            id_trabajador = result_trabajador.data._idTrabajador;
            handleFillClick('tab1');
            setTab(1);
            await mostrarServicios(1);
            
            
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
      }, []);

    async function mostrarServicios(tabs){

        let arrayServicios = [];
        let arrayServiciosAll = [];
        let indices = [];
            
        let result = await axios.get(`http://localhost:3200/api/service-trabajador/find/solicitud/${id_trabajador}`); //peticion http para conocer cuales son los servicios que tiene agregados el trabajador
            console.log("servicio1");
            console.log(result.data);
            for (let i = 0; i < result.data.length && typeof(result.data) != "string"; i++) {
                console.log("servicio");
                console.log(result.data);
                console.log("----data---");
                let result_servicio = await axios.get(`http://localhost:3200/api/service/find/${result.data[i]._idServicio}`);
                console.log("servicio");
                console.log(result_servicio.data);
                let solicitud = {
                    "id_servicio": result_servicio.data.id_servicio,
                    "servicio": result_servicio.data.servicio,
                    "categoria": result_servicio.data.categoria,
                    "descripcion": result_servicio.data.descripcion
                }//formato que se le da a cada uno de los objetos de la peticion anterior
                arrayServicios.push(solicitud); //se agrega el objeto con el formato dado en la variable solicitud
                console.log("arrayServicios");
                console.log(arrayServicios);
          }
          setServicios(arrayServicios);//se asigna a servicios por medio de su metodo set el valor del array formado en el for de nombre arrayServicios
          for (let i = 0; i < arrayServicios.length; i++) {
            indices.push(arrayServicios[i].id_servicio);
            console.log("Indices");
          }
          setServiciosIndexs(indices);
          console.log(serviciosIndexs);
        
        


            let resultAll = await axios.get(`http://localhost:3200/api/service/find`);//peticion http para saber todos los servicios en base de datos
            console.log("servicio2");
            console.log(resultAll.data);
            console.log("servicios ----");
            console.log(serviciosIndexs);
            for (let i = 0; i < resultAll.data.length && typeof(result.data) != "string"; i++) {
                    console.log("servicio{{{{{");
                    console.log();
                    console.log(serviciosIndexs);
                    console.log(result.data);
                if(serviciosIndexs.includes(resultAll.data[i]._idService)){
                    
                }else{
                    let solicitud = {
                        "id_servicio": resultAll.data[i]._idService,
                        "servicio": resultAll.data[i]._service,
                        "categoria": resultAll.data[i]._categoria,
                        "descripcion": resultAll.data[i]._description
                    }
                    arrayServiciosAll.push(solicitud);

                }
            }
        setServiciosAdd(arrayServiciosAll);
        console.log("----");
        console.log(arrayServiciosAll);
    
        
    }


    return(
        <>
        <Header user={2}/>
        <div className='d-flex container-fluid px-3'>
        <SideBar ocupacion = {perfilTrabajador.ocupacion} estado = {perfilTrabajador.estado} nombre = {perfilTrabajador.nombre + " " + perfilTrabajador.apellido}/>
        <div className=''>
        <MDBTabs>
            <MDBTabsItem>
                <MDBTabsLink onClick={async () => {handleFillClick('tab1'); setTab(1); await mostrarServicios(1)}} active={fillActive === 'tab1'}>
                    Mis Servicios
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={async () => {  
                    let datos = await mostrarServicios(1);
                    await mostrarServicios(2, datos);
                    handleFillClick('tab2');
                    setTab(2);
                }} 
                active={fillActive === 'tab2'}>
                    Agregar Servicios
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>
        <MDBTabsContent>
            <MDBTabsPane show={contentTab('tab1')} >
                <h4>Servicios Disponibles</h4>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <td>ID</td>
                            <td>Servcio</td>
                            <td>Categoria</td>
                            <td>Descripcion</td>
                            <td>Acciones</td>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody id="tab1">
                    {servicios.map(servicio =>(
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                                
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{servicio.id_servicio}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{servicio.servicio}</p>
                            <p className='text-muted mb-0'></p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">
                            {servicio.categoria}
                            </p>
                        </td>
                        <td>{servicio.descripcion}</td>
                        <td>
                            <a href="#" onClick={() =>{return(1)}}>
                            Ver detalles
                            </a>
                        </td>
                    </tr>
                    ))}
                    </MDBTableBody>
                </MDBTable>
            </MDBTabsPane>
            <MDBTabsPane show={contentTab('tab2')} >
                <h4>Agregar Servicio</h4>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <td>ID</td>
                            <td>Servcio</td>
                            <td>Categoria</td>
                            <td>Descripcion</td>
                            <td>Acciones</td>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody id="tab2">
                    {serviciosAdd.map(servicio =>(
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                                
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{servicio.id_servicio}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{servicio.servicio}</p>
                            <p className='text-muted mb-0'></p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">
                            {servicio.categoria}
                            </p>
                        </td>
                        <td>{servicio.descripcion}</td>
                        <td>
                            <a href="#" onClick={() =>{return(1)}}>
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
        </>
    );
}