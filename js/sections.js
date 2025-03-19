export const displaySections = () => {
  const sections = {
    generator: document.getElementById("generator"),
    main: document.getElementById("main"),
    feature: document.getElementById("feature"),
    trending: document.getElementById("trending"),
    error: document.getElementById("error"),
  };
  const generatorLinks = document.querySelectorAll(".anime-gen");
  const homeBtns = document.querySelectorAll(".home");
  const trendingLinks = document.querySelectorAll(".trending");
  // Function to show or hide specific sections
  const toggleSections = (visibleSections = []) => {
    Object.keys(sections).forEach((key) => {
      if (sections[key]) {
        sections[key].classList.toggle(
          "hidden",
          !visibleSections.includes(key),
        );
      }
    });

    // Adjust generator section margin if visible
    if (sections.generator) {
      sections.generator.classList.toggle(
        "mt-32",
        !visibleSections.includes("generator"),
      );
    }
    if (sections.trending) {
      sections.trending.classList.toggle(
        "mt-32",
        !visibleSections.includes("trending"),
      );
    }
  };
  // Show error section if it exists
  const displayError = () => {
    if (sections.error) {
      sections.error.classList.remove("hidden");
    }
  };
  // eventlistener for trending links
  trendingLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleSections(["trending"]);
    });
  });
  // Event listener for generator links
  generatorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleSections(["generator"]); // Show only generator section
    });
  });

  // Event listener for home buttons
  homeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleSections(["main", "feature", "trending", "generator"]); // Show all sections
    });
  });

  // Initialize error handling
};
