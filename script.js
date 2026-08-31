const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {
  if (index < 0) {
    index = 0;
  }

  if (index >= slides.length) {
    index = slides.length - 1;
  }

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    slide.classList.remove("previous");

    if (i < index) {
      slide.classList.add("previous");
    }
  });

  slides[index].classList.add("active");

  currentSlide = index;

  updateInterface();
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

function updateInterface() {
  const current = String(currentSlide + 1).padStart(2, "0");

  const total = String(slides.length).padStart(2, "0");

  document.getElementById("current").textContent = current;

  document.getElementById("total").textContent = total;

  const progress = ((currentSlide + 1) / slides.length) * 100;

  document.getElementById("progress").style.width = progress + "%";
}

/* Keyboard navigation */

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowRight":
    case " ":
    case "PageDown":
      event.preventDefault();
      nextSlide();
      break;

    case "ArrowLeft":
    case "PageUp":
      event.preventDefault();
      previousSlide();
      break;

    case "Home":
      showSlide(0);
      break;

    case "End":
      showSlide(slides.length - 1);
      break;

    case "f":
    case "F":
      toggleFullscreen();
      break;

    case "Escape":
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      break;
  }
});

/* Fullscreen */

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

/* Touch / swipe support */

let touchStartX = 0;

let touchEndX = 0;

document.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].screenX;

  handleSwipe();
});

function handleSwipe() {
  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) < 50) {
    return;
  }

  if (difference > 0) {
    nextSlide();
  } else {
    previousSlide();
  }
}

/* Initialize */

showSlide(0);
