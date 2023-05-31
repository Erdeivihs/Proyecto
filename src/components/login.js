let access_token = ";"

import { loginUser } from "../services/users.js";

import '../assets/css/login.css';

export { Login }

class Login {

	constructor() { }

	renderLogin() {
		let div = document.querySelector("#principal");
		div.innerHTML = `
		
		<div class="login-box">
		<p>Login</p>
		<form>
		  <div class="user-box">
			<input required="" name="email" id="email" type="text">
			<label>Email</label>
		  </div>
		  <div class="user-box">
			<input required="" name="password" id="password" type="password">
			<label>Password</label>
		  </div>
		  <a id="login" href="#" >
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			Submit
		  </a>
		</form>
		<p>Don't have an account? <a href="#/registre" class="a2">Sign up!</a></p>
	  </div>
           `
	
		;

		//LOGIN SUPABASE

		document.querySelector("#login").addEventListener("click", async ()=>{
				let email = document.querySelector("#email").value;
				let password = document.querySelector("#password").value;

				loginUser(email,password).then(status =>{
					if (status.success) window.location.hash = '#/menu';
                    
					 else {
						let alertElement = document.createElement('div');
						alertElement.classList.add('custom-alert');
						
						// Agregar contenido al alert
						alertElement.innerHTML = 'Username or password invalid';
						
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