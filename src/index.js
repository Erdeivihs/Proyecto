import { router } from "./router/router.js";
import { isLogged } from "./services/users.js";

(()=>{ 

    document.addEventListener("DOMContentLoaded", function () {
      console.log(isLogged());
      if (isLogged()) {
        window.location.hash = '#/menu';
        router(window.location.hash);
      }else{
        window.location.hash = '#/login';
        router(window.location.hash);
      }
        
      
      
    });

    window.addEventListener("hashchange", () => {
      router(window.location.hash);
    });
})();