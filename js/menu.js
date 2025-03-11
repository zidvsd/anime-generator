export const toggleMenu = () => {
  const menuBtn = document.getElementById("menu-btn");
  const menuSection = document.getElementById("menu-section");
  const navBar = document.querySelector(".navbar");

  menuBtn.addEventListener("click", () => {
    const isHidden = menuSection.classList.contains("hidden");

    menuSection.classList.toggle("hidden");
    navBar.classList.toggle("border-b-2", isHidden);
    navBar.classList.toggle("border-blood", isHidden);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      menuSection.classList.add("hidden");
      navBar.classList.remove("border-b-2", "border-blood");
    }
  });
};
