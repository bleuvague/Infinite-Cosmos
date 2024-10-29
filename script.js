// 별 생성 함수
function createStar() {
  const star = document.createElement('div');
  const size = Math.random() * 3 + 1;
  star.classList.add('star');
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.backgroundColor = Math.random() > 0.5 ? '#ffffff' : '#9bb0ff';

  // 무작위 위치 지정
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;

  document.querySelector('.stars').appendChild(star);
}

// 별의 등장 속도 조절
let starCount = 0;
let interval = 2000; // 초기 간격 (2초)
const maxStars = 100;
const starInterval = setInterval(() => {
  createStar();
  starCount++;

  // 시간이 지날수록 속도 증가 (10초 동안 변화)
  interval -= 20;
  clearInterval(starInterval);
  setInterval(() => createStar(), Math.max(50, interval));

  if (starCount >= maxStars) clearInterval(starInterval);
}, interval);

// 제목 표시 (모든 별 등장 후)
const title = document.querySelector('.title');
setTimeout(() => {
  title.style.opacity = 1; // 페이드 인
  setTimeout(() => {
    title.style.opacity = 0; // 페이드 아웃
    showInputBox(); // 입력 칸 표시
  }, 3000); // 3초 대기 후 페이드 아웃
}, 10000); // 별들이 모두 등장한 후 10초 뒤

// 입력 칸 표시 함수
function showInputBox() {
  const inputBox = document.querySelector('.input-box');
  inputBox.style.opacity = 1;
  inputBox.focus(); // 커서 자동 포커스
}