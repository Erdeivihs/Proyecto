let access_token = ";"

import { registerUser } from "../services/users.js";

export { Registre }

class Registre {

	constructor() { }

	renderRegistre() {
		let div = document.querySelector("#principal");
		div.innerHTML = `
			
    <link rel="stylesheet" type="text/css" href="./assets/css/login.css"> 
		<div class="login-box">
		<p>Sign Up</p>
		<form>
    <div class="user-box">
			<input required="" name="username" id="username" type="text">
			<label>Username</label>
		  </div>
		  <div class="user-box">
			<input required="" name="signupemail" id="signupemail" type="text">
			<label>Email</label>
		  </div>
		  <div class="user-box">
			<input required="" name="signuppassword" id="signuppassword" type="password">
			<label>Password</label>
		  </div>
		  <a id="registrar" href="#" >
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			Submit
		  </a>
		</form>
		<p>I have an account <a href="#/login" class="a2">Login</a></p>
	  </div>`
	
		;

		//REGISTRE SUPABASE

		document.querySelector("#registrar").addEventListener("click", async ()=>{
			
            let email = document.querySelector('#signupemail').value;
            let password = document.querySelector('#signuppassword').value;
            let username = document.querySelector('#username').value;
            registerUser(email, password,username).then(status =>{
				if (status.success) window.location.hash = '#/login';
                    
					 else {
						let alertElement = document.createElement('div');
						alertElement.classList.add('custom-alert');
						
						// Agregar contenido al alert
						alertElement.innerHTML = 'Invalid parameters';
						
						// Agregar el alert al DOM
						document.body.appendChild(alertElement);
						
						// Remover el alert después de unos segundos (opcional)
						setTimeout(function() {
						  document.body.removeChild(alertElement);
						}, 3000);
					}
			})
            
    });

	}

	

}