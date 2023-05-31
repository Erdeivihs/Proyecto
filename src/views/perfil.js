import { getFiltro, getFileRequest, deleteGame } from "../services/http.js";

import '../assets/css/acordeo.css';

export { Perfil };

async function Perfil() {
  let access_token = localStorage.getItem("access_token");
  let filtroid = await getFiltro('User_games?select=*&id_profiles=eq.' + localStorage.getItem("id"), access_token);
  const idGamesList = filtroid.map(obj => obj.id_games);
  let amigos = await getFiltro('Friends?select=*&id_profiles=eq.'+localStorage.getItem("id"), access_token);
  let games = await getFiltro('Games?select=*&id=in.(' + idGamesList.join(',')+")", access_token)
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <link rel="stylesheet" type="text/css" href="./assets/css/cards.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/search.css"> 
  <link rel="stylesheet" type="text/css" href="./assets/css/botones.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/perfil.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/amigos.css">
  <link rel="stylesheet" type="text/css" href="./assets/css/acordeo.css">  
  <head>
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400,600i&display=swap" rel="stylesheet">
</head>
<div class="infocardContainer">
  <div id="main">
    <img id="image" src="" alt="" srcset="">
  </div>
  <div id="textbois">
    

    <h2>${localStorage.getItem("username")}</h2>
    <h3>${localStorage.getItem("email")}</h3>
  
  </div>
</div>

<details>
  <summary>
    Friends
  </summary>
  <div class="cont">
  
  </div>
</details>

<div class="medio">
<div class="input-container">
  <input id="searchInput" type="text" name="text" class="input" placeholder="search...">
  <span class="icon"> 
    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </span>
</div>
<a class="fancy" href="#/list">
  <span class="top-key"></span>
  <span class="text">Add friends</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
 
</a>
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
            <ul>
            <li>
            <button id="add" data-gameid="${game.id}" class="button-glitch" role="button">Delete</button>
            </li>
            </ul>
    
        `;
    
    
        divPrincipal.querySelector("#container").append(card);
    
        card.querySelector("#edit").addEventListener("click", function () {
          window.location.hash = `#/details(${game.id})`;
        });
    
        card.querySelector("#add").addEventListener("click", function () {
            let gameid = this.getAttribute("data-gameid");
            deleteGame("User_games?id_games=eq."+gameid+"&id_profiles=eq."+localStorage.getItem("id"), localStorage.getItem("access_token"));
            Perfil();
          });

          

      }
    })
    
      
  }

  const divCont = divPrincipal.querySelector(".cont");

  amigos.forEach((name) => {
    const friendElement = document.createElement("a");
    friendElement.textContent = name.name_friend + "  ";
    friendElement.classList.add("chip");
    friendElement.id = 'nuevaId';
    friendElement.href = `#/friend(${name.id_friends})`;
  
    const iconElement = document.createElement("i");
    iconElement.classList.add("bi", "bi-x-circle-fill");
    iconElement.id = "deleteFriend";
    iconElement.setAttribute("data-gameid", name.id_friends);
    iconElement.style.zIndex = 10;
  
    iconElement.onclick = function () {
      let friendId = this.getAttribute("data-gameid");
      deleteGame("Friends?id_friends=eq." + friendId + "&id_profiles=eq." + localStorage.getItem("id"), localStorage.getItem("access_token"));
      Perfil();
    };
  
    friendElement.appendChild(iconElement);
    divCont.appendChild(friendElement);
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