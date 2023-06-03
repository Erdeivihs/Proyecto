import { getFiltro, fileRequest, addGame, getButtonValue, añadir } from "../services/http.js";

import '../assets/css/details.css';

export { Add };

async function Add() {
    let access_token = localStorage.getItem("access_token");
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/details.css"> 
  <div class="container">
	<!-- code here -->
	<div class="card">
	
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
        
        <div>
        <br>
        <label class="input-label">IMAGE</label>
        <br>
          <input type="file" id="img" required/>
          <br>
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
				<button type="submit" id="add" class="action-button">Add</button>
			</div>

      </form>
      
		
	</div>
</div>

  `;


    divPrincipal.querySelector("#add").addEventListener("click", async function () {

            let title = document.querySelector("#title").value;
		    let descriptio = document.querySelector("#descriptio").value;
            let genre = document.querySelector("#genre").value;
            let img = document.querySelector("#img");
            let imgFile = img.files[0];
            console.log(imgFile);

            let fileName = imgFile.name;
            let formImg = new FormData();
            formImg.append("avatar",imgFile,fileName);
            console.log(formImg);
            addGame("Games", [{"title": title , "short_description": descriptio ,  "genre": genre,"thumbnail": `https://tkhklsxccymulumxkaoy.supabase.co/storage/v1/object/public/avatars/${fileName}`}], access_token)
            await fileRequest(`/storage/v1/object/avatars/${fileName}`, formImg, access_token) 
            await getFiltro('Games?select=*', access_token);
        window.location.hash = "#/admin";
    });
    
  
  }

  