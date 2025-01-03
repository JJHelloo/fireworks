// Fireworks v2.0 Pure JavaScript

// Select the canvas and set its size
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "#000003";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Initialize variables
const listFire = [];
const listFirework = [];
const actions = [
  makeHeartFirework,
  makeDoubleCircleFirework,
  makeCircleFirework,
  makePlanetCircleFirework,
  makeFullCircleFirework,
  makeStarFirework,
  makeSpiralFirework,
  makeRandomScatterFirework
];
const fireNumber = 10;
const range = 100;
let center = { x: canvas.width / 2, y: canvas.height / 2 };

function randColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Firework creation functions
function makeCircleFirework(fire) {
  const color = randColor();
  const max = fireNumber * 5;
  for (let i = 0; i < max; i++) {
    const rad = (i * Math.PI * 2) / max;
    const firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * 4,
      vy: Math.sin(rad) * 4,
      ay: 0.04,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function makeDoubleCircleFirework(fire) {
  const color = randColor();
  makeCircleFirework(fire);
  fire.y -= 30;
  makeCircleFirework(fire);
  return color;
}

function makePlanetCircleFirework(fire) {
  const color = "#aa0609";
  makeCircleFirework(fire);
  fire.y += 30;
  makeCircleFirework(fire);
  return color;
}

function makeHeartFirework(fire) {
  const color = randColor();
  const max = fireNumber * 5;
  for (let i = 0; i < max; i++) {
    const t = (i / max) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: x * 0.4,
      vy: -y * 0.4,
      ay: 0.04,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function makeFullCircleFirework(fire) {
  const color = randColor();
  const max = fireNumber * 5;
  for (let i = 0; i < max; i++) {
    const rad = (i * Math.PI * 2) / max;
    const firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * 8,
      vy: Math.sin(rad) * 8,
      ay: 0.02,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function makeStarFirework(fire) {
  const color = randColor();
  const max = fireNumber * 5;
  for (let i = 0; i < max; i++) {
    const rad = (i % 5 === 0) ? Math.PI / 5 : Math.PI / 2.5;
    const firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * (i % 5 === 0 ? 6 : 3),
      vy: Math.sin(rad) * (i % 5 === 0 ? 6 : 3),
      ay: 0.04,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function makeSpiralFirework(fire) {
  const color = randColor();
  const max = fireNumber * 5;
  for (let i = 0; i < max; i++) {
    const angle = i * 0.1;
    const radius = 0.5 * i;
    const firework = {
      x: fire.x + radius * Math.cos(angle),
      y: fire.y + radius * Math.sin(angle),
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(angle) * 2,
      vy: Math.sin(angle) * 2,
      ay: 0.02,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function makeRandomScatterFirework(fire) {
  const color = randColor();
  const max = fireNumber * 10;
  for (let i = 0; i < max; i++) {
    const firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1,
      fill: color,
      vx: Math.random() * 8 - 4,
      vy: Math.random() * 8 - 4,
      ay: 0.02,
      alpha: 1,
      life: Math.round(Math.random() * range) + range * 2
    };
    listFirework.push(firework);
  }
  return color;
}

function createFireworks() {
  for (let i = 0; i < fireNumber; i++) {
    const fire = {
      x: Math.random() * canvas.width,
      y: Math.random() * range * 2.5 + canvas.height,
      size: Math.random() + 0.5,
      fill: "#ff3",
      vx: Math.random() - 0.5,
      vy: -(Math.random() + 4),
      ax: Math.random() * 0.06 - 0.03,
      delay: Math.round(Math.random() * range) + range * 4,
      hold: false,
      alpha: 1,
      far: Math.random() * range + (center.y - range)
    };
    fire.base = { x: fire.x, y: fire.y, vx: fire.vx, vy: fire.vy };
    listFire.push(fire);
  }
}

function createExplosion(fire) {
  const action = actions[Math.floor(Math.random() * actions.length)];
  action(fire);
}

function updateFireworks() {
  listFire.forEach((fire, index) => {
    if (!fire.hold) {
      fire.x += fire.vx;
      fire.y += fire.vy;
      fire.vy += fire.ax;
    }
    if (fire.y <= fire.far && !fire.hold) {
      fire.hold = true;
      fire.vx = fire.vy = fire.ax = 0;
      fire.alpha = 0;
      createExplosion(fire);
    }
  });

  if (listFire.length === 0) {
    console.log("Recreating fireworks...");
    createFireworks();
  }
}

function drawFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  listFirework.forEach((firework, index) => {
    if (firework.alpha <= 0 || firework.life <= 0) {
      listFirework.splice(index, 1);
    } else {
      firework.x += firework.vx;
      firework.y += firework.vy;
      firework.vy += firework.ay;
      firework.alpha -= 0.005;
      firework.life--;
      ctx.globalAlpha = firework.alpha;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.fillStyle = firework.fill;
      ctx.fill();
      ctx.closePath();
    }
  });
}

function animate() {
  drawFireworks();
  updateFireworks();
  setTimeout(() => requestAnimationFrame(animate), 1000 / 60);
}

createFireworks();
animate();

// Periodically create new fireworks
setInterval(() => {
    createFireworks();
}, 3000);
