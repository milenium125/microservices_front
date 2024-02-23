import React, { useState } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import "./styles.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
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
} from 'mdb-react-ui-kit';


export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <!-- Container wrapper --> */}
            <div className="container-fluid ">
                {/* <!-- Toggle button --> */}
                <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <i className="fas fa-bars"></i>
                </button>

                {/* <!-- Collapsible wrapper --> */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <!-- Navbar brand --> */}
                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                    MicroServices
                </a>
                {/* <!-- Left links --> */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-12">
                    <li className="nav-item me-3">
                    <a className="nav-link col-">Calle 12 #45-67, Barrio El Prado</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link px-5">Servicios</a>
                    </li>
                </ul>
                
                {/* <!-- Left links --> */}
                </div>
                {/* <!-- Collapsible wrapper --> */}
                <div className="input-group rounded px-5 w-75">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span className="input-group-text border-0" id="search-addon">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                
                {/* <!-- Right elements --> */}
                <div className="d-flex align-items-center">
                {/* <!-- Icon --> */}
                <a className="text-reset me-3" href="#">
                    <i className="fas fa-shopping-cart"></i>
                </a>

                {/* <!-- Notifications --> */}
                <div className="dropdown">
                <MDBDropdown>
                    <MDBDropdownToggle className='hidden-arrow p-1 bg-transparent shadow-0 notifications align-items-center '>
                        <i className="fas fa-bell me-3 text-reset" ></i>
                        <span className="badge rounded-pill badge-notification bg-danger">1</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link childTag='button'>
                        No hay notificaciones
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                    <a
                    className="text-reset me-3 dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    >
                    
                    </a>
                    <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                    >
                        
                    <li>
                        <a className="dropdown-item" href="#">Some news</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Another news</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                    </ul>
                </div>
                {/* <!-- Avatar --> */}
                <MDBDropdown>
                    <MDBDropdownToggle className='bg-transparent shadow-0 px-1'><img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle"
                        height="25"
                        alt="Black and White Portrait of a Man"
                        loading="lazy"
                    />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link childTag='button'>
                            <Link to="/profile" target="_self">Mi cuenta</Link>
                        
                        </MDBDropdownItem>
                        <MDBDropdownItem link childTag='button'>
                            <Link to="/" target="_self">Salir</Link>
                        </MDBDropdownItem>
                        
                    </MDBDropdownMenu>
                </MDBDropdown>
                
                </div>
                {/* <!-- Right elements --> */}
            </div>
            {/* <!-- Container wrapper --> */}
            </nav>
    </>
  );
}