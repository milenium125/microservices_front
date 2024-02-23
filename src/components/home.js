import "./styles.css";

import React, { useState } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import {
    MDBInput,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';


  import img1 from './assets/img/portfolio/fullsize/1.jpg';
  import img2 from "./assets/img/portfolio/fullsize/2.jpg";
  import img3 from "./assets/img/portfolio/fullsize/3.jpg";
  import img4 from "./assets/img/portfolio/fullsize/4.jpg";
  import img5 from "./assets/img/portfolio/fullsize/5.jpg";
  import img6 from "./assets/img/portfolio/fullsize/6.jpg";

  
  const {registrarUsuario} = require("../scripts/UserController");
  const {Login} = require("../scripts/LoginController");
function Home() {

    const [showModal, setShowModal] = useState(false);
    const changeShowModal = () => setShowModal(!showModal);

    const [classLogin, setClassLogin] = useState("show active");
    const [classRegister, setClassRegister] = useState("");
    const [classBtnLogin, setClassBtnLogin] = useState("active");
    const [classBtnRegister, setClassBtnRegister] = useState("");
    const [classAlertSuccess, setClassAlertSuccess] = useState("d-none");

    /*Clase para ocultar y mostrar el formulario de registro en alternancia con el de login */
    const updateClassRegister = () => {
        setClassBtnRegister("active");
        setClassBtnLogin("")
        setClassRegister("show active");
        setClassLogin("");
    };
    
    /*Clase para ocultar y mostrar el formulario de login en alternancia con el de registro */
    const updateClassLogin = () => {
        setClassBtnRegister("");
        setClassBtnLogin("active")
        setClassLogin("show active");
        setClassRegister("");
        setClassAlertSuccess("d-none");
    };

    /*Clase para mostrar el mensaje de cuenta creada del formulario de registro */
    const updateClassAlertSuccess = () => {
        if(classAlertSuccess == "d-none"){
            setClassAlertSuccess("d-block");
        }else{
            setClassAlertSuccess("d-none");
        }


    };

    /*Clase para ocultar y mostrar el modal con los formularios de registro y login, se muestran al dar click en Registro o Iniciar sesion en la Landing Page */
    function modalClose(e){
        const formModal = document.getElementById("contentModal").contains(e.target)
        if(!formModal){
            changeShowModal();
        }
    }

    return (
        <>
                {/*<!-- Navigation-->*/}
            
                <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                    <div className="container px-4 px-lg-5">
                        <a className="navbar-brand" href="#page-top">MicroServices</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto my-2 my-lg-0">
                                <li className="nav-item"><a className="nav-link pt-2" href="#about">Nosotros</a></li>
                                <li className="nav-item"><a className="nav-link pt-2" href="#services">Servicios</a></li>
                                <li className="nav-item"><a className="nav-link pt-2" href="#contact">Contactenos</a></li>
                                <li className="nav-item"><Link className="nav-link pt-2" to="/trabaja-con-nosotros">Trabaja con Nosotros</Link></li>
                                <li className="nav-item px-2"><MDBBtn outline color='light' href="#pills-register" onClick={() =>{changeShowModal(); updateClassRegister();}}>
                                Registrarse
                                </MDBBtn></li>
                                <li className="nav-item px-2"><li className="nav-item px-2"><MDBBtn rippleColor='dark' href="#pills-login" color='light' onClick={() =>{changeShowModal(); updateClassLogin();}}>Iniciar Sesión</MDBBtn></li></li>             
                            </ul>
                
                        </div>
                    </div>
                </nav>
                <MDBModal show={showModal}  tabIndex='-1' onClick={modalClose} className="modal-lg">
                {/*<!-- Modal login-->*/}
                {/* <!-- Pills navs --> */}
                <MDBModalDialog className="modal-dialog">
                    <MDBModalContent className="px-5" id="contentModal">    
                    <div className="bg-primary decoracion"></div>                      
            <           MDBModalHeader className="justify-content-center">                          
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
                                
                                <form onSubmit={Login}>
                                
                                <h2 className="text-center my-4 razon-social">MicroServices</h2>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Username' className="icon-placeholder" id='user-login' type='text'required placeholder="  Username"/>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Password' className="icon-placeholder" id='pass-login' type='text'required placeholder="  Password"/>                                 
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

                                {/* <!-- Submit button --> to="/profile"*/}
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
                                <div className={classAlertSuccess}><p className="alert alert-success"><i className="fas fa-check-circle me-3"></i>Te has Registrado exitosamente! Verifica tu correo electronico e <a>Inicia Sesión</a></p></div>
                                <h2 className="text-center my-4 razon-social">MicroServices</h2>
                                <form onSubmit={registrarUsuario}>
                                {/* <!-- Name input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Nombres' className="icon-placeholder" id='nombres' type='text'required placeholder="  Nombres"/> 
                                </div>
                                {/* <!-- Lastname input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Apellidos' className="icon-placeholder" id='apellidos' type='text'required placeholder="  Apellidos"/> 
                                    
                                </div>
                                {/* <!-- Telephone number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Telefono' className="icon-placeholder" id='telefono' type='text'required placeholder="  Telefono"/>
                                </div>
                                {/* <!-- Address number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Direccion' className="icon-placeholder" id='direccion' type='text'required placeholder="  Direccion"/>                                   
                                </div>
                                {/* <!-- Document number input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Documento' className="icon-placeholder" id='documento' type='text'required placeholder="  Documento"/>                                     
                                </div>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Email' className="icon-placeholder" id='email' type='email'required placeholder="  Email"/>  
                                </div>

                                {/* <!-- Username input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Username' className="icon-placeholder" id='username' type='text'required placeholder="  Username"/>  
                                </div>                           

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Password' className="icon-placeholder" id='password' type='password'required placeholder="  Password"/>  
                                </div>

                                {/* <!-- Repeat Password input --> */}
                                <div className="form-outline mb-4">
                                    <MDBInput label='Repeat Password' className="icon-placeholder" id='repeat-password' type='password'required placeholder="  Repeat Password"/>  
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
                                    <button className="btn btn-primary btn-block mb-3"  type="submit" onSubmit={() => {updateClassAlertSuccess(); registrarUsuario()}}>Registrarse</button>
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
                </ MDBModalDialog>
                </MDBModal>


                {/*<!-- Masthead-->*/}
                <header className="masthead">
                    <div className="container px-4 px-lg-5 h-100">
                        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                            <div className="col-lg-8 align-self-end">
                                <h1 className="text-white font-weight-bold">Soluciones Outsourcing para Impulsar tu Empresa</h1>
                                <hr className="divider" />
                            </div>
                            <div className="col-lg-8 align-self-baseline">
                                <p className="text-white-75 mb-5">Descubre MicroServices: ¡la solución perfecta para tu negocio! Simplifica, maximiza y acelera con nosotros. ¡Únete a la revolución hoy!</p>
                                <a className="btn btn-primary btn-xl" href="#about">Descubre</a>
                            </div>
                        </div>
                    </div>
                </header>
                
                {/*<!-- About-->*/}
                <section className="page-section bg-primary" id="about">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white mt-0">Potencia tu éxito con MicroServices</h2>
                                <hr className="divider divider-light" />
                                <p className="text-white-75 mb-4">Impulsa tu negocio al éxito con MicroServices. Optimiza operaciones, maximiza productividad y desata la innovación. Únete a la revolución empresarial ahora.</p>
                                <a className="btn btn-light btn-xl" href="#services">Solicita Asesoria</a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!-- Services-->*/}
                <section className="page-section" id="services">
                    <div className="container px-4 px-lg-5">
                        <h2 className="text-center mt-0">Elige Nuestros Servicios</h2>
                        <hr className="divider" />
                        <div className="row gx-4 gx-lg-5">
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Escalabilidad ilimitada</h3>
                                    <p className="text-muted mb-0">Tu negocio puede crecer sin restricciones gracias a nuestra solución.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Integración perfecta</h3>
                                    <p className="text-muted mb-0">Integra fácilmente nuestra plataforma con otros sistemas y aplicaciones.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Operación sin interrupciones</h3>
                                    <p className="text-muted mb-0">Mantén tu negocio en funcionamiento con resiliencia y tolerancia a fallos.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Desarrollo ágil y rápido</h3>
                                    <p className="text-muted mb-0">Entrega funcionalidades innovadoras de manera rápida y eficiente.</p>
                                </div>
                            </div>                   
                            </div>
                    </div>
                </section>
                {/*<!-- Portfolio-->*/}
                <div id="portfolio">
                    <div className="container-fluid p-0">
                        <div className="row g-0">
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="http://google.com" title="Project Name">
                                    <img className="img-fluid" src={img1} alt="..." />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Administrativos</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="assets/img/portfolio/fullsize/2.jpg" title="Project Name">
                                    <img className="img-fluid" src={img2} alt="..." />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Logistica</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="assets/img/portfolio/fullsize/3.jpg" title="Project Name">
                                    <img className="img-fluid" src={img3} alt="..." />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Limpieza y Aseo</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="assets/img/portfolio/fullsize/4.jpg" title="Project Name">
                                    <img className="img-fluid" src={img4} alt="..." />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Servicios Hogar</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="assets/img/portfolio/fullsize/5.jpg" title="Project Name">
                                    <img className="img-fluid" src={img5} alt="..." />
                                    <div className="portfolio-box-caption">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Operativos</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="assets/img/portfolio/fullsize/6.jpg" title="Project Name">
                                    <img className="img-fluid" src={img6} alt="..." />
                                    <div className="portfolio-box-caption p-3">
                                        <div className="project-category text-white-50">Servicios</div>
                                        <div className="project-name">Servicios TI</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Contact-->*/}
                <section className="page-section" id="contact">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6 text-center">
                                <h2 className="mt-0">Contactanos</h2>
                                <hr className="divider" />
                                <p className="text-muted mb-5">¡Contáctanos para obtener asistencia personalizada y descubrir cómo podemos ayudarte a alcanzar el éxito!</p>
                            </div>
                        </div>
                        <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                            <div className="col-lg-6">
                                {/*<!-- * * * * * * * * * * * * * * *-->
                                <!-- * * SB Forms Contact Form * *-->
                                <!-- * * * * * * * * * * * * * * *-->
                                <!-- This form is pre-integrated with SB Forms.-->
                                <!-- To make this form functional, sign up at-->
                                <!-- https://startbootstrap.com/solution/contact-forms-->
                                <!-- to get an API token!-->*/}
                                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                    {/*<!-- Name input-->
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                        <label for="name">Full name</label>
                                        <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                    </div>
                                    {/*<!-- Email address input-->*/}
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                        <label for="email">Email</label>
                                        <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                        <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                    </div>
                                    {/*<!-- Phone number input-->*/}
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                        <label for="phone">Telefono</label>
                                        <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                    </div>
                                    {/*<!-- Message input-->*/}
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: "10rem"}} data-sb-validations="required"></textarea>
                                        <label for="message">Mensaje</label>
                                        <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                    </div>
                                    {/*<!-- Submit success message-->
                                    <!---->
                                    <!-- This is what your users will see when the form-->
                                    <!-- has successfully submitted-->*/}
                                    <div className="d-none" id="submitSuccessMessage">
                                        <div className="text-center mb-3">
                                            <div className="fw-bolder">Formulario enviado exitosamente</div>
                                            To activate this form, sign up at
                                            <br />
                                            <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                        </div>
                                    </div>
                                    {/*<!-- Submit error message-->
                                    <!---->
                                    <!-- This is what your users will see when there is-->
                                    <!-- an error submitting the form-->*/}
                                    <div className="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Ocurrio un error enviando un mensaje</div></div>
                                    {/*<!-- Submit Button-->*/}
                                    <div className="d-grid"><button class="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Enviar</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-4 text-center mb-5 mb-lg-0">
                                <i className="bi-phone fs-2 mb-3 text-muted"></i>
                                <div>+57 (322) 4282 443</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!-- Footer-->*/}
                <footer className="bg-light py-5">
                    <div className="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2023 - Microservices S.A</div></div>
                </footer>
                {/*<!-- Bootstrap core JS-->*/}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
                {/*<!-- SimpleLightbox plugin JS-->*/}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js"></script>
                {/*<!-- Core theme JS-->*/}
                <script src="js/scripts.js"></script>
                {/*<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
                <!-- * *                               SB Forms JS                               * *-->
                <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
                <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->*/}
                <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
        </>
    )
}

export default Home;