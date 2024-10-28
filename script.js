const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let equation = "";
let offsetX = 0, offsetY = 0;
let showGraph = false;

/* Handle screen resizing */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  createStars();
});

/* Create stars with random sizes and colors */
function createStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      color: `rgba(${Math.floor(Math.random() * 255)}, 
                    ${Math.floor(Math.random() * 255)}, 
                    ${Math.floor(Math.random() * 255)}, 
                    ${Math.random()})`,
      opacity: Math.random(),
    });
  }
}

/* Animate stars to shine randomly */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.opacity = Math.abs(Math.sin(performance.now() / 500));
    ctx.fillStyle = star.color.replace(/[\d.]+\)$/g, `${star.opacity})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

/* Initialize and animate stars */
createStars();
animateStars();

/* Display title and then transition to equation input */
setTimeout(() => {
  const title = document.getElementById("title");
  title.style.opacity = 1;  // Make title appear

  setTimeout(() => {
    title.classList.add("hidden"); // Hide title
    document.getElementById("equation-input-container").classList.remove("hidden");
  }, 5000); // 5-second delay for title display
}, 1000); // Initial 1-second delay before title appears

/* Handle equation input */
const equationInput = document.getElementById("equation-input");
equationInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    equation = equationInput.value;
    startGraph();
  }
});

/* Start graph animation */
function startGraph() {
  showGraph = true;
  stars = [];
  animateGraph();
}

/* Animate graph points */
function animateGraph() {
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

  requestAnimationFrame(animateGraph);
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