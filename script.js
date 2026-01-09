const TOTAL_CATS = 20;
let currentIndex = 0;

const likedCats = [];
const dislikedCats = [];

// Generate 20 UNIQUE random image URLs
const catImages = Array.from({ length: TOTAL_CATS }, (_, i) =>
  `https://cataas.com/cat?width=400&height=400&random=${Date.now() + i}`
);

const catStack = document.getElementById("cat-stack");
const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");
const showLikedBtn = document.getElementById("show-liked");
const backButton = document.getElementById("back-button");

const swipeView = document.getElementById("swipe-view");
const summaryView = document.getElementById("summary-view");

const totalLikedText = document.getElementById("total-liked");
const totalDislikedText = document.getElementById("total-disliked");
const likedImagesContainer = document.getElementById("liked-images");

const loveOverlay = document.getElementById("love-overlay");

// Show heart animation
function showLoveEffect() {
  loveOverlay.classList.remove("show-love");
  void loveOverlay.offsetWidth;
  loveOverlay.classList.add("show-love");
}

// Show ONE cat
function showCat() {
  if (currentIndex >= TOTAL_CATS) {
    catStack.innerHTML = "<p>No more cats 🐱</p>";
    return;
  }

  const img = document.createElement("img");
  img.src = catImages[currentIndex];
  img.id = "current-cat";

  catStack.innerHTML = "";
  catStack.appendChild(img);
}

// Swipe logic
function swipe(direction) {
  const img = document.getElementById("current-cat");
  if (!img) return;

  img.style.transform =
    direction === "right"
      ? "translateX(400px) rotate(15deg)"
      : "translateX(-400px) rotate(-15deg)";
  img.style.opacity = 0;

  setTimeout(() => {
    if (direction === "right") likedCats.push(img.src);
    else dislikedCats.push(img.src);

    currentIndex++;
    showCat();
  }, 400);
}

// Summary page
function showSummary() {
  swipeView.style.display = "none";
  summaryView.style.display = "block";

  totalLikedText.textContent = `Total Liked: ${likedCats.length}`;
  totalDislikedText.textContent = `Total Disliked: ${dislikedCats.length}`;

  likedImagesContainer.innerHTML = "";
  likedCats.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    likedImagesContainer.appendChild(img);
  });
}

// Back
function goBack() {
  summaryView.style.display = "none";
  swipeView.style.display = "block";
}

// Events
likeBtn.addEventListener("click", () => {
  showLoveEffect();
  swipe("right");
});

dislikeBtn.addEventListener("click", () => swipe("left"));
showLikedBtn.addEventListener("click", showSummary);
backButton.addEventListener("click", goBack);

// Init
showCat();
