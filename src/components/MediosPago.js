import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox 
} from 'mdb-react-ui-kit';



function DatosTablaMedioPago(){
    return(
        
        <tr>
            <th scope='col'>
                <MDBCheckbox></MDBCheckbox>
            </th>
            <td>Tarjeta de credito</td>
            <td>**** **** **** 4875</td>
            <td>
                ver detalles
                <i class="fa-solid fa-trash ms-3"></i>
            </td>
        </tr>
        
    )
}

export default function MediosPago(){
    return(
        <>
            <h3>Medios de pago</h3>
            <div>
            <MDBCard className='col-4 mt-3'>
            <MDBCardBody>
                <MDBCardTitle>
                <i class="fa-solid fa-circle-plus me-4"></i>
                    Agregar Nuevo
                </MDBCardTitle>
                <MDBCardText>
                Click para agregar un nuevo medio de pago
                </MDBCardText>
            </MDBCardBody>
            </MDBCard>
            </div>

            <div>
            <MDBTable align='middle' className='mt-5'>
                <MDBTableHead light>
                    <tr>
                    <th scope='col'>
                        <MDBCheckbox></MDBCheckbox>
                    </th>
                    <th scope='col'>Metodo de pago</th>
                    <th scope='col'>Cuenta</th>
                    <th scope='col'>Acción</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <DatosTablaMedioPago />
                    <DatosTablaMedioPago />
                </MDBTableBody>
                </MDBTable>
            </div>
        </>
    )
};


