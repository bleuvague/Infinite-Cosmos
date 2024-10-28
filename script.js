const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

let stars = [];
let offsetX = 0, offsetY = 0;
let isDragging = false;
let lastX, lastY;

/* Create stars with varied size, color, and twinkling cycles */
function createStars() {
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    color: getRandomColor(),
    cycle: Math.random() * 2000 + 1000,
  }));
}

function getRandomColor() {
  const colors = [
    'rgba(255, 255, 255, 0.8)',
    'rgba(173, 216, 230, 0.8)',
    'rgba(255, 250, 205, 0.8)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* Animate the stars */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const time = performance.now();

  stars.forEach(star => {
    const opacity = Math.abs(Math.sin((time % star.cycle) / star.cycle * Math.PI));
    ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${opacity})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

/* Show title with smooth fade-in and out */
function showTitle() {
  const title = document.getElementById('title');
  title.style.opacity = 1;

  setTimeout(() => {
    title.style.opacity = 0;

    setTimeout(() => {
      title.classList.add('hidden');
      showEquationInput();
    }, 3000);
  }, 5000);
}

/* Display the input field */
function showEquationInput() {
  const inputContainer = document.getElementById('equation-input-container');
  inputContainer.style.display = 'block';
  document.getElementById('equation-input').focus();
}

/* Handle graph rendering on Enter */
document.getElementById('equation-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const equation = e.target.value;
    startGraph(equation);
  }
});

function startGraph(equation) {
  stars = [];  // Clear stars for the graph
  animateGraph(equation);
}

function animateGraph(equation) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = -10; x <= 10; x += 0.1) {
    try {
      const y = eval(equation.replace(/x/g, `(${x})`));
      const screenX = canvas.width / 2 + (x + offsetX) * 40;
      const screenY = canvas.height / 2 - (y + offsetY) * 40;

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
      ctx.fill();
    } catch (error) {
      console.error('Invalid equation:', error);
      return;
    }
  }

  requestAnimationFrame(() => animateGraph(equation));
}

/* Handle dragging interaction */
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    offsetX += (e.clientX - lastX) / 40;
    offsetY += (e.clientY - lastY) / 40;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

/* Initialize everything */
createStars();
animateStars();
showTitle();