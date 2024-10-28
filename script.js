const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let showGraph = false;
let offsetX = 0, offsetY = 0;

/* Handle screen resizing */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  createStars();
});

/* Create stars with random sizes, positions, and brightness */
function createStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      color: getRandomStarColor(),
      cycle: Math.random() * 2000 + 1000, // Independent blinking cycles
    });
  }
}

/* Generate random star colors close to white, light blue, and light yellow */
function getRandomStarColor() {
  const colors = [
    'rgba(255, 255, 255, 0.8)', // White
    'rgba(173, 216, 230, 0.8)', // Light blue
    'rgba(255, 250, 205, 0.8)', // Light yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* Animate stars to blink independently */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const time = performance.now();

  stars.forEach((star) => {
    const opacity = Math.abs(Math.sin((time % star.cycle) / star.cycle * Math.PI));
    ctx.fillStyle = star.color.replace(/[\d.]+\)$/g, `${opacity})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

/* Initialize and animate stars */
createStars();
animateStars();

/* Display title and transition to input field */
setTimeout(() => {
  const title = document.getElementById("title");
  title.classList.add("fade-in"); // Fade in the title

  setTimeout(() => {
    title.classList.remove("fade-in");
    title.classList.add("fade-out"); // Fade out the title

    setTimeout(() => {
      title.classList.add("hidden"); // Hide the title
      document.getElementById("equation-input-container").classList.remove("hidden");
    }, 2000); // Delay to ensure fade-out completes
  }, 5000); // Keep title visible for 5 seconds
}, 1000); // Initial 1-second delay

/* Handle equation input */
const equationInput = document.getElementById("equation-input");
equationInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const equation = equationInput.value;
    startGraph(equation);
  }
});

/* Start graph animation */
function startGraph(equation) {
  showGraph = true;
  stars = []; // Clear stars
  animateGraph(equation);
}

/* Animate graph points */
function animateGraph(equation) {
  if (!showGraph) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = -10; x <= 10; x += 0.1) {
    try {
      const y = eval(equation.replace(/x/g, `(${x})`));
      const screenX = canvas.width / 2 + (x + offsetX) * 40;
      const screenY = canvas.height / 2 - (y + offsetY) * 40;

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
      ctx.fill();
    } catch (error) {
      console.error("Invalid equation:", error);
      return;
    }
  }

  requestAnimationFrame(() => animateGraph(equation));
}

/* Dragging interaction for graph */
let isDragging = false;
let lastX, lastY;

canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = (e.clientX - lastX) / 40;
    const dy = (e.clientY - lastY) / 40;
    offsetX += dx;
    offsetY += dy;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});