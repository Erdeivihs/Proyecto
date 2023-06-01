import { getFiltro, getFileRequest, deleteGame } from "../services/http.js";

import '../assets/css/table.css';

export { Admin };

async function Admin() {
  let access_token = localStorage.getItem("access_token");
  let games = await getFiltro('Games?select=*', access_token);
  console.log(games);
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
    <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
    <link rel="stylesheet" type="text/css" href="./assets/css/search.css"> 
    <link rel="stylesheet" type="text/css" href="./assets/css/botones.css">
    <div class="medio">
    <div class="input-container">
      <input id="searchInput" type="text" name="text" class="input" placeholder="search...">
      <span class="icon"> 
        <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </span>
    </div>
    </div>
    <div class="contenedor card-group" id="contenedor">
    </div>
    <table>
  <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Genre</th>
    <th>Accions</th>
  </tr>
  <tbody id="gameTableBody"></tbody>
  
</table>
    
  `;

  async function createCard(game) {

    let card = document.createElement("tr");

    
    

    card.innerHTML = `
    
    <td>${game.title}</td>
    <td>${game.short_description}</td>
    <td>${game.genre}</td>
    <td><i data-gameid="${game.id}" id="edit" class="bi bi-pencil-square"></i><i data-gameid="${game.id}" id="delete" class="bi bi-trash-fill"></i></td>
    
    `;

    const table = divPrincipal.querySelector("table");
    const tbody = table.querySelector("tbody");
    tbody.appendChild(card);
   
    divPrincipal.querySelector("#gameTableBody").append(card);

    card.querySelector("#delete").addEventListener("click", function () {
        let gameid = this.getAttribute("data-gameid");
        deleteGame("Games?id=eq."+gameid, localStorage.getItem("access_token"));
        Admin();
      });

  }

  

  function renderGames() {
    divPrincipal.querySelector("#contenedor").innerHTML = "";
    games.forEach(createCard);
  }

  renderGames();

  // Buscador reactivo
  const searchInput = document.querySelector("#searchInput");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm)
    );
    divPrincipal.querySelector("#gameTableBody").innerHTML = "";
    filteredGames.forEach(createCard);
  });
}