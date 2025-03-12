import { searchShortcut } from "./shortcuts.js";
import { toggleMenu } from "./menu.js";
import { fetchApi } from "./api.js";
import { heroTitleLoop } from "./loading.js";
import { navScroll } from "./nav-scroll.js";
window.onload = () => {
  navScroll();
  searchShortcut();
  toggleMenu();
  fetchApi();
  heroTitleLoop();
  setInterval(fetchApi, 10000);
};
