// import AuthForm from "../components/AuthForm.js";
// import UpdateUserAvaForm from "../components/UpdateUserAvaForm.js";
export const genHandler = (match, handler) => ({
  match, handler
})

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

// export const openAuthModal = () => {
//   const form = AuthForm();
//   openModal({ body: form, className: "modal__form-auth" });
// };

// export const closeAuthModal = () => {
//   closeModal({ className: "modal__form-auth" });
// };

// export const openUserAvaUpdateModal = () => {
//   const form = UpdateUserAvaForm();
//   openModal({ body: form, className: "modal__form-auth" });
// };
