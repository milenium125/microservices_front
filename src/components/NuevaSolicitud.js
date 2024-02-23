
import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody

} from 'mdb-react-ui-kit';

export default function NuevaSolicitud(){



    return(
        <>
        <MDBCard alignment='center'>
        <MDBCardHeader>Carrito de Compras</MDBCardHeader>
        <MDBCardHeader className='text-end mb-4'>Agregar servicio</MDBCardHeader>
        <div className='d-flex align-items-center justify-content-center'>
            
            <MDBCardBody className='col-6 px-5 py-3'>
                
                <MDBCardTitle className='text-start'>Instalacion y/o reparacion de accesorios |  Electricidad X 1</MDBCardTitle>
                <MDBCardText className='text-start'>Instalacion y/o reparación de accsorios de electricidad domestica tales como tomacorrientes, interruptores, breaks y plafones.</MDBCardText>
                <div className='d-flex'>
                    <MDBCardText className='px-3'>Eliminar</MDBCardText>
                    <MDBCardText className='px-3'>Editar</MDBCardText>
                </div>
            </MDBCardBody>
            <div>
            <MDBCardText className='p-5'>X 1</MDBCardText>
            </div>
        </div>
        
        
        <hr/>
        <MDBCardHeader className='text-start'>Metodo de pago</MDBCardHeader>
        <div className='d-flex'>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>Efectivo</MDBCardTitle>
                <MDBCardText className='text-start'>Aplican condiciones de la operación</MDBCardText>

            </MDBCardBody>
            <MDBCardFooter className='text-muted p-5'>Cambiar</MDBCardFooter>
        </div>
        
        <hr/>

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
                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                alt=''
                                style={{ width: '45px', height: '45px' }}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>John Doe</p>
                                <p className='text-muted mb-0'>john.doe@gmail.com</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Tecnico en electricidad domestica</p>
                        </td>
                        </tr>
                        
                    </MDBTableBody>
                    </MDBTable>
                    <MDBCardFooter className='text-muted text-end mt-4'>Total : $15.000</MDBCardFooter>
                    <div className='d-flex justify-content-around py-5 px-2'>
                        <MDBBtn href='#'>Pagar</MDBBtn>
                        
                        <MDBBtn href='#'>Cancelar</MDBBtn>
                    </div>
                    
        </MDBCard>

        </>
    );
}