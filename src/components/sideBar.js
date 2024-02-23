



function sideBar(){
    return(
                <>
                     {/* sidebar profile*/}
                     <div>
                                <div className="card mb-4">
                                <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="rounded-circle mb-3" style={{width: 150+"px"}} alt="Avatar" />
                                <h5 className="mb-2"><strong>Usuario Prueba</strong></h5>
                                <p className="text-muted">Pymes <span className="badge bg-primary">Preferencial</span></p>
                                    <p className="text-muted mb-4">Bucaramanga, Santander</p>
                                    <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">Editar</button>
                                    <button type="button" className="btn btn-outline-primary ms-1">Configuracion</button>
                                    </div>
                                </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-user-tie"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => setContentAccount(AccountInformation)}>Informacion de la cuenta</a>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-list-check"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}} onClick={() => setContentAccount(orders)}>Historial Servicios</a>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                    <i className="bi bi-plus-square-fill"></i>
                                        <Link to="/findServices" className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Solicitar servicio</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-bell"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Notificaciones</a>
                                    </li>
                                                
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-credit-card"></i>
                                        <a className="mx-5 mb-0 text-decoration-none" style={{cursor: "pointer"}}>Medios de pago</a>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                        </div>
                </>
            )
}
