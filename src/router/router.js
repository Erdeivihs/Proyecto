export { router };
import { Menu } from "../components/menu.js";
import { Login } from "../components/login.js";
import { Registre } from "../components/registre.js";
import { Game } from "../views/game.js";
import { Perfil } from "../views/perfil.js";
import { Details } from "../views/details.js";
import { List } from "../views/list.js";
import { Friend } from "../views/friend.js";
import { Admin } from "../views/admin.js";
import { Edit } from "../views/edit.js";
import { Add } from "../views/add.js";

const router = (route) => {
  
  const paramStartIndex = route.indexOf("(");
  const paramEndIndex = route.indexOf(")");
  let params = "";

  if (paramStartIndex !== -1 && paramEndIndex !== -1) {
    params = route.substring(paramStartIndex + 1, paramEndIndex);
  }

  const routeWithoutParams = paramStartIndex !== -1 ? route.substring(0, paramStartIndex) : route;

    switch (routeWithoutParams) {
      case "#/menu":
        let M = new Menu();
        M.rendermenu();
        break;
      case "#/login":
        console.log("login");
        let login = new Login();
        login.renderLogin();
        break;
      case "#/registre":
        let regsitro = new Registre();
        regsitro.renderRegistre();
        break;
      case "#/games":
        Game(params);
        break;
      case "#/perfil":
          Perfil();
          break;
      case "#/details":
        Details(params);
          break;
      case "#/list":
          List();
            break;
      case "#/friend":
            Friend(params);
              break;
      case "#/admin":
            Admin();
              break;
      case "#/edit":
            Edit(params);
              break;
      case "#/add":
          Add();
            break;
    }
  
};