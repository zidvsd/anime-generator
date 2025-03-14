export const loading = () => {
  document.getElementById("hero-img").src =
    "/assets/Dual Ring@1x-1.0s-200px-200px.gif";
  document.getElementById("hero-title").innerHTML = `
    <p id="hero-title"
            class="absolute bg-blood bg-opacity-50 px-8 w-full text-center rounded-bl-md rounded-br-md -translate-x-1/2 bottom-0 left-1/2 font-montserrat font-semibold text-blackDarker text-3xl">
            Loading <span class="dots"></span>
          </p>`;
};

export const trendingLoading = () => {
  document.querySelectorAll(".trending-img").forEach((img) => {
    img.src = "/assets/Dual Ring@1x-1.0s-200px-200px.gif";
  });
  document.querySelectorAll(".trending-title").forEach((title) => {
    title.innerText = "...";
  });
};
export const heroTitleLoop = () => {
  let index = 0;
  const changeText = () => {
    document.getElementById("hero-heading").innerText = headingPhrases[index];
    index = (index + 1) % headingPhrases.length;
  };
  const headingPhrases = [
    "Discover Your Next Anime Adventure!",
    "Find Your New Favorite Series",
    "Explore Hidden Anime Gems!",
  ];
  changeText();
  setInterval(changeText, 5000);
};
