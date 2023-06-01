import { getFiltro, getFileRequest, addGame, getButtonValue } from "../services/http.js";

import '../assets/css/cards.css';
import '../assets/css/search.css';
import '../assets/css/botones.css';
import '../assets/css/perfil.css';
import '../assets/css/amigos.css';

export { Friend };

async function Friend(params) {
  let access_token = localStorage.getItem("access_token");
  let filtroid = await getFiltro('User_games?select=*&id_profiles=eq.' + params, access_token);
  console.log(params);
  let user = await getFiltro('profiles?id=eq.' + params, access_token);
  console.log(user);
  console.log(filtroid);
  const idGamesList = filtroid.map(obj => obj.id_games);
  let games = await getFiltro('Games?select=*&id=in.(' + idGamesList.join(',')+")", access_token)
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/search.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/botones.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/perfil.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/amigos.css"> 
  <head>
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400,600i&display=swap" rel="stylesheet">
</head>
<div class="infocardContainer">
  <div id="main">
    <img id="image" src="./assets/img/perfil.png"></img>
  </div>
  <div id="textbois">
    
    <h2>${user[0].username}</h2>
  
  </div>
</div>

<div class="medio">
<div class="input-container">
  <input id="searchInput" type="text" name="text" class="input" placeholder="search...">
  <span class="icon"> 
    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </span>
</div>
<button id="addFriends" class="fancy" href="#">
  <span class="top-key"></span>
  <span id="text" class="text">Add friends</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
</button>
</div>



  <div class="container card-group" id="container">
  </div>

 
  `;

  async function createCard(game) {
    filtroid.forEach( async (joc) =>{
      if (joc.id_games === game.id) {
        console.log(joc);

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
              <div id="edit" class="article-card">
                <div class="content">
                  <p class="title">${game.title}</p>
                </div>
                  <img  src="${await getCaratula(game)}" />
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Hours played: ${joc.hores}h</li>
              <li class="list-group-item">Note set: ${joc.nota}#</li>
              <li class="list-group-item">Game status: ${joc.estat}</li>
            </ul>
    
        `;
    
    
        divPrincipal.querySelector("#container").append(card);

      }
    })
    
      
  }

  const button = divPrincipal.querySelector("#addFriends");
  const text = divPrincipal.querySelector("#text");
  getButtonValue("Friends?id_friends=eq."+user[0].id+"&id_profiles=eq."+localStorage.getItem("id"), access_token)
  .then((result) => {
  console.log(result);
  const buttonFriend = result[0]?.id_friends;
  const buttonProfile = result[0]?.id_profiles;

  console.log(buttonFriend);
  
  if (buttonFriend == user[0].id & buttonProfile == localStorage.getItem("id")) {
    button.style.pointerEvents = 'none';
    text.textContent = "Added Friend";
  }
})

  divPrincipal.querySelector("#addFriends").addEventListener("click", function () {
    addGame("Friends", [{"id_friends": user[0].id , "name_friend": user[0].username , "id_profiles": localStorage.getItem("id")}], localStorage.getItem("access_token"));
    console.log(this);
    button.style.pointerEvents = 'none';
    text.textContent = "Added Friend";
  });



  function renderGames() {
    divPrincipal.querySelector("#container").innerHTML = "";
    games.forEach(createCard);
  }

  

  renderGames();

 
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