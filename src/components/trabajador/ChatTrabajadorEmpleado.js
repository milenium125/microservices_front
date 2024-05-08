
import React,  {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import imageAgente from '../assets/img/img-agente-chat.png'
import Header from "../Header"
import { Link } from "react-router-dom"
const {SideBar, getSidebarInformation } = require('./PerfilTrabajador')


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

function LiveChat(){
    const chatHTML= useRef('');

    useEffect(() =>{
        const consultaChatHTML = async () =>{
            const response = await axios.get("http://localhost:3100");
            if (chatHTML.current) {
                chatHTML.current.innerHTML = response.data;
            }
            console.log();
        };
        consultaChatHTML();
    }, []);


    return <div ref={chatHTML} />;
}

          
export function ChatAtencionEmpleado(){

    const [perfilTrabajador, setPerfilTrabajador] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let trabajador = await getSidebarInformation();
            console.log(trabajador);
            setPerfilTrabajador(trabajador);
        }
        
        fetchData();
      }, []);

    

    return(
    <>
        <Header user={2}/>
        <div className='d-flex container-fluid px-3'>
            <div>
                {/* sidebar profile*/}
                <SideBar ocupacion = {perfilTrabajador.ocupacion} estado = {perfilTrabajador.estado} nombre = {perfilTrabajador.nombre + " " + perfilTrabajador.apellido}/>
                {/* sidebar profile*/}
            </div>
            <div id="chat" className='d-flex row w-100 container-fluid ps-5'>
                <h2 className='my-4'>Atencion al Cliente - Chat en linea</h2>
                <LiveChat />
                {/* <div id="chat-top" className='bg-dark d-flex align-items-center rounded-5 px-5 py-2'>
                    <div className='d-flex justify-content-between col-12'>
                        <div className='d-flex align-items-end col-5'>
                            <h2 className='text-white fs-4'>Microservices</h2>
                            <div className='pb-2 ms-3'><span className='text-white fuente-chat'>CHAT ATENCION AL CLIENTE</span></div>
                        </div>
                        <div className='d-flex col-7'>
                            <div className='col-1 d-flex justify-content-center ms-3'><img src={imageAgente} className='w-75 rounded-circle'/></div>
                            <div className='d-flex align-items-end col-7'><span id="nombre-receptor" className='text-white fs-6'>Mariana Perez</span><span id="rol-receptor" className='text-white ms-2'> - Agente de Atención al Cliente</span></div>
                            <div id='semaforo-estado' className='rounded-circle bg-success col-1 position-absolute start-47' style={{width:1+"%", height:2+"%"}}></div>
                        </div>
                    </div>
                </div>
                <div id="chat-bottom" className='d-flex mt-4'>
                    <div id="chat-bottom-right" className='col-3'>
                        <div className="card W-100 my-4 d-flex flex-row">
                            <div className='d-flex align-items-center ms-3 col-2 p-0'><img src={imageAgente} className="card-img-top img-chat" alt="..."/></div>
                            <div className="card-body col-9">
                                <p className="card-text texto-chats1">Atencion al cliente</p>
                                <p className="card-text texto-chats2">Pedido #02454</p>
                                <p className="card-text texto-chats3">07/04/2024 06:25 am</p>
                            </div>
                        </div>
                        <div className="card W-100 my-4 d-flex flex-row">
                            <div className='d-flex align-items-center ms-3 col-2 p-0'><img src={imageAgente} className="card-img-top img-chat" alt="..."/></div>
                            <div className="card-body col-9">
                                <p className="card-text texto-chats1">Atencion al cliente</p>
                                <p className="card-text texto-chats2">Pedido #02454</p>
                                <p className="card-text texto-chats3">07/04/2024 06:25 am</p>
                            </div>
                        </div>
                    </div>
                    <div id="chat-bottom-left" className='col-8 px-5 py-2'>
                        <div id="chat-messages-scrren" className='col-12 d-flex ms-4  d-flex flex-column'>
                            <div className='d-flex w-100 justify-content-end'>
                                <div class="card d-flex flex-row" style={{width: 18+"rem"}}>
                                    <div class="card-body">
                                        <p class="card-text">Tu</p>
                                        <p class="card-text">Buenos dias</p>
                                    </div>
                                    <div className='d-flex align-items-center ms-3'><img src={imageAgente} class="card-img-top img-message" alt="..."/></div>
                                </div>
                            </div>
                            <div className='d-flex w-100 justify-content-start'>
                                <div class="card d-flex flex-row" style={{width: 18+"rem"}}>
                                    <div className='d-flex align-items-center ms-3'><img src={imageAgente} class="card-img-top img-message" alt="..."/></div>
                                    <div class="card-body">
                                        <p class="card-text"><strong>Agente</strong></p>
                                        <p class="card-text">Buenos dias, en que puedo ayudarte?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
            
                    </div> */
                    
                /* </div> */
                /* <div id="chat-message" className=' w-100 border position-relative'>
                            <input className='form-control' placeholder='Type your message here' />
                        </div> */}
            </div>
            
        </div>
    </>
    );
}