const NavLink = ({ href = "", title = "" } = {}) => {
  return `
    <a href="${href}" class="nav-link ${
      href === location.pathname ? "nav-link--active" : ""
     }" data-link>
        ${title}
    </a>
    `;
};

export default NavLink;
