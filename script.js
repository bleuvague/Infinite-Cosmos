// 별 생성 개수 설정
const NUM_STARS = 100;
const starsContainer = document.querySelector('.stars');
const titleContainer = document.querySelector('.title-container');
const questionContainer = document.querySelector('.question-container');
const inputContainer = document.querySelector('.input-container');
const background = document.querySelector('.background');

// 별 생성 함수
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // 무작위 위치 설정
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // 무작위 딜레이로 깜빡임 시작
  const delay = Math.random() * 5;
  star.style.animationDelay = `${delay}s`;

  starsContainer.appendChild(star);
}

// 모든 별 생성
for (let i = 0; i < NUM_STARS; i++) {
  createStar();
}

// 타이틀이 사라지고 질문이 나타나는 함수
setTimeout(() => {
  titleContainer.style.display = 'none'; // 타이틀 숨기기
  questionContainer.classList.remove('hidden'); // 질문 표시

  setTimeout(() => {
    questionContainer.style.display = 'none'; // 질문 숨기기
    inputContainer.classList.remove('hidden'); // 입력 칸 표시
  }, 3000); // 3초 후 질문 숨기기
}, 8000); // 8초 후 타이틀 숨기기

// 배경과 별 회전 및 변경 함수
setTimeout(() => {
  background.style.animation = 'rotateBackground 3s forwards';
  starsContainer.style.opacity = 0; // 별 서서히 사라짐

  setTimeout(() => {
    starsContainer.innerHTML = ''; // 별 제거
    starsContainer.style.opacity = 1; // 새 별 표시 준비
    for (let i = 0; i < NUM_STARS; i++) createStar(); // 새 별 생성
  }, 3000); // 3초 후 별 재생성
}, 12000); // 12초 후 회전 시작
