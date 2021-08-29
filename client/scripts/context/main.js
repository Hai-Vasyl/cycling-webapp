import {render} from "../main.js";

const userDefault = {
  firstname: "",
  lastname: "",
  email: "",
  ava: "",
  role: "",
  color: "",
  _id: "",
};

export const store = {
  user: userDefault,
  param: "",
};

export const setParam = (newParam) => {
  store.param = newParam;
};

export const setUser = (user) => {
  store.user = {...store.user, user};
  render();
};

export const removeUser = () => {
  store.user = userDefault;
  render();
};
