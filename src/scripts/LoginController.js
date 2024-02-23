
import axios from 'axios';

export async function Login(e){
    e.preventDefault();
     let user = document.getElementById("user-login").value;
     let password = document.getElementById("pass-login").value;

     let parametros = {
        "username": user,
        "password": password
     }

    let results = await axios.post("http://localhost:3200/api/login/find/login",parametros,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(results.data);

   document.cookie = `id_sesion=${results.data.id_persona};`;
   window.location = "/profile";
}

export async function LoginTrabajador(e){
  e.preventDefault();
   let user = document.getElementById("user-worker").value;
   let password = document.getElementById("password-worker").value;

   let parametros = {
      "username": user,
      "password": password
   }

   try {
    let results = await axios.post("http://localhost:3200/api/login/find/login",parametros,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if(results.data.error == undefined){
      document.cookie = `id_sesion=${results.data.id_persona};`;
      window.location = "/perfil-trabajador";
    }
    console.log(results.data);
   } catch (error) {
    alert("usuario ó contraseña incorrectos");
   }
  
}
