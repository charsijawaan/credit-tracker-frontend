import { Store } from "pullstate";

export const userStore = new Store({
  user: JSON.parse(localStorage.getItem("user")),
});
