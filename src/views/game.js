import { getFiltro, getFileRequest, addGame, getButtonValue } from "../services/http.js";

export { Game };

async function Game(params) {
  let access_token = localStorage.getItem("access_token");
  let games = await getFiltro('Games?select=*&genre=eq.' + params, access_token);
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
    <div class="container card-group" id="container">
    </div>
  `;

  async function createCard(game) {
    async function getCaratula(game) {
      let img = game.thumbnail;
      game.image_blob = false;
      if (img) {
        let imageBlob = await getFileRequest(img, access_token);
        if (imageBlob instanceof Blob) {
          game.image_blob = URL.createObjectURL(imageBlob);
        }
      }
      return game.image_blob;
    }

    let card = document.createElement("div");

    
    

    card.innerHTML = `
        <div class="center">
          <div  class="article-card">
            <div class="content">
              <p class="title">${game.title}</p>
            </div>
              <img src="${await getCaratula(game)}" />
          </div>
        </div>
        <ul>
        <li>
        <button id="add" data-gameid="${game.id}" class="button-glitch">Add</button>
        </li>
        </ul>
    `;
   
    divPrincipal.querySelector("#container").append(card);

    const button = card.querySelector("#add");
    getButtonValue("User_games?id_games=eq."+game.id+"&id_profiles=eq."+localStorage.getItem("id"), access_token)
      .then((result) => {
        console.log(result);
        const buttonValue = result[0]?.id_games;
        
        if (buttonValue === game.id) {
          button.disabled = true;
          button.textContent = "Added";
        }
      })
      
      .catch((error) => {
        console.error("Error al obtener el valor del botón:", error);
      });
    
    card.querySelector("#add").addEventListener("click", function () {
      let gameid = this.getAttribute("data-gameid");
      addGame("User_games", [{"id_games": gameid , "id_profiles": localStorage.getItem("id"), "hores": "0", "estat": "Played", "nota": "0" }], localStorage.getItem("access_token"));
      console.log(this);
      this.disabled = true;
      button.textContent = "Added";
      
    });
  }

  

  function renderGames() {
    divPrincipal.querySelector("#container").innerHTML = "";
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
    divPrincipal.querySelector("#container").innerHTML = "";
    filteredGames.forEach(createCard);
  });
}