export const searchShortcut = () => {
  const searchInputs = document.querySelectorAll(".search-input");

  const displaySearch = () => {
    searchInputs.forEach((input) => {
      input.focus();
    });
  };

  const hideSearch = () => {
    searchInputs.forEach((input) => {
      input.blur();
      input.value = "";
    });
  };

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      displaySearch();
    }

    if (event.key === "Escape") {
      hideSearch();
    }
  });
};
