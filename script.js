window.onload = () => {
  // Pages
  const mainPage = document.getElementById('main-page');
  const equationPage = document.getElementById('equation-page');
  const graphPage = document.getElementById('graph-page');

  // Elements
  const title = document.getElementById('title');
  const equationInput = document.getElementById('equation-input');
  const graphCanvas = document.getElementById('graph-canvas');
  const setupOverlay = document.getElementById('setup-overlay');
  const menuOverlay = document.getElementById('menu-overlay');

  // Canvas Setup
  const ctx = graphCanvas.getContext('2d');
  let equation = null;

  // Animation: Main Page
  function fadeInTitle() {
    title.style.opacity = 1;
    setTimeout(() => {
      for (let i = 0; i < 99; i++) {
        createStar(mainPage);
      }
    }, 2000);
  }

  function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    container.appendChild(star);
  }

  mainPage.addEventListener('click', () => {
    mainPage.style.display = 'none';
    equationPage.style.display = 'flex';
  });

  // Graph Rendering
  function drawGraph() {
    ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
    const func = new Function('x', `return ${equation}`);
    ctx.beginPath();
    for (let x = -10; x < 10; x += 0.1) {
      const y = func(x);
      ctx.lineTo(x * 50 + graphCanvas.width / 2, -y * 50 + graphCanvas.height / 2);
    }
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  // Equation Input
  equationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      try {
        equation = equationInput.value;
        equationPage.style.display = 'none';
        graphPage.style.display = 'flex';
        drawGraph();
      } catch {
        alert('Seeing wrong starlight!');
        equationInput.value = '';
      }
    }
  });

  // Buttons
  document.querySelector('.menu-button').addEventListener('click', () => {
    menuOverlay.classList.toggle('hidden');
  });

  document.querySelector('.setup-button').addEventListener('click', () => {
    setupOverlay.classList.toggle('hidden');
  });

  fadeInTitle();
};