export const filterGenre = () => {
  const clickCounts = new Map();
  const genres = document.querySelectorAll(".genre-pill");
  const genreInput = document.getElementById("genre-filter");
  const selectedGenreContainer = document.getElementById(
    "selected-genre-container"
  );
  const dropdownToggle = document.getElementById("dropdownToggle");
  const genreDropdown = document.getElementById("genreDropdown");

  // Add transition class for animation
  genreDropdown.classList.add(
    "transition-all",
    "duration-300",
    "ease-in-out",
    "opacity-0",
    "scale-95"
  );

  const searchFilter = () => {
    genreInput.addEventListener("focus", () => {
      openDropdown();
    });

    genreInput.addEventListener("input", () => {
      const filter = genreInput.value.toLowerCase();
      genres.forEach((genre) => {
        genre.classList.toggle(
          "hidden",
          !genre.textContent.trim().toLowerCase().includes(filter)
        );
      });
    });
  };

  const addSelectedGenre = (genreName) => {
    if (
      ![...selectedGenreContainer.children].some(
        (g) => g.textContent === genreName
      )
    ) {
      const selected = document.createElement("p");
      selected.classList.add("genre-pill", "bg-blood", "selected-genre");
      selected.textContent = genreName;
      selectedGenreContainer.appendChild(selected);
      clickCounts.set(genreName, 1);
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
          clickCounts.delete(genreName);
        }
      }
    });
  };

  const openDropdown = () => {
    genreDropdown.classList.remove("hidden");
    setTimeout(() => {
      genreDropdown.classList.remove("opacity-0", "scale-95");
      genreDropdown.classList.add("opacity-100", "scale-100");
    }, 10);
  };

  const closeDropdown = () => {
    genreDropdown.classList.remove("opacity-100", "scale-100");
    genreDropdown.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      genreDropdown.classList.add("hidden");
    }, 300); // Matches transition duration
  };

  const dropdown = () => {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (genreDropdown.classList.contains("hidden")) {
        openDropdown();
      } else {
        closeDropdown();
      }
    });
  };

  dropdown();
  removeGenre();
  enterShortcut();
  addFilter();
  searchFilter();
};
