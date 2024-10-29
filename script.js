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

// 점진적으로 별 생성 속도 증가
function generateStars(totalStars, currentCount = 0, delay = 2000) {
  if (currentCount >= totalStars) return; // 최대 별 개수 도달 시 종료

  createStar();
  const nextDelay = Math.max(50, delay - 20); // 최소 50ms까지 감소
  setTimeout(() => generateStars(totalStars, currentCount + 1, nextDelay), delay);
}

// 제목 표시 함수
function showTitle() {
  const title = document.querySelector('.title');
  title.style.opacity = 1; // 페이드 인

  // 3초 후 페이드 아웃
  setTimeout(() => {
    title.style.opacity = 0;
    showInputBox(); // 제목 사라진 후 입력 칸 표시
  }, 3000);
}

// 입력 칸 표시 함수
function showInputBox() {
  const inputBox = document.querySelector('.input-box');
  inputBox.style.opacity = 1;
  inputBox.focus(); // 커서 자동 포커스
}

// 별 생성 완료 후 제목 표시
setTimeout(() => {
  showTitle();
}, 10000); // 10초 후 제목 등장

// 초기화: 100개의 별을 천천히 생성
generateStars(100);