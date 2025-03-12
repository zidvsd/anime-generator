export const navScroll = () => {
  const navBar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
      navBar.style.transform = "translateY(-100px)";
    } else {
      navBar.style.transform = "translateX(0)";
    }
    lastScrollTop = scrollTop;
  });
};
