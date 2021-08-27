import { getRoutes } from "./datasets/routes.js";
import { setParam } from "./context/main.js";
import { updateComponent } from "./helpers/updateComponent.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

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

  const pageComplete = `
    ${NavbarHTML}
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
});

window.addEventListener("popstate", setPage);
