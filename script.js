const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
let equation = "";
let showGraph = false;

/* 반응형으로 캔버스 크기 조정 */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* 별 객체 생성 */
function createStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 2 + 0.5;
  const speed = Math.random() * 0.05;

  stars.push({ x, y, size, speed, opacity: 0 });
}

/* 별 애니메이션 */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.opacity = Math.abs(Math.sin(performance.now() * star.speed));
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  if (stars.length < 100) createStar(); // 별 개수 조정
  requestAnimationFrame(animateStars);
}

animateStars(); // 애니메이션 시작

/* 타이틀 숨기고 입력창 표시 */
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
  stars.length = 0; // 별 제거
  animateGraph();
}

/* 그래프 위 점들 애니메이션 */
function animateGraph() {
  if (!showGraph) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = -10; x <= 10; x += 0.1) {
    const y = eval(equation.replace(/x/g, `(${x})`));
    const screenX = canvas.width / 2 + x * 40;
    const screenY = canvas.height / 2 - y * 40;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animateGraph);
}

/* 그래프 드래그 기능 */
let isDragging = false;
let dragStartX, dragStartY;

canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    ctx.translate(dx, dy);
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});