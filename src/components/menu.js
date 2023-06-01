import { logout } from "../services/users.js";

import '../assets/css/menu.css';

export { Menu };

class Menu {
  constructor() {}



  rendermenu() {
    let admin = localStorage.getItem("admin");
    let div = document.querySelector("#principal");
    if (admin) {
      div.innerHTML = `
      <link rel="stylesheet" type="text/css" href="./assets/css/menu.css"> 
      <body>
          <header class="header">
              <div class="logo">
                  <a class="titulo" href="#/menu">Gamen't</a>
              </div>
              <nav>
                 <ul class="nav-links">
                      <li><a href="#/games(Shooter)">Shooter</a></li>
                      <li><a href="#/games(ARPG)">ARPG</a></li>
                      <li><a href="#/games(Strategy)">Strategy</a></li>
                      <li><a href="#/games(MMORPG)">MMORPG</a></li>
                      <li><a href="#/games(Fighting)">Fighting</a></li>
                      <li><a href="#/games(Battle Royale)">Battle Royale</a></li>
                      <li><a href="#/games(MOBA)">MOBA</a></li>
                      <li><a href="#/games(Card Game)">Card Game</a></li>
                      <li><a href="#/games(Sports)">Sports</a></li>
                      <li><a href="#/games(MMO)">MMO</a></li>
                      <li><a href="#/games(Racing)">Racing</a></li>
                      <li><a href="#/games(Fantasy)">Fantasy</a></li>
                      <li><a href="#/games(Social)">Social</a></li>
                      <li><a href="#/admin">Admin</a></li>
                 </ul>            
              </nav>
              <a class="btn" href="#/perfil"><button>Perfil</button></a>
              <a id="logout" class="btn" href="#"><button>LogOut</button></a>
          </header>
          <div id="contenido"></div>
      </body>
  
    <div id="contenido"></div>
      `;
    }else{
      div.innerHTML = `
      <link rel="stylesheet" type="text/css" href="./assets/css/menu.css"> 
      <body>
          <header class="header">
              <div class="logo">
                  <a class="titulo" href="#/menu">Gamen't</a>
              </div>
              <nav>
                 <ul class="nav-links">
                      <li><a href="#/games(Shooter)">Shooter</a></li>
                      <li><a href="#/games(ARPG)">ARPG</a></li>
                      <li><a href="#/games(Strategy)">Strategy</a></li>
                      <li><a href="#/games(MMORPG)">MMORPG</a></li>
                      <li><a href="#/games(Fighting)">Fighting</a></li>
                      <li><a href="#/games(Battle Royale)">Battle Royale</a></li>
                      <li><a href="#/games(MOBA)">MOBA</a></li>
                      <li><a href="#/games(Card Game)">Card Game</a></li>
                      <li><a href="#/games(Sports)">Sports</a></li>
                      <li><a href="#/games(MMO)">MMO</a></li>
                      <li><a href="#/games(Racing)">Racing</a></li>
                      <li><a href="#/games(Fantasy)">Fantasy</a></li>
                      <li><a href="#/games(Social)">Social</a></li>
                 </ul>            
              </nav>
              <a class="btn" href="#/perfil"><button>Perfil</button></a>
              <a id="logout" class="btn" href="#"><button>LogOut</button></a>
          </header>
          <div id="contenido"></div>
      </body>
  
    <div id="contenido"></div>
      `;
    }
    

        document.querySelector("#logout").addEventListener("click", logout);
  }
}

