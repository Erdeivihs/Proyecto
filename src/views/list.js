import { getFiltro, getFileRequest, deleteGame } from "../services/http.js";

export { List };

async function List() {
  let access_token = localStorage.getItem("access_token");
  let username = await getFiltro('profiles?select=*', access_token);
  console.log(username);
//   const idGamesList = filtroid.map(obj => obj.id_games);
//   let games = await getFiltro('Games?select=*&id=in.(' + idGamesList.join(',')+")", access_token)
  let divPrincipal = document.querySelector("#contenido");

  divPrincipal.innerHTML = `
  <head>
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400,600i&display=swap" rel="stylesheet">
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

  async function createCard(users) {
    
        let list = document.createElement("div");
    
        list.innerHTML = `
        <div class="center">
          <div id="watch" class="article-card">
            <div class="content">
              <p class="title">${users.username}</p>
            </div>
              <img id="image" />
          </div>
        </div>
        `;
    
    
        divPrincipal.querySelector("#container").append(list);

        list.querySelector("#watch").addEventListener("click", function () {
            console.log(users.id);
            console.log(localStorage.getItem("id"));
            if (users.id == localStorage.getItem("id")) {
                console.log("A");
                window.location.hash = `#/perfil`;
            }else{
                window.location.hash = `#/friend(${users.id})`;
            }
            
          });
      
  }

  function renderGames() {
    divPrincipal.querySelector("#container").innerHTML = "";
    username.forEach(createCard);
  }

  renderGames();

 
  const searchInput = document.querySelector("#searchInput");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredGames = username.filter((user) =>
      user.username.toLowerCase().includes(searchTerm)
    );
    divPrincipal.querySelector("#container").innerHTML = "";
    filteredGames.forEach(createCard);
  });
}