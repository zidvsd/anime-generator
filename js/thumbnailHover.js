export const hoverEffect = () => {
  const thumbnails = document.querySelectorAll(".swiper-slide");
  const thumbnailTitles = document.querySelectorAll(".thumbnail-title");

  const createDiv = () => {
    const hoverDiv = document.createElement("div");
    hoverDiv.classList.add(
      "fixed",
      "bg-blackDarker",
      "text-white",
      "flex",
      "flex-col",
      "gap-y-2",
      "pr-16",
      "pl-6",
      "py-4",
      "transition-opacity",
      "duration-300",
      "pointer-events-none",
      "opacity-0", // Only opacity, no hidden
      "z-[999]",
      "w-auto",
      "rounded-lg",
      "shadow-lg",
      "border",
      "border-blackDarker",
      "justify-start",
      "items-start",
      "text-left"
    );

    const divTitle = document.createElement("h1");
    divTitle.classList.add(
      "text-blood",
      "text-2xl",
      "font-bold",
      "font-poppins"
    );
    divTitle.textContent = "Anime Title";

    const divProducer = document.createElement("p");
    divProducer.classList.add(
      "text-whiteCustom",
      "font-poppins",
      "font-bold",
      "text-lg"
    );
    divProducer.textContent = "Producer";

    const wrapper = document.createElement("div");
    wrapper.classList.add(
      "flex",
      "flex-row",
      "gap-x-4",
      "font-inter",
      "text-grayCustom"
    );

    const divType = document.createElement("p");
    divType.textContent = "TV Show";

    const episodeCount = document.createElement("p");
    episodeCount.textContent = "12 Episodes";
    const separator = document.createElement("span");
    separator.innerHTML = "&#9679;";
    separator.classList.add("inline-block", "text-center");
    wrapper.append(divType, separator, episodeCount);

    const genreWrapper = document.createElement("div");
    genreWrapper.classList.add(
      "flex",
      "flex-row",
      "gap-x-4",
      "text-grayCustom",
      "font-inter"
    );

    const divGenre = document.createElement("p");
    divGenre.classList.add(
      "rounded-full",
      "bg-blood",
      "text-whiteCustom",
      "px-8",
      "py-4"
    );
    divGenre.textContent = "Action";

    genreWrapper.appendChild(divGenre);
    hoverDiv.append(divTitle, divProducer, wrapper, genreWrapper);
    document.body.appendChild(hoverDiv);
    return hoverDiv;
  };

  thumbnails.forEach((thumbnail, index) => {
    let hoverDiv = createDiv(); // Create once per thumbnail

    thumbnail.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1024) {
        hoverDiv.classList.remove("opacity-0", "pointer-events-none");
        hoverDiv.classList.add("opacity-100");

        // Positioning the div near the hovered element
        const hoverWidth = 192;
        const thumbnailRect = thumbnail.getBoundingClientRect();
        const spaceRight = window.innerWidth - thumbnailRect.right;
        const spaceLeft = thumbnailRect.left;
        const spaceBottom = window.innerHeight - thumbnailRect.bottom;

        // Calculate optimal position
        if (spaceRight >= hoverWidth) {
          hoverDiv.style.left = `${thumbnailRect.right + 10}px`;
          hoverDiv.style.right = "auto";
        } else if (spaceLeft >= hoverWidth) {
          hoverDiv.style.left = `${thumbnailRect.left - hoverWidth - 10}px`;
          hoverDiv.style.right = "auto";
        } else {
          hoverDiv.style.left = `${thumbnailRect.left + thumbnailRect.width / 2}px`;
          hoverDiv.style.transform = "translateX(-50%)";
        }

        if (spaceBottom >= hoverDiv.offsetHeight) {
          hoverDiv.style.top = `${thumbnailRect.bottom + 10}px`;
        } else {
          hoverDiv.style.top = `${thumbnailRect.top - hoverDiv.offsetHeight - 10}px`;
        }
      }

      thumbnail.classList.add("cursor-pointer");

      if (thumbnailTitles[index]) {
        thumbnailTitles[index].classList.remove("text-grayCustom");
        thumbnailTitles[index].classList.add(
          "text-blood",
          "transition",
          "duration-300",
          "ease-in-out"
        );
      }
    });

    thumbnail.addEventListener("mouseleave", () => {
      hoverDiv.classList.remove("opacity-100");
      hoverDiv.classList.add("opacity-0", "pointer-events-none");

      if (thumbnailTitles[index]) {
        thumbnailTitles[index].classList.remove("text-blood");
        thumbnailTitles[index].classList.add("text-grayCustom");
      }
    });
  });

  window.addEventListener("resize", () => {
    const hoverDivs = document.querySelectorAll(".fixed");
    hoverDivs.forEach((hoverDiv) => {
      if (window.innerWidth < 1024) {
        hoverDiv.classList.add("opacity-0", "pointer-events-none");
      } else {
        hoverDiv.classList.remove("opacity-0", "pointer-events-none");
      }
    });
  });
};
