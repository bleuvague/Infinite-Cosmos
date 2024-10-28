// 별 생성 함수
function createStar() {
  const star = document.createElement('div');
  const size = Math.random() * 3 + 1; // 별 크기
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.backgroundColor = Math.random() > 0.5 ? '#ffffff' : '#9bb0ff';
  star.style.position = 'absolute';
  star.style.borderRadius = '50%';
  star.style.boxShadow = `0 0 ${size * 2}px ${star.style.backgroundColor}`;
  
  // 무작위 위치 지정
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;

  // 반짝임 애니메이션
  star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite alternate`;

  document.querySelector('.stars').appendChild(star);
}

// 별 애니메이션 CSS 동적 생성
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes twinkle {
    from { opacity: 0.2; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

// 별 생성 루프 (하나씩 등장)
let starCount = 0;
const starInterval = setInterval(() => {
  createStar();
  starCount++;
  if (starCount >= 100) clearInterval(starInterval); // 최대 100개
}, 100);

// 제목 페이드 인/아웃 처리
const title = document.querySelector('.title');
setTimeout(() => {
  title.style.opacity = 1; // 페이드 인
  setTimeout(() => {
    title.style.opacity = 0; // 페이드 아웃
    showInputBox(); // 입력 칸 표시
  }, 3000); // 3초 대기 후 페이드 아웃
}, 3000); // 별 등장 완료 후 3초 대기

// 입력 칸 표시 함수
function showInputBox() {
  const inputBox = document.querySelector('.input-box');
  inputBox.style.opacity = 1;
}