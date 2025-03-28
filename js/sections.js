export const displaySections = () => {
  const sections = {
    generator: document.getElementById("generator"),
    main: document.getElementById("main"),
    feature: document.getElementById("feature"),
    trending: document.getElementById("trending"),
    error: document.getElementById("error"),
    random: document.getElementById("random"),
    about: document.getElementById("about"),
  };

  const generatorLinks = document.querySelectorAll(".anime-gen");
  const homeBtns = document.querySelectorAll(".home");
  const trendingLinks = document.querySelectorAll(".trending");
  const aboutLinks = document.querySelectorAll(".about");

  // Function to show or hide specific sections
  const toggleSections = (visibleSections = []) => {
    Object.keys(sections).forEach((key) => {
      if (sections[key]) {
        const isVisible = visibleSections.includes(key);
        sections[key].classList.toggle("hidden", !isVisible);
        sections[key].classList.toggle("mt-8", isVisible); // Add mt-8 when displayed
      }
    });

    // Adjust generator and trending section margins
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
      sections.error.classList.add("mt-8"); // Ensure error section also gets mt-8 when displayed
    }
  };

  // Event listener for trending links
  trendingLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleSections(["trending", "random"]);
    });
  });

  // Event listener for generator links
  generatorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleSections(["generator"]); // Show only generator section
    });
  });

  // Event listener for about links
  aboutLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleSections(["about"]); // Show only about section
    });
  });

  // Event listener for home buttons
  homeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleSections([
        "main",
        "feature",
        "trending",
        "generator",
        "random",
        "about",
      ]); // Show all sections
    });
  });

  // Initialize error handling
};
