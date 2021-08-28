const NavButton = ({ id, data, title = "", className = "" }) => {
    return `
      <button class="nav-link ${className}" ${id ? `id="btn-${id}"` : ""} ${
      data ? `data-btn-${data}` : ""
    } >
        ${title}
      </button>`;
  };
  
  export default NavButton;
  