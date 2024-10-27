const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let equation = "";
let showGraph = false;
let offsetX = 0, offsetY = 0;

/* 창 크기 조정에 따른 캔버스 리사이즈 */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  createStars();
});

/* 별 생성 함수 */
function createStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random(),
    });
  }
}

/* 별 애니메이션 */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.opacity = Math.abs(Math.sin(performance.now() / 500));
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

/* 초기화: 별 생성 및 애니메이션 시작 */
createStars();
animateStars();

/* 타이틀 숨기고 방정식 입력 창 표시 */
setTimeout(() => {
  document.getElementById("title").classList.add("hidden");
  document.getElementById("equation-input-container").classList.remove("hidden");
}, 5000);

/* 방정식 입력 처리 */
const equationInput = document.getElementById("equation-input");
equationInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    equation = equationInput.value;
    startGraph();
  }
});

/* 그래프 시작 */
function startGraph() {
  showGraph = true;
  stars = [];
  animateGraph();
}

/* 그래프 위 점들 애니메이션 */
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

/* 드래그 기능 구현 */
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
