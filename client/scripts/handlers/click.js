import { openModal, closeModal, genHandler } from "./main.js";
import FormAuth from "../components/FormAuth.js";

const toggleAuthForm = () => {
  const modal = document.querySelector("#modal");
  const formAuth = FormAuth();
  if (modal.classList.contains("modal--active")) {
    closeModal();
  } else {
    openModal({ body: formAuth });
  }
};

const flipAuthForm = (event) => {
  const form = document.getElementById("form-auth");
  const firstname = document.getElementById("field-firstname");
  const lastname = document.getElementById("field-lastname");
  const firstnameInput = firstname.querySelector("#field-input-firstname");
  const lastnameInput = lastname.querySelector("#field-input-lastname");
  const btnSubmit = document.getElementById("btn-auth-submit");
  const title = document.getElementById("title-auth");
  const errors = form.getElementsByClassName("field__msg");

  const isLogin = form.classList.contains("login");

  for (let err of errors) {
    err.textContent = "";
  }

  if (isLogin) {
    form.classList.remove("login");
    firstname.classList.remove("field__hidden");
    lastname.classList.remove("field__hidden");
    firstnameInput.required = true;
    lastnameInput.required = true;
    btnSubmit.textContent = "Sign Up";
    event.target.textContent = "Log In";
    title.textContent = "Create Account";
  } else {
    form.classList.add("login");
    firstname.classList.add("field__hidden");
    lastname.classList.add("field__hidden");
    firstnameInput.required = false;
    lastnameInput.required = false;
    btnSubmit.textContent = "Log In";
    event.target.textContent = "Sign Up";
    title.textContent = "Welcome Back!";
  }
};

const redirectToPage = (event) => {
  event.preventDefault();
  const links = document.getElementsByClassName("nav-link");
  for (let link of links) {
    if (link.href === event.target.href) {
      link.classList.add("nav-link--active");
    } else {
      link.classList.remove("nav-link--active");
    }
  }
  moveTo(event.target.href);
};

const clickReducer = async (event) => {
  const handlers = [
    genHandler('[data-link]', () => redirectToPage(event)),
    genHandler('[data-btn-toggle-auth]', toggleAuthForm),
    genHandler('#bg', closeModal),
    genHandler('#btn-auth-flip', () => flipAuthForm(event)),
  ]
  
  let funcToHandle
  handlers.forEach((item) => {
    if(event.target.matches(item.match)){
      funcToHandle = item.handler
    }
  });

  return funcToHandle && funcToHandle()
};

export default clickReducer
