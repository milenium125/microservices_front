import "../styles.css";

import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { LoginTrabajador } from "../../scripts/LoginController";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBInput,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import axios from "axios";

export default function TrabajaConNosotros(){

    const [objetoRegistro, setObjetoRegistro] = useState({});

    const [showModal, setShowModal] = useState(false);
    const changeShowModal = () => setShowModal(!showModal);

    const [classLogin, setClassLogin] = useState("show active");
    const [classRegister, setClassRegister] = useState("");
    const [classDocumentos, setClassDocumentos] = useState("d-none");
    const [classBtns, setClassBtns] = useState("d-block");
    const [classBtnLogin, setClassBtnLogin] = useState("active");
    const [classBtnRegister, setClassBtnRegister] = useState("");
    const [classAlertSuccess, setClassAlertSuccess] = useState("d-none");

    const continuarRegistro = () => {
        const nombre_trabajador = document.getElementById("nombre-trabajador");
        const apellido_trabajador = document.getElementById("apellido-trabajador");
        const direccion_trabajador = document.getElementById("direccion-trabajador");
        const email_trabajador = document.getElementById("email-trabajador");
        const telefono_trabajador = document.getElementById("telefono-trabajador");
        const ocupacion_trabajador = document.getElementById("ocupacion-trabajador");
        const documento_trabajador = document.getElementById("documento-trabajador");
        const titulo_trabajador = document.getElementById("titulo-trabajador");
        const especialidad_trabajador = document.getElementById("especialidad-trabajador");
        const user_trabajador = document.getElementById("user-trabajador");
        const password_trabajador = document.getElementById("password-trabajador");

        objetoRegistro.nombre = nombre_trabajador.value;
        objetoRegistro.apellido = apellido_trabajador.value;
        objetoRegistro.direccion = direccion_trabajador.value;
        objetoRegistro.email = email_trabajador.value;
        objetoRegistro.telefono = telefono_trabajador.value;
        objetoRegistro.ocupacion = ocupacion_trabajador.value;
        objetoRegistro.documento = documento_trabajador.value;
        objetoRegistro.titulo = titulo_trabajador.value;
        objetoRegistro.especialidad = especialidad_trabajador.value;
        objetoRegistro.user = user_trabajador.value;
        objetoRegistro.password= password_trabajador.value;

        console.log(objetoRegistro);
    }    

    /*Clase para ocultar y mostrar el formulario de registro en alternancia con el de login */
    const updateClassRegister = () => {
        setClassBtnRegister("active");
        setClassBtnLogin("")
        setClassRegister("show active");
        setClassDocumentos("d-none");
        setClassBtns("d-block");
        setClassLogin("");
    };
    
    /*Clase para ocultar y mostrar el formulario de login en alternancia con el de registro */
    const updateClassLogin = () => {
        setClassBtnRegister("");
        setClassBtnLogin("active")
        setClassLogin("show active");
        setClassDocumentos("d-none");
        setClassBtns("d-block");
        setClassRegister("");
        setClassAlertSuccess("d-none");
    };

    const updateClassDocumentos = () => {
        setClassBtnRegister("");
        setClassBtnLogin("");
        setClassDocumentos("d-block");
        setClassLogin("d-none");
        setClassBtns("d-none");
        setClassRegister("d-none");
        setClassAlertSuccess("d-none");
    };

    /*Clase para mostrar el mensaje de cuenta creada del formulario de registro */
    const updateClassAlertSuccess = () => {
        if(classAlertSuccess === "d-none"){
            setClassAlertSuccess("d-block");
            setClassDocumentos("d-none");
        }else{
            setClassAlertSuccess("d-none");
        }

    };

    /*Clase para ocultar y mostrar el modal con los formularios de registro y login, se muestran al dar click en Registro o Iniciar sesion en la Landing Page */
    function modalClose(e){
        const formModal = document.getElementById("dialogModal").contains(e.target)
        if(!formModal){
            changeShowModal();
        }
    }

    async function enviarDatos(){
        const archivoInput1 = document.getElementById("cedula");
        const archivo1 = archivoInput1.files[0];

        const archivoInput2 = document.getElementById("diploma");
        const archivo2 = archivoInput2.files[0];

        // Crear una instancia de FormData
        const formData = new FormData();
        const formData2 = new FormData();
        
        // Agregar el archivo al FormData
        formData.append('cedula', archivo1);
        formData2.append('diploma', archivo2);

        const url = await axios.post('http://localhost:3200/subir/cedula',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
        const url2 = await axios.post('http://localhost:3200/subir/diploma',formData2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
        objetoRegistro.cedula = url.data;
        objetoRegistro.diploma = url2.data; 
        var experiencia = document.getElementById("experiencia");
        var elemento_seleccionado = experiencia.options[experiencia.selectedIndex].text ;

        objetoRegistro.experiencia = elemento_seleccionado; 
        console.log(objetoRegistro);
        console.log();
        let trabajador = {
            "name": objetoRegistro["nombre"],
            "lastname": objetoRegistro["apellido"],
            "email": objetoRegistro["email"],
            "phonenumber": objetoRegistro["telefono"],
            "dni": objetoRegistro["documento"],
            "address": objetoRegistro["direccion"],
            "especialidad": objetoRegistro["especialidad"],
            "ocupacion": objetoRegistro["ocupacion"],
            "titulo": objetoRegistro["titulo"],
            "cedula": objetoRegistro["cedula"],
            "diploma": objetoRegistro["diploma"],
            "experiencia": objetoRegistro["experiencia"]
        }

        const registro_trabajador = await axios.post("http://localhost:3200/api/trabajador/create",trabajador, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        
        var objeto_registro = {
            "username": objetoRegistro["user"],
            "password": objetoRegistro["password"],
            "id_persona": registro_trabajador.data._idUser
        };
        console.log(registro_trabajador);
        const registro_login_trabajador = await axios.post("http://localhost:3200/api/login/create", objeto_registro, {
            headers: {
            'Content-Type': 'application/json'
        }});

        
    }
    return(
        <>
        {/*<!-- Navigation-->*/}
                <MDBModal show={showModal}  tabIndex='-1' onClick={modalClose} className="modal-lg">
                {/*<!-- Modal login-->*/}
                {/* <!-- Pills navs --> */}
                <MDBModalDialog className="modal-dialog" id="dialogModal">
                    <MDBModalContent className={`px-5 ${classBtns}`} id="contentModal">    
                    <div className="bg-primary decoracion"></div>                      
                        <MDBModalHeader className={`justify-content-center`}>                          
                            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className={`nav-link ${classBtnLogin}`} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                    aria-controls="pills-login" aria-selected="true" onClick={updateClassLogin}>Login</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className={`nav-link ${classBtnRegister}`} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                                    aria-controls="pills-register" aria-selected="false" onClick={updateClassRegister}>Register</a>
                                </li>
                            </ul>
                        </MDBModalHeader>
                        <MDBModalBody className="justify-content-center px-5">
                {/* <!-- Pills navs --> */}
                            {/* <!-- Pills content --> */}
                            
                            <div className="tab-content">
                            <div className={`tab-pane fade ${classLogin}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                
                                <form onSubmit={LoginTrabajador}>
                                
                                <h2 className="text-center my-4 razon-social">MicroServices</h2>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Username' className="icon-placeholder" id='user-worker' type='text'required placeholder="  Username"/>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Password' className="icon-placeholder" id='password-worker' type='text'required placeholder="  Password"/>                                 
                                </div>
                                <div className="text-center mb-3">
                                    <p>Conectar con:</p>
                                    <button type="button" class="btn btn-link btn-floating mx-1 rounded-circle border">
                                    <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fab fa-google"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i class="fa-brands fa-linkedin-in"></i>
                                    </button>
                                </div>
                                {/* <!-- 2 column grid layout --> */}
                                <div className="row mb-4">
                                    <div className="col-md-6 d-flex justify-content-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-3 mb-md-0">
                                        <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                        <label className="form-check-label" for="loginCheck"> Remember me </label>
                                    </div>
                                    </div>

                                    <div className="col-md-6 d-flex justify-content-center">
                                    {/* <!-- Simple link --> */}
                                    <a href="#!">Forgot password?</a>
                                    </div>
                                </div>

                                {/* <!-- Submit button --> */}
                                <div className="d-flex justify-content-center">
                                    <button type="submit" target="_self" className="btn btn-primary btn-block mb-4">Sign in</button>
                                </div>

                                {/* <!-- Register buttons --> */}
                                <div className="text-center">
                                    <p>¿No estas registrado? <a href="#!">Registrarse</a></p>
                                </div>
                                </form>
                            </div>
                            <div className={`tab-pane fade ${classRegister}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                                
                                <h2 className="text-center my-4 razon-social">MicroServices</h2>
                                <form >
                                {/* <!-- Name input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Nombres' className="icon-placeholder" id='nombre-trabajador' type='text'required placeholder="  Nombres"/> 
                                </div>
                                {/* <!-- Lastname input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Apellidos' className="icon-placeholder" id='apellido-trabajador' type='text'required placeholder="  Apellidos"/> 
                                    
                                </div>
                                {/* <!-- Telephone number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Telefono' className="icon-placeholder" id='telefono-trabajador' type='text'required placeholder="  Telefono"/>
                                </div>
                                {/* <!-- Address number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Direccion' className="icon-placeholder" id='direccion-trabajador' type='text'required placeholder="  Direccion"/>                                   
                                </div>
                                {/* <!-- Document number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Documento' className="icon-placeholder" id='documento-trabajador' type='text'required placeholder="  Documento"/>                                     
                                </div>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Email' className="icon-placeholder" id='email-trabajador' type='email'required placeholder="  Email"/>  
                                </div>

                                {/* <!-- Ocupacion input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Ocupacion' className="icon-placeholder" id='ocupacion-trabajador' type='text'required placeholder="  Ocupacion"/>  
                                </div>     
                                
                                {/* <!-- Titulo input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Titulo Obtenido' className="icon-placeholder" id='titulo-trabajador' type='text'required placeholder="  Titulo Obtenido"/>  
                                </div>     

                                {/* <!-- Especialidad input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Especialidad' className="icon-placeholder" id='especialidad-trabajador' type='text'required placeholder=" Especialidad"/>  
                                </div>     
                                <hr className="my-5"/>
                                {/* <!-- Username input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Username' className="icon-placeholder" id='user-trabajador' type='text'required placeholder="  Username"/>  
                                </div>                 
     

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Password' className="icon-placeholder" id='password-trabajador' type='password'required placeholder="  Password"/>  
                                </div>

                                {/* <!-- Repeat Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Repeat Password' className="icon-placeholder" id='form1' type='password'required placeholder="  Repeat Password"/>  
                                </div>
                                
                                <div className="text-center mb-3">
                                    <p>Conectar con:</p>
                                    <button type="button" className="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fab fa-google"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1  rounded-circle border">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                    </button>
                                </div>
                                
                                {/* <!-- Checkbox --> */}
                                <div className="form-check d-flex justify-content-center mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                    aria-describedby="registerCheckHelpText" />
                                    <label className="form-check-label" for="registerCheck">
                                    He leido los Terminos y Condiciones.
                                    </label>
                                </div>

                                {/* <!-- Submit button --> */}
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary btn-block mb-3" onClick={() => {continuarRegistro(); updateClassDocumentos()}} >Continuar</button>
                                </div>
                                </form>
                            </div>
                            </div>
                            {/* <!-- Pills content --> */}
                            {/*<!-- fin Modal-->*/}
                        </MDBModalBody>
                        <MDBModalFooter className="justify-content-center">
                            <MDBBtn color='secondary' onClick={changeShowModal}>
                                Cerrar
                            </MDBBtn>
                        </MDBModalFooter>
                        
                    </MDBModalContent>
                    
                    <MDBModalContent className ={`px-5 ${classAlertSuccess}`} id="contentModal">    
                        <MDBModalBody className="justify-content-center px-5">
                            <div><p className="alert alert-success"><i className="fas fa-check-circle me-3"></i>Te has Registrado exitosamente! Verifica tu correo electronico e <a>Inicia Sesión</a></p></div>
                        </MDBModalBody>
                    </MDBModalContent>
                    <MDBModalContent className={`px-5 py-3 ${classDocumentos}`}  id="contentModal" >
                        <div>
                    <div className="bg-primary decoracion"></div> 
                        <h2 className="text-center my-4 razon-social">MicroServices</h2>                   
                        <MDBModalHeader className="justify-content-center d-flex flex-column ">                          
                            <h3 className="text-start ">Sube los Documentos</h3>
                            <MDBCard className="col-12 py-3 px-5 mx-4 my-3">
                            <MDBCardBody>
                            <MDBCardTitle  className="text-center">Información Laboral</MDBCardTitle>
                            {/* <MDBCardText>
                                <p>Area u ocupacion</p>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Electricidad' />
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckChecked' label='Construccion' defaultChecked />
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Plomeria' />
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Limpieza y aseo' />
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Mantenimiento y reparación' />
                                <div className="d-flex ">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='otros' className=""/>
                                    <MDBInput label='¿Cual?' className="icon-placeholder d-inline col-4" id='form1' type='text'  required />
                                </div>
                                
                                
                            </MDBCardText> */}
                            <hr/>
                            <MDBCardText>
                                <p>A continuación indique su experiencia laboral<br/> *Aplica experiencia formal e informal*</p>
                                <select class="form-select" id="experiencia">
                                    <option>De 0 a 6 meses de experiencia</option>
                                    <option>De 6 meses a 1 año de experiencia</option>
                                    <option>De 1 a 2 años de experiencia</option>
                                    <option>De 2 a 5 años de experiencia</option>
                                    <option>mas de 5 años experiencia</option>
                                </select>
                            <hr/>
                            </MDBCardText>
                            <MDBCardText>
                                <span className="my-3">Documento de identidad.</span>
                                <br/>
                                <label for="formFileMultiple" class="form-label">Foto Cedula (Anverso y Reverso)</label>
                                <input class="form-control" type="file" id="cedula" name="cedula" multiple />
                                <br/>
                                <hr />
                                <span className="my-3">Diploma Bachiller.</span>
                                <br/>
                                <label for="formFileMultiple" class="form-label">Sube tu Diploma de Bachiller</label>
                                <input class="form-control" type="file" id="diploma" name="diploma" multiple />
                                <br/>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBModalHeader>
                        <MDBModalFooter className="justify-content-center">
                            <MDBBtn color='primary' onClick={() =>{
                                enviarDatos();
                                updateClassAlertSuccess();
                                }}>
                                Terminar
                            </MDBBtn>
                            <MDBBtn color='secondary' onClick={changeShowModal}>
                                Cerrar
                            </MDBBtn>
                        </MDBModalFooter>
                        </div>
                    </MDBModalContent>
                </ MDBModalDialog>
                </MDBModal>
                
                <div className="d-flex flex-column">
                <nav className="navbar navbar-expand-lg navbar-light py-3  bg-dark" id="mainNav">
                    <div className="container px-4 px-lg-5 ">
                        <a className="navbar-brand text-light" href="#page-top">MicroServices</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto my-2 my-lg-0">
                                <li className="nav-item"><a className="nav-link pt-2 text-light" href="#about">Nosotros</a></li>
                                <li className="nav-item"><a className="nav-link pt-2 text-light" href="#contact">Contactenos</a></li>
                                <li className="nav-item"><Link className="nav-link pt-2 text-light" to="/trabaja-con-nosotros">Trabaja con Nosotros</Link></li>
                                <li className="nav-item px-2"><MDBBtn className="text-light" outline color='light' href="#pills-register" onClick={() =>{changeShowModal(); updateClassRegister();}}>
                                Registrarse
                                </MDBBtn></li>
                                <li className="nav-item px-2"><li className="nav-item px-2 text-light"><MDBBtn rippleColor='dark' href="#pills-login" color='light' onClick={() =>{changeShowModal(); updateClassLogin();}}>Iniciar Sesión</MDBBtn></li></li>             
                            </ul>
                
                        </div>
                    </div>
                </nav>
                <div className="d-flex flex-row">
                   <MDBCard className="col-2 p-3 ">

                     <MDBCardTitle className="ms-4">MicroServices</MDBCardTitle>
                     <MDBCardBody>
                        <MDBCardText>Registrate e inicia a trabajar en lo que te apasiona.
                            Postulate a las diferentes vacantes que tenemos para ti.
                            Demuestra tu potencial
                        </MDBCardText>
                    </MDBCardBody>
                    
                    </MDBCard>
                    <div className="p-3 ms-5 mt-4 col-8">
                        <h3>Trabaja con nosotros</h3>
                        <p className="mt-4">Si estas buscando empleo y tienenes conocimientos en alguna de las areas solicitadas, registrate y postulate para ser parte de este gran equipo de tecnicos</p>
                        <p className="mt-2">Recibe beneficios por ser parte de la familia MicroServices:</p>
                        <div className="d-flex flex-wrap mt-5">
                        <MDBCard className="col-5 py-3 px-5 mx-4 my-3 hover-overlay">
                            <MDBCardBody>
                            <MDBCardTitle className="text-center"><i class="fa-solid fa-clock"></i></MDBCardTitle>
                            <MDBCardTitle className="text-center">Manejo de horarios</MDBCardTitle>
                            <MDBCardText>Puedes gestionar tus horarios de trabajo, aunque recuerda que debes estar activo minimo 6 horas</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="col-5 py-3 px-5 mx-4 my-3">
                            <MDBCardBody>
                            <MDBCardTitle className="text-center"><i class="fa-solid fa-location-dot"></i></MDBCardTitle>
                            
                            <MDBCardTitle  className="text-center">Atiende Solicitudes cerca a tu ubicacion</MDBCardTitle>
                            <MDBCardText>Recibe las solicitudes que se encuentran cerca tuyo, a si ahorraras dinero y tiempo</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="col-5 py-3 px-5 mx-4 my-3">
                            <MDBCardBody>
                            <MDBCardTitle className="text-center"><i class="fa-solid fa-chalkboard-user"></i></MDBCardTitle>
                            <MDBCardTitle  className="text-center">Capacitacion constante</MDBCardTitle>
                            <MDBCardText>Recibe capacitación en habilidades tecnicas y en atencion al cliente, para que brindes un mejor servicio y seas competitivo.</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="col-5 py-3 px-5 mx-4 my-3">
                            <MDBCardBody>
                            <MDBCardTitle className="text-center"><i class="fa-regular fa-money-bill-1"></i></MDBCardTitle>
                            <MDBCardTitle className="text-center">Ingresos extra</MDBCardTitle>
                            <MDBCardText>Monetiza tu tiempo libre brindando un servicio tecnico de calidad, aumenta tus ingresos y cumple tus metas.</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        </div>
                    </div>
                </div>
                </div>
                
        </>
    );

}