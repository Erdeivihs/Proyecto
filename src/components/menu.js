import { logout } from "../services/users.js";

import '../assets/css/menu.css';
import '../assets/css/home.css';

export { Menu };

class Menu {
  constructor() {}



  rendermenu() {
    let admin = localStorage.getItem("admin");
    let div = document.querySelector("#principal");
    if (admin == "true") {
      div.innerHTML = `
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
          <div id="contenido">
          <div class= 'fondo'>
          <div class="container_content">
          <div class="container_content_inner">
          <div class="title">
            <h1>Gamen't</h1>
          </div>
          <div class="par">
          <p>
          This website has been made by a student of 2DAW, the site consists of a list of video games and management of them.
          </p>
          </div>
          </div>
          </div>
           <div class="container_outer_img">
            <div class="img-inner">
            <img alt="" class="container_img"/>
                 </div>
               </div>
            </div>
          <div class="overlay"></div>
          </div>
      </body>
      `;
    }
    

        document.querySelector("#logout").addEventListener("click", logout);
  }
}

