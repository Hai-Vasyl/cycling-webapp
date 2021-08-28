import { closeModal, genHandler } from "./main.js";

const submitFormAuth = (event) => {
  event.preventDefault();
  const form = document.querySelector("#form-auth");
  const msg = form.querySelector("#msg-password");
  const firstname = form.querySelector("#field-input-firstname").value;
  const lastname = form.querySelector("#field-input-lastname").value;
  const email = form.querySelector("#field-input-email").value;
  const password = form.querySelector("#field-input-password").value;
  const isLogin = form.classList.contains("login");

  try {
    if (isLogin) {
      // await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("LOGIN")
    } else {
      console.log("REGISTER")
      // const response = await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password);
      // const createUser = firebase.functions().httpsCallable("createUser");
      // await createUser({ uid: response.user.uid, firstname, lastname, email });
    }
    closeModal();
  } catch (error) {
    msg.textContent = error.message;
  }
}

const submitReducer = (event) => {
  const handlers = [
    genHandler('#form-auth', () => submitFormAuth(event)),
    // genHandler('[data-btn-toggle-auth]', toggleAuthForm),
    // genHandler('#bg', closeModal),
    // genHandler('#btn-auth-flip', () => flipAuthForm(event)),
  ]
  
  let funcToHandle
  handlers.forEach(item => {
    if(event.target.matches(item.match)){
      funcToHandle = item.handler
    }
  });

  return funcToHandle()
};

export default submitReducer
