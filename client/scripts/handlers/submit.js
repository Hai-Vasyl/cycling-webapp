import { closeModal, genHandler } from "./main.js";
import fetchData from "../helpers/fetchData.js";
import { store, setUser } from "../context/main.js";

const submitFormAuth = async (event) => {
  event.preventDefault();
  const form = document.querySelector("#form-auth");
  const msgPassword = form.querySelector("#msg-password");
  const firstname = form.querySelector("#field-input-firstname").value;
  const lastname = form.querySelector("#field-input-lastname").value;
  const email = form.querySelector("#field-input-email").value;
  const password = form.querySelector("#field-input-password").value;
  const isLogin = form.classList.contains("login");

  const reduceMapErrors = (res) => {
    Object.keys(res.validationErros).forEach((key) => {
      const msgField = form.querySelector(`#msg-${key}`)
      msgField.textContent =
        res.validationErros[key].msg;
    });
  };

  try {
    if (isLogin) {
      const res = await fetchData({
        url: "/users/login",
        method: "POST",
        body: { email, password },
      });

      if ("validationErros" in res) {
        reduceMapErrors(res);
      } else {
        const user = await fetchData({
          url: "/users/get-user",
          headers: { token: res.token },
        });
        setUser(user);
        closeModal();
      }
    } else {
      const res = await fetchData({
        url: "/users/register",
        method: "POST",
        body: { firstname, lastname, email, password },
      });

      if ("validationErros" in res) {
        reduceMapErrors(res);
      } else {
        const user = await fetchData({
          url: "/users/get-user",
          headers: { token: res.token },
        });
        setUser(user);
        closeModal();
      }
    }
  } catch (error) {
    msgPassword.textContent = error.message;
  }
};

const submitReducer = (event) => {
  const handlers = [
    genHandler("#form-auth", () => submitFormAuth(event)),
    // genHandler('[data-btn-toggle-auth]', toggleAuthForm),
    // genHandler('#bg', closeModal),
    // genHandler('#btn-auth-flip', () => flipAuthForm(event)),
  ];

  let funcToHandle;
  handlers.forEach((item) => {
    if (event.target.matches(item.match)) {
      funcToHandle = item.handler;
    }
  });

  return funcToHandle();
};

export default submitReducer;
