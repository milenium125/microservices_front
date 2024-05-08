import React, { useState , useEffect} from 'react';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import axios from 'axios';
import { SideBar } from './Profile';

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

function mostrarContenidos(contenido){
    let div_contenido = document.getElementById("contenido");

    div_contenido.innerHTML = contenido;
}

export function AccountInformation() {
  const [foto_perfil, setFotoPerfil] = useState("");
    const [tipo_cliente, setTipoCliente] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [categoria_cliente, setCategoriaCliente] = useState("");
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result_client = await axios.get(`http://localhost:3200/api/client/find/user/${id_login}`);
        const result = await axios.get(`http://localhost:3200/api/client/find/${result_client.data._idClient}`);

        setFotoPerfil(result.data._pictureProfile);
        setTipoCliente(result.data._rolClient);
        setNombre(result.data._firstNameUser);
        setApellido(result.data._lastNameUser);

        if (result.data._rolClient === "Premium") {
          setCategoriaCliente("Pymes");
        } else if (result.data._rolClient === "Standard") {
          setCategoriaCliente("Hogar");
        }

        setLoading(false);
        mostrarContenidos(AccountInformation);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return (
    <>
    <SideBar
                foto={foto_perfil}
                tipo={tipo_cliente}
                nombre={nombre + " " + apellido}
                categoria={categoria_cliente}
              />
      <div>
        <h2 className="text-center">Información personal</h2>
        <div className="">
          <div className="card mb-4">
            <div className="card-body">
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Nombre</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Jose David Sanmiguel Guerrero</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Documento</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">1096784245</p>
                </div>
                <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">prueba1@gmail.com</p>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4">
                    <span className="text-primary font-italic me-1">Ordenes</span> En Curso
                  </p>
                  <MDBProgress>
                    <MDBProgressBar label="Limpieza de Instalaciones" value={80} />
                  </MDBProgress>
                  <MDBProgress>
                    <MDBProgressBar label="Mantenimiento Preventivo" value={72} />
                  </MDBProgress>
                  <MDBProgress>
                    <MDBProgressBar label="Adecuacion Zonas Verdes" value={89} />
                  </MDBProgress>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4">
                    <span className="text-primary font-italic me-1">Ordenes</span> Historial
                  </p>
                  <MDBProgress>
                    <MDBProgressBar label="Satisfaccion del Cliente" value={80} />
                  </MDBProgress>
                  <MDBProgress>
                    <MDBProgressBar label="Ordenes Ultimo Mes" value={72} />
                  </MDBProgress>
                  <MDBProgress>
                    <MDBProgressBar label="Puntuación Usuario" value={89} />
                  </MDBProgress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AccountInformationTrabajador(){
    return(
        <>
        <h2 className="text-center">Información personal</h2>
        <div className="">
                    <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Nombre Completo</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">Pedro Pablo Quintero Lozano</p>
                        </div>
                        </div>
                        <hr />
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Correo Electronico</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">example@example.com</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Celular</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">322 4282 443</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Direccion</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">Calle 14 #32-67, Barrio El Pino</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Documento</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">147258369-0</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Especialización</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">Construccion | Mamposteria</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Experiencia</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">6 meses</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Estado</p>
                        </div>
                        <div className="col-sm-2 btn btn-success">
                            <p className="text-muted mb-0">En proceso</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                            <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> En Curso
                            </p>
                            <p className="mb-1" style={{fontSize: .77+"rem"}}>Limpieza de Instalaciones</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 80+"%"}} aria-valuenow="80"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Mantenimiento Preventivo</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 72+"%"}} aria-valuenow="72"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Adecuacion Zonas Verdes</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 89+"%"}} aria-valuenow="89"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                            <p className="mb-4"><span className="text-primary font-italic me-1">Ordenes</span> Historial
                            </p>
                            <p className="mb-1" style={{fontSize: .77+"rem"}}>Satisfaccion del Cliente</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 80+"%"}} aria-valuenow="80"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Ordenes Ultimo Mes</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 72+"%"}} aria-valuenow="72"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p className="mt-4 mb-1" style={{fontSize: .77+"rem"}}>Puntuación Usuario</p>
                            <div className="progress rounded" style={{height: 5+"px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: 89+"%"}} aria-valuenow="89"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </>
    )
}

