export const toggleMenu = () => {
  const menuBtn = document.getElementById("menu-btn");
  const menuSection = document.getElementById("menu-section");
  menuBtn.addEventListener("click", () => {
    if (menuSection.classList.contains("hidden")) {
      menuSection.classList.remove("hidden");
    } else {
      menuSection.classList.add("hidden");
    }
  });

  window.addEventListener("resize", () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      console.log("hello");
      menuSection.classList.add("hidden");
    } else {
      menuSection.classList.remove("hidden");
    }
  });
};
