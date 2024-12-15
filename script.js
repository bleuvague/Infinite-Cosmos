// Starry sky and animations
window.onload = () => {
  const mainPage = document.getElementById('main-page');
  const equationPage = document.getElementById('equation-page');
  const graphPage = document.getElementById('graph-page');
  const title = document.getElementById('title');

  // Star animations
  const stars = [];
  function createStarrySky() {
    for (let i = 0; i < 99; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = Math.random() * window.innerHeight + 'px';
      star.style.left = Math.random() * window.innerWidth + 'px';
      mainPage.appendChild(star);
      stars.push(star);
    }
  }

  // Transition to Equation Page
  mainPage.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    equationPage.classList.remove('hidden');
  });

  createStarrySky();
};
