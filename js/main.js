import { searchShortcut } from "./shortcuts.js";
import { toggleMenu } from "./menu.js";
import { fetchApi } from "./api.js";
import { heroTitleLoop } from "./loading.js";
window.onload = () => {
  searchShortcut();
  toggleMenu();
  fetchApi();
  heroTitleLoop();
  setInterval(fetchApi, 10000);
};
