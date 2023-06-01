import { getFiltro, getFileRequest, addGame, getButtonValue, añadir } from "../services/http.js";

import '../assets/css/details.css';

export { Edit };

async function Edit(params) {
    let access_token = localStorage.getItem("access_token");
    let game = await getFiltro('Games?id=eq.' + params, access_token);
    console.log(game[0].id);
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
          <input type="text" id="title" class="input-field" required/>
          <label class="input-label">Title</label>
        </div>

        <div class="input">
          <input type="textarea" id="descriptio" class="input-field" required/>
          <label class="input-label">Descriptio</label>
        </div>    
        
        <div class="select">
            <select id="genre" class="select-field" required>
              <option value="" selected disabled></option>
              <!-- Opciones del select -->
              <option value="Shooter" >Shooter</option>
              <option value="ARPG">ARPG</option>
              <option value="Strategy">Strategy</option>
              <option value="MMORPG" >MMORPG</option>
              <option value="Fighting" >Fighting</option>
              <option value="Battle Royale" >Battle Royale</option>
              <option value="MOBA" >MOBA</option>
              <option value="Card Game" >Card Game</option>
              <option value="Sports" >Sports</option>
              <option value="MMO" >MMO</option>
              <option value="Racing" >Racing</option>
              <option value="Fantasy" >Fantasy</option>
              <option value="Social" >Social</option>
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

            let title = document.querySelector("#title").value;
		    let descriptio = document.querySelector("#descriptio").value;
            let genre = document.querySelector("#genre").value;
        let update = await  añadir("Games?id=eq."+game[0].id,[{"title": title , "short_description": descriptio, "genre": genre}]).then(a=>{console.log(a);}); 
        console.log(update);
        window.location.hash = "#/admin";
    });
    
  
  }

  