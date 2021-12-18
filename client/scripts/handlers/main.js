import { setPage } from "../main.js";

export const genHandler = (match, handler) => ({
  match, handler
})

export const moveTo = async (path) => {
  history.pushState(null, null, path);
  await setPage();
};

export const openModal = ({ body }) => {
  const bg = document.getElementById("bg");
  const modal = document.getElementById("modal");
  modal.insertAdjacentHTML("afterbegin", body);
  modal.classList.add("modal--active");
  bg.classList.add("bg--active");
};

export const closeModal = () => {
  const bg = document.getElementById("bg");
  const modal = document.getElementById("modal");
  while (modal.firstChild) {
    modal.removeChild(modal.lastChild);
  }
  modal.classList.remove("modal--active");
  bg.classList.remove("bg--active");
};
