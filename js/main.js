import { searchShortcut } from "./shortcuts.js";
import { toggleMenu } from "./menu.js";
import { fetchApi } from "./api.js";
import { heroTitleLoop } from "./loading.js";
import { navScroll } from "./nav-scroll.js";
import { sendMail } from "./form.js";
window.onload = () => {
  navScroll();
  searchShortcut();
  toggleMenu();
  fetchApi();
  heroTitleLoop();
  sendMail();
  setInterval(fetchApi, 10000);
};
