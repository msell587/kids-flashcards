// Animals page only: tap the picture and the animal moves.
(function animalMoves() {
  const picture = document.getElementById("picture");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function animate() {
    if (finished) return;
    const { word } = deck[current];
    if (reduceMotion.matches) return;
    picture.classList.remove("moving");
    picture.dataset.animal = word;
    void picture.offsetWidth; // restart the animation if it is tapped again
    picture.classList.add("moving");
  }

  picture.addEventListener("animationend", (event) => {
    if (event.animationName.startsWith("move-")) picture.classList.remove("moving");
  });
  picture.addEventListener("click", animate);
  picture.style.cursor = "pointer";
})();
