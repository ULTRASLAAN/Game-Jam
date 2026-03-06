const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const characterScreen = document.getElementById('character-screen');
const gameScreen = document.getElementById('game-screen');
const playerInfo = document.getElementById('player-info');
const buttons = document.querySelectorAll('.select-btn');

const TILE = 48;
const WORLD_COLS = 48;
const WORLD_ROWS = 32;
const WORLD_WIDTH = WORLD_COLS * TILE;
const WORLD_HEIGHT = WORLD_ROWS * TILE;

const zones = [
  {
    name: 'Temple Chinois',
    x: 8 * TILE,
    y: 7 * TILE,
    w: 14 * TILE,
    h: 10 * TILE,
    color: '#7f1d1d'
  },
  {
    name: 'Forêt Ancienne',
    x: 0,
    y: 0,
    w: 24 * TILE,
    h: WORLD_HEIGHT,
    color: '#14532d'
  },
  {
    name: 'Montagnes Brisées',
    x: 24 * TILE,
    y: 0,
    w: 24 * TILE,
    h: WORLD_HEIGHT,
    color: '#334155'
  }
];

let gameStarted = false;
let selectedClass = null;
let currentZone = 'Temple Chinois';

const player = {
  x: 14 * TILE,
  y: 12 * TILE,
  width: 26,
  height: 26,
  speed: 3,
  mage: 0,
  force: 0,
  className: ''
};

const camera = {
  x: 0,
  y: 0
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  z: false,
  q: false,
  s: false,
  d: false,
  w: false,
  a: false
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const choice = button.dataset.class;
    startGame(choice);
  });
});

window.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key in keys) {
    keys[key] = true;
    event.preventDefault();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key in keys) {
    keys[key] = false;
    event.preventDefault();
  }
});

function startGame(choice) {
  selectedClass = choice;
  if (choice === 'sorcier') {
    player.className = 'Sorcier';
    player.mage = 100;
    player.force = 50;
    player.speed = 3.2;
  } else {
    player.className = 'Barbare';
    player.mage = 50;
    player.force = 100;
    player.speed = 2.8;
  }

  characterScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameStarted = true;
  requestAnimationFrame(gameLoop);
}

function update() {
  let moveX = 0;
  let moveY = 0;

  if (keys.ArrowLeft || keys.q || keys.a) moveX -= 1;
  if (keys.ArrowRight || keys.d) moveX += 1;
  if (keys.ArrowUp || keys.z || keys.w) moveY -= 1;
  if (keys.ArrowDown || keys.s) moveY += 1;

  if (moveX !== 0 && moveY !== 0) {
    const normalization = Math.sqrt(2);
    moveX /= normalization;
    moveY /= normalization;
  }

  player.x += moveX * player.speed;
  player.y += moveY * player.speed;

  player.x = clamp(player.x, 0, WORLD_WIDTH - player.width);
  player.y = clamp(player.y, 0, WORLD_HEIGHT - player.height);

  currentZone = findCurrentZone();

  camera.x = clamp(
    player.x + player.width / 2 - canvas.width / 2,
    0,
    WORLD_WIDTH - canvas.width
  );
  camera.y = clamp(
    player.y + player.height / 2 - canvas.height / 2,
    0,
    WORLD_HEIGHT - canvas.height
  );

  playerInfo.textContent = `${player.className} | Force: ${player.force} | Mage: ${player.mage} | Zone: ${currentZone}`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawZones();
  drawGrid();
  drawTempleDecoration();
  drawPlayer();
}

function drawZones() {
  zones.forEach((zone) => {
    const x = zone.x - camera.x;
    const y = zone.y - camera.y;
    ctx.fillStyle = zone.color;
    ctx.fillRect(x, y, zone.w, zone.h);

    if (zone.name !== 'Temple Chinois') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(x, y, zone.w, zone.h);
    }

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(zone.name, x + 14, y + 28);
  });
}

function drawGrid() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 1;

  for (let x = 0; x <= WORLD_WIDTH; x += TILE) {
    const sx = x - camera.x;
    ctx.beginPath();
    ctx.moveTo(sx, -camera.y);
    ctx.lineTo(sx, WORLD_HEIGHT - camera.y);
    ctx.stroke();
  }

  for (let y = 0; y <= WORLD_HEIGHT; y += TILE) {
    const sy = y - camera.y;
    ctx.beginPath();
    ctx.moveTo(-camera.x, sy);
    ctx.lineTo(WORLD_WIDTH - camera.x, sy);
    ctx.stroke();
  }
}

function drawTempleDecoration() {
  const temple = zones[0];
  const gateX = temple.x + temple.w / 2 - 60 - camera.x;
  const gateY = temple.y + temple.h / 2 - 50 - camera.y;

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(gateX, gateY + 40, 120, 14);

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(gateX + 10, gateY, 18, 54);
  ctx.fillRect(gateX + 92, gateY, 18, 54);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '14px Arial';
  ctx.fillText('Entrée du temple', gateX - 10, gateY - 8);
}

function drawPlayer() {
  const px = player.x - camera.x;
  const py = player.y - camera.y;

  ctx.fillStyle = selectedClass === 'sorcier' ? '#a855f7' : '#f97316';
  ctx.fillRect(px, py, player.width, player.height);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 6, py + 6, 4, 4);
  ctx.fillRect(px + 16, py + 6, 4, 4);
}

function findCurrentZone() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  const temple = zones[0];
  if (isInside(centerX, centerY, temple)) return temple.name;

  if (centerX < WORLD_WIDTH / 2) return 'Forêt Ancienne';
  return 'Montagnes Brisées';
}

function isInside(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function gameLoop() {
  if (!gameStarted) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
