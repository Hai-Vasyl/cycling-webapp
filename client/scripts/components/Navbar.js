import { getLinks } from "../datasets/links.js";
import NavLink from "./NavLink.js";
import NavButton from "./NavButton.js";

const Navbar = () => {
  const links = getLinks();

  const linksHTML = links.reduce((acumulator, link) => {
    if (link.isBtn) {
      acumulator += NavButton({ ...link, data: "toggle-auth" });
    } else {
      if (link.extraLinks?.length) {
        const extraLinks = link.extraLinks.reduce((extAcum, extLink) => {
          return extAcum + NavLink({ ...extLink }) 
        }, "")

        acumulator += `
          <div class="drop-menu">
            <div class="drop-menu__btn">${NavLink({ ...link })}</div>
            <div class="drop-menu__menu">
              <span class="drop-menu__triagle"></span>
              ${extraLinks}
            </div>
          </div>
        `;
      } else {
        acumulator += NavLink({ ...link });
      }
    }
    return acumulator;
  }, "");

  return `
        <div class="nav">
            <div class="nav__border" ></div>            
            <div class="wrapper nav__links">
                ${linksHTML}
                <a href="/" class="nav-logo" data-link>
                  <img class="nav-logo__img sealed"  src="/../../images/logo.svg"/>
                </a>
            </div>
        </div>
    `;
};

export default Navbar;
