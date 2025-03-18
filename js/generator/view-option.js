export const filterSection = () => {
  const fillBtn = () => {
    const single = document.getElementById("single-btn");
    const list = document.getElementById("list-btn");
    let isActive = "single";
    single.classList.add("bg-blood");
    single.addEventListener("click", (event) => {
      console.log("hello");
      single.classList.add("bg-blood");
      list.classList.remove("bg-blood");
      isActive = "single";
    });
    list.addEventListener("click", () => {
      console.log("hello");
      list.classList.add("bg-blood");
      single.classList.remove("bg-blood");
      isActive = "list";
    });

    return () => isActive;
  };

  fillBtn();
};
