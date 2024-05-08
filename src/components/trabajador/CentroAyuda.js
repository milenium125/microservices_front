
import React, {useEffect, useState} from "react";
import axios from "axios";
import image from '../assets/img/customerService.jpg'
import {SideBar, getSidebarInformation } from './PerfilTrabajador';
import Header from "../Header";
import { Link } from "react-router-dom";
// import { Collapse, initMDB } from 'mdb-ui-kit';

// initMDB({ Collapse });

async function abrirChatAtencion(idPedido, idTrabajador, tipoUsuario){ // 1 - trabajador   2- Atencion al cliente
    try {
        const result_chats = await axios.get(`http://127.0.0.1:3200/api/chat/find/${idPedido}`)
        if(result_chats.data){
            return result_chats.data
        }else{
            if(tipoUsuario = 1)
            var createChat = await axios.post("http://127.0.0.1:3200/api/chat/create", {
                "solicitud": idPedido,
                "trabajador":  idTrabajador
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
        }
        if(createChat.status = 200){
            return "Usuario creado exitosamente";
        }
        
    } catch (error) {
        console.log(error);
    }
}

export function CentroAyuda(){
    const [perfilTrabajador, setPerfilTrabajador] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            let trabajador = await getSidebarInformation();
            console.log(trabajador);
            setPerfilTrabajador(trabajador);
        }
        
        fetchData();
      }, []); // Empty dependency array ensures useEffect runs once on mount

    return(
    <>
    <Header user={2}/>
    <div className="d-flex container-fluid">
        <div>
            {/* sidebar profile*/}
            <SideBar ocupacion = {perfilTrabajador.ocupacion} estado = {perfilTrabajador.estado} nombre = {perfilTrabajador.nombre + " " + perfilTrabajador.apellido}/>
            {/* sidebar profile*/}
        </div>
        <div className="px-3">
            <h3 className="text-center my-5">Centro de Ayuda</h3>
            <div id="contenedor-ayuda" className="d-flex mb-5">
                <div id="columna1" className="col-8 mx-2">
                    <h4 className="my-5">Preguntas Frecuentes</h4>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ¿Qué es Microservices y cómo funciona?
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Microservices</strong> es una plataforma que conecta a trabajadores con experiencia en diferentes campos de servicio con usuarios que buscan contratar servicios de alta calidad. Funciona proporcionando a los trabajadores acceso a oportunidades laborales basadas en sus habilidades y a los usuarios la capacidad de encontrar profesionales confiables para satisfacer sus necesidades.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                ¿Cómo puedo registrarme como trabajador en Microservices?
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Para registrarte como trabajador en <strong>Microservices</strong>, simplemente visita nuestra página de inicio de sesión y haz clic en el botón de registro. Completa el formulario con tus detalles personales, experiencia laboral y habilidades, y sigue las instrucciones para completar el proceso de registro.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                ¿Qué tipos de servicios puedo ofrecer como trabajador en Microservices?
                            </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Puedes ofrecer una amplia variedad de servicios, que van desde reparaciones técnicas y mantenimiento del hogar hasta consultoría profesional y servicios creativos. Nuestra plataforma está diseñada para adaptarse a una amplia gama de habilidades y especialidades laborales.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                ¿Cómo puedo actualizar mi perfil y agregar nuevas habilidades?
                            </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Para actualizar tu perfil y agregar nuevas habilidades, simplemente inicia sesión en tu cuenta de "Microservices" y ve a la sección de Perfil. Desde allí, podrás editar la información existente y agregar cualquier habilidad adicional que desees destacar.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                ¿Cuál es el proceso de validación de habilidades y cómo puedo completarlo?
                            </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                El proceso de validación de habilidades es una evaluación realizada por nuestro equipo de talento humano para verificar tus habilidades y experiencia en tu área de trabajo. Una vez que te hayas registrado como trabajador, nuestro equipo se pondrá en contacto contigo para guiarte a través del proceso de validación, que puede incluir pruebas prácticas, revisiones de trabajo anterior y entrevistas.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingSix">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                ¿Cómo puedo solicitar trabajos disponibles en Microservices?
                            </button>
                            </h2>
                            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Para solicitar trabajos disponibles, simplemente navega por las oportunidades de servicio en la plataforma y encuentra aquellas que se adapten a tus habilidades y disponibilidad. Haz clic en el botón de solicitud y sigue las instrucciones para enviar tu propuesta al usuario.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingSeven">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                ¿Cómo puedo contactar al equipo de soporte técnico si tengo algún problema o pregunta?
                            </button>
                            </h2>
                            <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Si necesitas ayuda adicional o tienes alguna pregunta, puedes contactar a nuestro equipo de soporte técnico a través del formulario de contacto en la sección de Soporte Técnico de nuestra página. Estaremos encantados de ayudarte con cualquier problema que puedas tener.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingEight">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                ¿Cómo puedo recibir pagos por los servicios prestados a través de Microservices?
                            </button>
                            </h2>
                            <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Los pagos por los servicios prestados a través de "Microservices" se procesan de manera segura utilizando nuestros métodos de pago integrados. Una vez que hayas completado un trabajo satisfactoriamente, recibirás el pago directamente en tu cuenta bancaria o a través de otros métodos de pago disponibles en la plataforma.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingNine">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                ¿Qué debo hacer si un cliente cancela una solicitud de servicio después de que ya la haya aceptado?
                            </button>
                            </h2>
                            <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Si un cliente cancela una solicitud de servicio después de que la hayas aceptado, te recomendamos comunicarte con el equipo de soporte técnico de "Microservices" para informarles sobre la situación. El equipo evaluará el caso y te proporcionará orientación sobre los próximos pasos a seguir.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTen">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                ¿Cómo puedo gestionar las revisiones y comentarios de los clientes sobre mi trabajo?
                            </button>
                            </h2>
                            <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Puedes gestionar las revisiones y comentarios de los clientes accediendo a tu panel de control y navegando a la sección de Revisiones o Comentarios. Desde allí, podrás ver las opiniones de los clientes, responder a sus comentarios y utilizar el feedback para mejorar tu servicio en el futuro.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingEleven">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                ¿Qué debo hacer si encuentro un problema técnico mientras uso la plataforma Microservices?
                            </button>
                            </h2>
                            <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Si experimentas algún problema técnico mientras usas la plataforma, te recomendamos primero intentar actualizar la página o reiniciar tu dispositivo. Si el problema persiste, ponte en contacto con el equipo de soporte técnico de Microservices a través del formulario de contacto en la sección de Soporte Técnico de nuestra página de Centro de Ayuda. Nuestro equipo estará encantado de ayudarte a resolver cualquier problema técnico que puedas encontrar.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwelve">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                ¿Cómo puedo mantener mi perfil actualizado con mi disponibilidad de trabajo?
                            </button>
                            </h2>
                            <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Puedes mantener tu perfil actualizado con tu disponibilidad de trabajo accediendo a la sección de Perfil en tu panel de control. Desde allí, podrás establecer tus horas de trabajo disponibles, días libres y cualquier otra información relevante sobre tu disponibilidad. Asegúrate de actualizar regularmente esta información para que los usuarios puedan ver cuándo estás disponible para realizar trabajos.
                            </div>
                            </div>
                        </div>
                </div>
                </div>
                <div id="columna2" className="col-3 mx-5 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Centro de Asistencia en Linea</h5>
                            <p className="card-text">En nuestro compromiso continuo de brindar un servicio excepcional a nuestros usuarios, estamos encantados de ofrecerte nuestro Centro de Asistencia en Línea, donde puedes obtener ayuda personalizada y resolver cualquier problema que puedas enfrentar mientras utilizas nuestra plataforma <strong>Microservices</strong>.</p>
                        </div>
                        <img src={image} className="card-img-top" alt="Fissure in Sandstone"/>
                        <a href="http://localhost:3100/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-mdb-ripple-init>Contacta a un asesor</a>
                    </div>
                    <h4></h4>

                </div>
            </div>
        </div>
    </div>
    </>);
}



