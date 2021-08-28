import { getRoutes } from "./datasets/routes.js";
import { setParam } from "./context/main.js";
import { updateComponent } from "./helpers/updateComponent.js";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Modal from "./components/Modal.js"
import AuthForm from "./components/FormAuth.js";

import clickReducer from "./handlers/click.js";
import submitReducer from "./handlers/submit.js";

export const setPage = async () => {
  let route, param;
  const path = location.pathname;
  const routes = getRoutes();

  const locationParts = path.split("/");
  routes.forEach((item) => {
    const routeParts = item.path.split("/");
    if (routeParts.length === locationParts.length) {
      if (
        item.path === path ||
        (item.path.includes(":") &&
          routeParts.slice(0, -1).join("/") ===
            locationParts.slice(0, -1).join("/"))
      ) {
        param = locationParts[locationParts.length - 1];
        route = item;
      }
    }
  });

  if (!route) {
    route = routes[0];
  }
  if (param) {
    setParam(param);
  }

  const { page, title } = route;

  document.title = title;
  const pageRender = await page();

  updateComponent(document.getElementById("content"), pageRender);
};

export const render = async () => {
  const NavbarHTML = Navbar();
  const FooterHTML = Footer();
  const ModalHTML = Modal()
  const AuthFormHTML = AuthForm()

  const pageComplete = `
    ${NavbarHTML}
    ${ModalHTML}
    ${AuthFormHTML}
    <div class="bg" id="bg" >
        <span class="material-icons-outlined bg__btn-close sealed">
          close
        </span>
      </div>
    <div id="content"></div>
    ${FooterHTML}
  `;

  updateComponent(document.querySelector("#root"), pageComplete);
  await setPage();
};

export const moveTo = async (path) => {
  history.pushState(null, null, path);
  await setPage();
};

document.addEventListener("DOMContentLoaded", async () => {
  await render();

  document.body.addEventListener("click", clickReducer)
  document.body.addEventListener("submit", submitReducer)
});

window.addEventListener("popstate", setPage);
