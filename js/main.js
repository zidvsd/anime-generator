import { searchShortcut } from "./shortcuts.js";
import { toggleMenu } from "./menu.js";
import { fetchApi } from "./api.js";
import { navScroll } from "./nav-scroll.js";
import { sendMail } from "./form.js";
import { initSwiper } from "./swiper.js";
import { loadHeroSection } from "./loadHeroSection.js";
import { displayTrending } from "./trendingSection.js";
import { filterSection } from "./generator/view-option.js";
import { filterGenre } from "./generator/genre.js";

window.onload = () => {
  navScroll();
  searchShortcut();
  toggleMenu();
  fetchApi();
  sendMail();
  initSwiper();
  loadHeroSection();
  displayTrending();
  filterSection();
  filterGenre();
  setInterval(loadHeroSection, 10000);
};
