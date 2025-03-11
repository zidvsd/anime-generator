import { searchShortcut } from "./shortcuts.js";
import { toggleMenu } from "./menu.js";
import { fetchApi } from "./api.js";
window.onload = () => {
  searchShortcut();
  toggleMenu();
  fetchApi();
  setInterval(fetchApi, 10000);
};
