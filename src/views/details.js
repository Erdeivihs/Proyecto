import { getFiltro, getFileRequest, addGame, getButtonValue, añadir } from "../services/http.js";

import '../assets/css/details.css';

export { Details };

async function Details(params) {
    let access_token = localStorage.getItem("access_token");
    let game = await getFiltro('Games?id=eq.' + params, access_token);
    console.log(game);
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/details.css"> 
  <div class="container">
	<!-- code here -->
	<div class="card">
		<div class="card-image" id="card-image">	
			<h2 class="card-heading">
				${game[0].title}
				
			</h2>
		</div>
    <form>
		<div class="card-form">
        <div class="input">
          <input type="number" id="hours" class="input-field" value="1" min="1" max="9999" pattern="[0-9]{1,4}" required/>
          <label class="input-label">Hours</label>
        </div>

        <div class="input">
          <input type="number" id="rank" class="input-field" value="1" min="1" max="10" pattern="[1-9]|10" required/>
          <label class="input-label">Rank</label>
        </div>
            <br>
            <div class="select">
            <select id="stat" class="select-field" required>
              <option value="" selected disabled></option>
              <!-- Opciones del select -->
              <option value="Played" >Played</option>
              <option value="Plan to play">Plan to play</option>
              <option value="Completed">Completed</option>
            </select>
            <label class="select-label">Select</label>
          </div>

          
          
			<div class="action">
				<button type="submit" id="edit" class="action-button">Edit</button>
			</div>

      </form>
      
		
	</div>
</div>

  `;

  let element = document.getElementById("card-image");
    element.style.backgroundImage = `url("${game[0].thumbnail}")`;

    divPrincipal.querySelector("#edit").addEventListener("click", async function (event) {
      event.preventDefault();
      let hoursInput = document.querySelector("#hours");
    let rankInput = document.querySelector("#rank");

    let horas = parseInt(hoursInput.value);
    let rango = parseInt(rankInput.value);

    if (isNaN(horas) || horas < 1 || horas > 9999) {
      alert("Please enter a valid value for hours (between 1 and 9999).");
      hoursInput.focus();
      return; 
    }

    if (isNaN(rango) || rango < 1 || rango > 10) {
      alert("Please enter a valid value for rank (between 1 and 10).");
      rankInput.focus();
      return; 
  }
        let filtro = await getFiltro('User_games?id_games=eq.' + game[0].id + "&id_profiles=eq."+ localStorage.getItem("id"), access_token);
        console.log(filtro);
            let hours = document.querySelector("#hours").value;
		    let rank = document.querySelector("#rank").value;
            let stat = document.querySelector("#stat").value;
        let update = await  añadir("User_games?id=eq."+filtro[0].id,[{"hores": hours , "nota": rank, "estat": stat}]).then(a=>{console.log(a);}); 
        console.log(update);
        window.location.hash = "#/perfil";
    });
    
  
  }

  