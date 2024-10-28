const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let isDragging = false;
let offsetX = 0, offsetY = 0;
let lastX, lastY;

/* Create stars with random size, position, and independent blinking */
function createStars() {
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    brightness: Math.random(),
    color: getRandomStarColor(),
    cycle: Math.random() * 2000 + 1000,
  }));
}

function getRandomStarColor() {
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

  stars.forEach((star) => {
    const opacity = Math.abs(Math.sin((time % star.cycle) / star.cycle * Math.PI));
    ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${opacity})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
});

/* Title fade-in and transition to input field */
function showTitle() {
  const title = document.getElementById('title');
  title.classList.add('fade-in');

  setTimeout(() => {
    title.classList.remove('fade-in');
    title.classList.add('fade-out');

    setTimeout(() => {
      title.classList.add('hidden');
      showEquationInput();
    }, 2000);
  }, 5000);
}

function showEquationInput() {
  const inputContainer = document.getElementById('equation-input-container');
  inputContainer.style.display = 'block';
  document.getElementById('equation-input').focus();
}

/* Start graph rendering */
function startGraph(equation) {
  stars = [];
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

/* Dragging interaction */
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

/* Initialize stars and title */
createStars();
animateStars();
showTitle();

/* Handle equation input */
document.getElementById('equation-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const equation = e.target.value;
    startGraph(equation);
  }
});