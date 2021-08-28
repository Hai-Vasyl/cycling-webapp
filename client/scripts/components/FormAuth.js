import Field from "./Field.js";
import Button from "./Button.js";
import { btn } from "../configs/styles.js";

const AuthForm = () => {
  const form = [
    { id: "firstname", label: "First name", hidden: true },
    { id: "lastname", label: "Last name",  hidden: true },
    { id: "email", label: "Email", type: "email", required: true },
    { id: "password", label: "Password", type: "password", required: true },
  ];

  const fields = form.reduce(
    (acumulator, { id, label, type, hidden, required }) => {
      return (
        acumulator +
        Field({
          id,
          label,
          type,
          required,
          className: hidden && "field__hidden",
        })
      );
    },
    "",
  );

  const btnSubmit = Button({
    id: "auth-submit",
    title: "Log In",
    className: btn.prime,
  });
  const btnFlip = Button({
    id: "auth-flip",
    title: "Sign Up",
    className: btn.simple,
    isBtn: true,
  });

  return `
    <form id="form-auth" class="form-auth login">
      <div class="form-auth__title" id="title-auth">
        Welcome Back!
      </div>
      <div class="form-auth__fields">${fields}</div>
      <div class="form-auth__btns">
        ${btnSubmit + btnFlip}
      </div>
    </form>
  `;
};

export default AuthForm;
