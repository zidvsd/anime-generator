export const filterGenre = () => {
  const clickCounts = new Map();
  const genres = document.querySelectorAll(".genre-pill");
  const genreInput = document.getElementById("genre-filter");
  const selectedGenreContainer = document.getElementById(
    "selected-genre-container"
  );

  const searchFilter = () => {
    genreInput.addEventListener("input", () => {
      const filter = genreInput.value.toLowerCase();
      genres.forEach((genre) => {
        if (!genre.textContent.trim().toLowerCase().includes(filter)) {
          genre.classList.add("hidden");
        } else {
          genre.classList.remove("hidden");
        }
      });
    });
  };

  const addSelectedGenre = (genreName) => {
    // Check if genre is already selected
    if (
      ![...selectedGenreContainer.children].some(
        (g) => g.textContent === genreName
      )
    ) {
      const selected = document.createElement("p");
      selected.classList.add("genre-pill", "bg-blood", "selected-genre");
      selected.textContent = genreName;
      selectedGenreContainer.appendChild(selected);
      clickCounts.set(genreName, 1); // Initialize click count
    }
  };

  const addFilter = () => {
    genres.forEach((genre) => {
      genre.addEventListener("click", () => {
        addSelectedGenre(genre.textContent.trim());
      });
    });
  };

  const enterShortcut = () => {
    genreInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        if (genreInput.value.trim() === "") return;
        const firstGenre = [...genres].find(
          (genre) => !genre.classList.contains("hidden")
        );
        if (firstGenre) addSelectedGenre(firstGenre.textContent.trim());
      }
    });
  };

  const removeGenre = () => {
    selectedGenreContainer.addEventListener("click", (event) => {
      const genre = event.target;
      if (genre.classList.contains("selected-genre")) {
        const genreName = genre.textContent.trim();
        let count = clickCounts.get(genreName) || 0;
        count += 1;
        clickCounts.set(genreName, count);
        if (count === 2) {
          genre.classList.add("bg-white", "text-blackCustom");
        }
        if (count === 3) {
          genre.remove();
          clickCounts.delete(genreName); // Clean up map
        }
      }
    });
  };
  const dropdownToggle = document.getElementById("dropdownToggle");
  const genreDropdown = document.getElementById("genreDropdown");

  dropdownToggle.addEventListener("click", () => {
    genreDropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownToggle.contains(event.target) &&
      !genreDropdown.contains(event.target)
    ) {
      genreDropdown.classList.add("hidden");
    }
  });
  removeGenre();
  enterShortcut();
  addFilter();
  searchFilter();
};
