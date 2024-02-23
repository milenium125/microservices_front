import axios from 'axios';

export async function registrarUsuario(e) {
  console.log("actualizado");
  e.preventDefault();
  let nombre = document.getElementById("nombres").value;
  let apellido = document.getElementById("apellidos").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let email = document.getElementById("email").value;
  let documento = document.getElementById("documento").value;
  let tipo_documento = 1;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let repeat_password = document.getElementById("repeat-password").value;
  var idUser;
  let parametros = {
    "name": nombre,
    "lastname": apellido,
    "phonenumber": telefono,
    "address": direccion,
    "email": email,
    "dni": documento,
    "type_dni": tipo_documento
  }
  console.log(parametros);
  if (password === repeat_password) {
    // Realizar solicitud para crear un empleado
    const registro_cliente = await axios.post("http://localhost:3200/api/client/create", parametros, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      idUser = response.data._idUser;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error en la solicitud de creación de empleado:", error);
    });

    // Realizar solicitud para crear un usuario de inicio de sesión
    console.log("data")
    console.log(idUser)
    await axios.post("http://localhost:3200/api/login/create", {
      "username": username,
      "password": password,
      "id_persona": idUser
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error en la solicitud de creación de usuario de inicio de sesión:", error);
    });
  }
}

export async function registrarTrabajador(e) {
  console.log("crear trabajador");
  e.preventDefault();
  let nombre = document.getElementById("nombres").value;
  let apellido = document.getElementById("apellidos").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let email = document.getElementById("email").value;
  let documento = document.getElementById("documento").value;
  let tipo_documento = 1;
  let ocupacion = document.getElementById("ocupacion").value;
  let titulo = document.getElementById("titulo").value;
  let especialidad = document.getElementById("especialidad").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let repeat_password = document.getElementById("repeat-password").value;

  let parametros = {
    "name": nombre,
    "lastname": apellido,
    "phonenumber": telefono,
    "address": direccion,
    "email": email,
    "dni": documento,
    "type_dni": tipo_documento
  }
  console.log(parametros);
  // if (password === repeat_password) {
  //   // Realizar solicitud para crear un empleado
  //   await axios.post("http://localhost:3200/api/client/create", parametros, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error en la solicitud de creación de empleado:", error);
  //   });

  //   // Realizar solicitud para crear un usuario de inicio de sesión
  //   await axios.post("http://localhost:3200/api/login/create", {
  //     "username": username,
  //     "password": password,
  //     "id_persona": 28
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error en la solicitud de creación de usuario de inicio de sesión:", error);
  //   });
  // }
}



