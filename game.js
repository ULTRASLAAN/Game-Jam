const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const characterScreen = document.getElementById('character-screen');
const gameScreen = document.getElementById('game-screen');
const playerInfo = document.getElementById('player-info');
const healthFill = document.getElementById('health-fill');
const healthText = document.getElementById('health-text');
const inventoryPanel = document.getElementById('inventory-panel');
const inventoryTitle = document.getElementById('inventory-title');
const inventoryGrid = document.getElementById('inventory-grid');
const buttons = document.querySelectorAll('.select-btn');

const TILE = 48;
const WORLD_COLS = 72;
const WORLD_ROWS = 32;
const WORLD_WIDTH = WORLD_COLS * TILE;
const WORLD_HEIGHT = WORLD_ROWS * TILE;

const templeZone = {
  name: 'Temple Chinois',
  x: 0,
  y: 0,
  w: 16 * TILE,
  h: WORLD_HEIGHT,
  color: '#7f1d1d'
};

const finalZone = {
  name: 'Sanctuaire Final',
  x: 48 * TILE,
  y: 0,
  w: 24 * TILE,
  h: WORLD_HEIGHT,
  color: '#312e81'
};

const entryBarrier = {
  x: templeZone.w - 26,
  y: WORLD_HEIGHT / 2 - 120,
  w: 52,
  h: 240,
  isOpen: false
};

const starterChest = {
  x: 362,
  y: 920,
  w: 38,
  h: 28,
  isOpened: false
};

const templeLayout = {
  x: templeZone.x + 24,
  y: templeZone.y + 110
};

const finalTempleLayout = {
  x: finalZone.x + 460,
  y: 210
};

const templeColliders = [
  { x: templeLayout.x + 22, y: templeLayout.y + 24, w: 156, h: 250 },
  { x: templeLayout.x + 220, y: templeLayout.y + 128, w: 290, h: 150 },
  { x: templeLayout.x + 548, y: templeLayout.y + 56, w: 156, h: 210 },
  { x: templeLayout.x + 298, y: templeLayout.y + 110, w: 154, h: 116 }
];

const finalTempleColliders = [
  { x: finalTempleLayout.x + 40, y: finalTempleLayout.y + 80, w: 210, h: 250 },
  { x: finalTempleLayout.x + 300, y: finalTempleLayout.y + 130, w: 350, h: 210 },
  { x: finalTempleLayout.x + 720, y: finalTempleLayout.y + 96, w: 220, h: 260 }
];

const finalMoat = {
  x: finalZone.x + 220,
  y: 0,
  w: 170,
  h: WORLD_HEIGHT
};

const finalAccessBridge = {
  x: finalMoat.x - 70,
  y: 760,
  w: finalMoat.w + 140,
  h: 58
};

const finalGateWall = {
  x: finalMoat.x + finalMoat.w + 24,
  y: 0,
  w: 46,
  h: WORLD_HEIGHT,
  gapY: finalAccessBridge.y - 56,
  gapH: 170
};

const finalPortal = {
  x: finalGateWall.x - 24,
  y: finalGateWall.gapY,
  w: 94,
  h: finalGateWall.gapH
};

const finalBarrier = {
  x: finalPortal.x + 12,
  y: finalPortal.y + 70,
  w: finalPortal.w - 24,
  h: 22,
  isOpen: false
};

const templeTrees = [
  { x: 90, y: 760, size: 0.85 },
  { x: 170, y: 870, size: 0.95 },
  { x: 120, y: 980, size: 1 },
  { x: 240, y: 890, size: 1.1 },
  { x: 320, y: 760, size: 0.9 },
  { x: 360, y: 1030, size: 0.95 },
  { x: 470, y: 830, size: 1 },
  { x: 520, y: 920, size: 1.05 },
  { x: 650, y: 1010, size: 1.15 },
  { x: 700, y: 850, size: 0.9 }
];

const forestTrees = [
  { x: 820, y: 180, size: 1.15 },
  { x: 930, y: 320, size: 1.05 },
  { x: 1060, y: 210, size: 1.2 },
  { x: 1180, y: 360, size: 1.1 },
  { x: 1320, y: 250, size: 1.18 },
  { x: 1430, y: 390, size: 1.08 },
  { x: 860, y: 560, size: 1.22 },
  { x: 980, y: 700, size: 1.14 },
  { x: 1100, y: 610, size: 1.25 },
  { x: 1250, y: 730, size: 1.1 },
  { x: 1390, y: 620, size: 1.2 },
  { x: 1480, y: 760, size: 1.07 },
  { x: 840, y: 950, size: 1.16 },
  { x: 970, y: 1080, size: 1.13 },
  { x: 1120, y: 980, size: 1.22 },
  { x: 1260, y: 1120, size: 1.09 },
  { x: 1410, y: 1020, size: 1.2 },
  { x: 1490, y: 1180, size: 1.06 }
];

const forestChests = [
  {
    x: 980,
    y: 520,
    w: 36,
    h: 26,
    isOpened: false,
    loot: ['Bois ancien', 'Potion verte']
  },
  {
    x: 1200,
    y: 860,
    w: 36,
    h: 26,
    isOpened: false,
    loot: ['Arc court', 'Flèches x10']
  },
  {
    x: 1400,
    y: 420,
    w: 36,
    h: 26,
    isOpened: false,
    loot: ['Gemme forêt', 'Bandages']
  }
];

const templeRiver = {
  width: 164,
  waveStep: 46,
  points: [
    { x: -60, y: 1280 },
    { x: 260, y: 1140 },
    { x: 520, y: 1290 },
    { x: 840, y: 1080 },
    { x: 1160, y: 1230 },
    { x: 1480, y: 980 },
    { x: 1780, y: 1220 },
    { x: 2030, y: 1390 },
    { x: 2180, y: 1410 }
  ]
};

const riverBridges = [
  {
    zone: 'Temple Chinois',
    x: 345,
    y: 1018,
    w: 58,
    h: 330
  },
  {
    zone: 'Forêt Ancienne',
    x: 1053,
    y: 966,
    w: 58,
    h: 330
  },
  {
    zone: 'Montagnes Brisées',
    x: 1753,
    y: 894,
    w: 58,
    h: 330
  }
];

const finalBoss = {
  x: finalZone.x + 800,
  y: 680,
  w: 56,
  h: 34,
  dirX: 1,
  dirY: 1,
  speed: 1.3,
  minX: finalZone.x + 360,
  maxX: finalZone.x + finalZone.w - 180,
  minY: 380,
  maxY: 1240
};

const zones = [
  templeZone,
  {
    name: 'Forêt Ancienne',
    x: 16 * TILE,
    y: 0,
    w: 16 * TILE,
    h: WORLD_HEIGHT,
    color: '#14532d'
  },
  {
    name: 'Montagnes Brisées',
    x: 32 * TILE,
    y: 0,
    w: 16 * TILE,
    h: WORLD_HEIGHT,
    color: '#334155'
  },
  finalZone
];

const templeGroundPattern = createTempleGroundPattern();

let gameStarted = false;
let selectedClass = null;
let currentZone = 'Temple Chinois';
let hintMessage = 'Objectif: explore les cerisiers';
let inventoryOpen = false;
let inventoryItems = [];

const player = {
  x: 8 * TILE,
  y: WORLD_HEIGHT / 2,
  width: 26,
  height: 26,
  speed: 3,
  health: 100,
  maxHealth: 100,
  mage: 0,
  force: 0,
  className: '',
  hasStarterWeapon: false,
  hasStarterShield: false,
  hasStarterPotions: false
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

  if (key === 'b') {
    toggleInventory();
    event.preventDefault();
    return;
  }

  if (key === 'e') {
    handleInteract();
  }

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
  starterChest.isOpened = false;
  entryBarrier.isOpen = false;
  finalBarrier.isOpen = false;
  player.hasStarterWeapon = false;
  player.hasStarterShield = false;
  player.hasStarterPotions = false;
  forestChests.forEach((chest) => {
    chest.isOpened = false;
  });
  hintMessage = 'Objectif: explore les cerisiers';

  if (choice === 'sorcier') {
    player.className = 'Sorcier';
    player.maxHealth = 100;
    player.health = 100;
    player.mage = 100;
    player.force = 50;
    player.speed = 3.2;
  } else {
    player.className = 'Barbare';
    player.maxHealth = 120;
    player.health = 120;
    player.mage = 50;
    player.force = 100;
    player.speed = 2.8;
  }

  characterScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  buildInventory(choice);
  closeInventory();
  updateHealthHud();
  gameStarted = true;
  requestAnimationFrame(gameLoop);
}

function update() {
  if (inventoryOpen) {
    playerInfo.textContent = `${player.className} | Force: ${player.force} | Mage: ${player.mage} | Zone: ${currentZone} | Inventaire ouvert`;
    updateHealthHud();
    return;
  }

  const prevX = player.x;
  const prevY = player.y;

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

  if (isBlockedByWorld()) {
    player.x = prevX;
    player.y = prevY;
  }

  updateFinalBoss();

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

  playerInfo.textContent = `${player.className} | Force: ${player.force} | Mage: ${player.mage} | Zone: ${currentZone} | Portail: ${entryBarrier.isOpen ? 'Ouvert' : 'Fermé'}`;
  updateHealthHud();

  const nearbyForestChest = getNearbyForestChest();

  if (!starterChest.isOpened) {
    if (distanceToStarterChest() < 80) {
      hintMessage = 'Coffre trouvé ! Appuie sur E pour l’ouvrir';
    } else {
      hintMessage = 'Objectif: explore les cerisiers';
    }
  } else if (nearbyForestChest) {
    hintMessage = 'Coffre de forêt: appuie sur E';
  } else if (!finalBarrier.isOpen && distanceToFinalBarrier() < 120) {
    hintMessage = 'Barrière du sanctuaire: appuie sur E';
  } else if (!entryBarrier.isOpen && distanceToBarrier() < 90) {
    hintMessage = 'Appuie sur E pour ouvrir la barrière';
  } else if (entryBarrier.isOpen) {
    hintMessage = 'Le portail est ouvert, explore le monde';
  } else {
    hintMessage = 'Objectif suivant: trouve la sortie du temple';
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawZones();
  drawGrid();
  drawTempleRiver();
  drawFinalMoat();
  drawTempleDecoration();
  drawFinalTempleDecoration();
  drawForestTrees();
  drawTempleTrees();
  drawForestChests();
  drawRiverBridges();
  drawFinalAccessBridge();
  drawFinalGateWall();
  drawFinalPortal();
  drawStarterChest();
  drawFinalBarrier();
  drawFinalBoss();
  drawBarrier();
  drawPlayer();
  drawMiniMap();
  drawHint();
}

function drawFinalTempleDecoration() {
  const originX = finalTempleLayout.x - camera.x;
  const originY = finalTempleLayout.y - camera.y;

  drawPagoda(originX + 20, originY + 20, 220, 5);
  drawTempleMain(originX + 300, originY + 120, 350, 210);
  drawPagoda(originX + 720, originY + 40, 220, 5);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('Temple du Crépuscule', originX + 350, originY + 370);
}

function drawFinalBarrier() {
  const x = finalBarrier.x - camera.x;
  const y = finalBarrier.y - camera.y;

  ctx.fillStyle = '#111827';
  ctx.fillRect(x, y, finalBarrier.w, finalBarrier.h);

  if (!finalBarrier.isOpen) {
    ctx.fillStyle = '#dc2626';
    for (let i = 0; i < 3; i += 1) {
      ctx.fillRect(x + 8 + i * 18, y + 3, 10, finalBarrier.h - 6);
    }
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px Arial';
  ctx.fillText('Barrière du portail', x - 8, y - 10);
}

function drawFinalMoat() {
  const x = finalMoat.x - camera.x;
  const y = finalMoat.y - camera.y;

  ctx.fillStyle = '#1e3a3f';
  ctx.fillRect(x - 14, y - 14, finalMoat.w + 28, finalMoat.h + 28);
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(x, y, finalMoat.w, finalMoat.h);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(x + 12, y + 8, finalMoat.w - 24, finalMoat.h - 16);

  ctx.fillStyle = 'rgba(186, 230, 253, 0.6)';
  for (let yy = y + 20; yy < y + finalMoat.h - 20; yy += 52) {
    ctx.beginPath();
    ctx.ellipse(x + finalMoat.w * 0.35, yy, 10, 3, 0.2, 0, Math.PI * 2);
    ctx.ellipse(x + finalMoat.w * 0.7, yy + 20, 8, 3, -0.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFinalAccessBridge() {
  const x = finalAccessBridge.x - camera.x;
  const y = finalAccessBridge.y - camera.y;

  ctx.fillStyle = '#6b7280';
  ctx.fillRect(x - 10, y + finalAccessBridge.h - 4, 12, 24);
  ctx.fillRect(x + finalAccessBridge.w - 2, y + finalAccessBridge.h - 4, 12, 24);

  ctx.fillStyle = '#92400e';
  ctx.fillRect(x, y, finalAccessBridge.w, finalAccessBridge.h);

  ctx.fillStyle = '#fed7aa';
  for (let plankX = x + 12; plankX < x + finalAccessBridge.w - 10; plankX += 20) {
    ctx.fillRect(plankX, y + 7, 12, finalAccessBridge.h - 14);
  }

  ctx.strokeStyle = '#fcd34d';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, finalAccessBridge.w - 2, finalAccessBridge.h - 2);
}

function drawFinalPortal() {
  const x = finalPortal.x - camera.x;
  const y = finalPortal.y - camera.y;

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x, y, finalPortal.w, finalPortal.h);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(x + 10, y + 14, finalPortal.w - 20, finalPortal.h - 14);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x + 6, y + 4, finalPortal.w - 12, 8);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px Arial';
  ctx.fillText('Portail final', x - 4, y - 10);
}

function drawFinalGateWall() {
  const x = finalGateWall.x - camera.x;
  const y = finalGateWall.y - camera.y;
  const topH = finalGateWall.gapY - finalGateWall.y;
  const bottomY = finalGateWall.gapY + finalGateWall.gapH;
  const bottomH = finalGateWall.y + finalGateWall.h - bottomY;

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x, y, finalGateWall.w, topH);
  ctx.fillRect(x, bottomY - camera.y, finalGateWall.w, bottomH);

  ctx.fillStyle = '#991b1b';
  ctx.fillRect(x + 6, y, 6, topH);
  ctx.fillRect(x + 6, bottomY - camera.y, 6, bottomH);

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + finalGateWall.w - 10, y, 4, topH);
  ctx.fillRect(x + finalGateWall.w - 10, bottomY - camera.y, 4, bottomH);
}

function drawFinalBoss() {
  const x = finalBoss.x - camera.x;
  const y = finalBoss.y - camera.y;

  ctx.fillStyle = '#3f3f46';
  ctx.fillRect(x + 4, y + 16, 56, 24);
  ctx.fillStyle = '#52525b';
  ctx.fillRect(x + 10, y + 10, 40, 12);

  ctx.fillStyle = '#1f2937';
  ctx.fillRect(x + 6, y + 38, 8, 14);
  ctx.fillRect(x + 20, y + 38, 8, 14);
  ctx.fillRect(x + 38, y + 38, 8, 14);
  ctx.fillRect(x + 52, y + 38, 8, 14);

  ctx.fillStyle = '#71717a';
  ctx.fillRect(x + 46, y + 6, 18, 18);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 50, y + 10, 10, 5);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + 52, y + 16, 6, 6);

  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(x + 30, y + 4, 14, 16);
  ctx.fillStyle = '#6b7280';
  ctx.fillRect(x + 29, y + 2, 16, 3);
  ctx.fillStyle = '#475569';
  ctx.fillRect(x + 31, y + 20, 12, 6);

  ctx.fillStyle = '#d4d4d8';
  ctx.beginPath();
  ctx.ellipse(x + 37, y - 2, 10, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111827';
  ctx.fillRect(x + 32, y - 4, 3, 3);
  ctx.fillRect(x + 39, y - 4, 3, 3);
  ctx.fillStyle = '#71717a';
  ctx.fillRect(x + 34, y + 4, 6, 2);

  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(x + 17, y + 8, 3, 18);
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(x + 16, y - 10, 5, 18);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(x + 15, y - 12, 7, 3);

  ctx.strokeStyle = '#6b7280';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 24, y + 26);
  ctx.lineTo(x + 30, y + 34);
  ctx.stroke();

  ctx.fillStyle = '#e5e7eb';
  ctx.font = '12px Arial';
  ctx.fillText('Boss final', x - 4, y - 8);
}

function updateFinalBoss() {
  finalBoss.x += finalBoss.dirX * finalBoss.speed;
  finalBoss.y += finalBoss.dirY * finalBoss.speed;

  if (finalBoss.x < finalBoss.minX || finalBoss.x > finalBoss.maxX) {
    finalBoss.dirX *= -1;
  }
  if (finalBoss.y < finalBoss.minY || finalBoss.y > finalBoss.maxY) {
    finalBoss.dirY *= -1;
  }
}

function drawForestTrees() {
  forestTrees.forEach((tree) => {
    const x = tree.x - camera.x;
    const y = tree.y - camera.y;
    const crown = 30 * tree.size;
    const trunkW = 10 * tree.size;
    const trunkH = 30 * tree.size;

    ctx.fillStyle = '#4d2d1b';
    ctx.fillRect(x - trunkW / 2, y - trunkH / 2, trunkW, trunkH);

    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.arc(x, y - trunkH / 2 - 12, crown, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(x - crown * 0.42, y - trunkH / 2 - 20, crown * 0.56, 0, Math.PI * 2);
    ctx.arc(x + crown * 0.38, y - trunkH / 2 - 16, crown * 0.52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.arc(x - 6, y - trunkH / 2 - 10, 2.2, 0, Math.PI * 2);
    ctx.arc(x + 8, y - trunkH / 2 - 6, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawForestChests() {
  forestChests.forEach((chest) => {
    const x = chest.x - camera.x;
    const y = chest.y - camera.y;

    const glowPulse = (Math.sin(Date.now() * 0.006 + chest.x) + 1) / 2;
    const glowAlpha = chest.isOpened ? 0.14 : 0.32 + glowPulse * 0.25;

    ctx.fillStyle = `rgba(74, 222, 128, ${glowAlpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.ellipse(x + chest.w / 2, y + chest.h / 2, chest.w / 2 + 12, chest.h / 2 + 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(x, y + 8, chest.w, chest.h - 8);
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(x + 2, y + 2, chest.w - 4, 10);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x + chest.w / 2 - 3, y + 10, 6, 8);

    if (chest.isOpened) {
      ctx.fillStyle = '#bbf7d0';
      ctx.fillRect(x + 4, y - 2, chest.w - 8, 4);
    }
  });
}

function drawStarterChest() {
  const x = starterChest.x - camera.x;
  const y = starterChest.y - camera.y;

  const glowPulse = (Math.sin(Date.now() * 0.007) + 1) / 2;
  const glowAlpha = starterChest.isOpened ? 0.2 : 0.45 + glowPulse * 0.35;
  const glowSize = starterChest.isOpened ? 10 : 18 + glowPulse * 8;

  ctx.fillStyle = `rgba(251, 191, 36, ${glowAlpha.toFixed(3)})`;
  ctx.beginPath();
  ctx.ellipse(
    x + starterChest.w / 2,
    y + starterChest.h / 2,
    starterChest.w / 2 + glowSize,
    starterChest.h / 2 + glowSize * 0.7,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  if (!starterChest.isOpened) {
    ctx.fillStyle = 'rgba(255, 255, 200, 0.85)';
    ctx.beginPath();
    ctx.arc(x + 5, y + 4, 2.2, 0, Math.PI * 2);
    ctx.arc(x + starterChest.w - 7, y + 6, 2, 0, Math.PI * 2);
    ctx.arc(x + starterChest.w / 2, y - 3, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(x, y + 8, starterChest.w, starterChest.h - 8);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(x + 2, y + 2, starterChest.w - 4, 10);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x + starterChest.w / 2 - 3, y + 10, 6, 8);

  if (starterChest.isOpened) {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(x + 4, y - 2, starterChest.w - 8, 4);
  }
}

function drawZones() {
  zones.forEach((zone) => {
    const x = zone.x - camera.x;
    const y = zone.y - camera.y;
    if (zone.name === 'Temple Chinois') {
      ctx.fillStyle = '#3b342f';
      ctx.fillRect(x, y, zone.w, zone.h);

      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = templeGroundPattern || '#3b342f';
      ctx.fillRect(0, 0, zone.w, zone.h);
      ctx.restore();

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(x, y, zone.w, zone.h);
    } else {
      ctx.fillStyle = zone.color;
      ctx.fillRect(x, y, zone.w, zone.h);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(x, y, zone.w, zone.h);
    }

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(zone.name, x + 14, y + 28);
  });
}

function createTempleGroundPattern() {
  const tile = document.createElement('canvas');
  tile.width = 192;
  tile.height = 192;
  const patternCtx = tile.getContext('2d');

  patternCtx.fillStyle = '#3f444a';
  patternCtx.fillRect(0, 0, tile.width, tile.height);

  const cell = 32;
  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const seed = (row * 31 + col * 19) % 17;
      const x = col * cell + 2 + (seed % 4);
      const y = row * cell + 2 + ((seed * 3) % 4);
      const width = 22 + (seed % 10);
      const height = 18 + ((seed * 2) % 12);

      patternCtx.fillStyle = '#6b7077';
      patternCtx.fillRect(x, y, width, height);

      patternCtx.fillStyle = '#80858c';
      patternCtx.fillRect(x + 2, y + 2, width - 4, Math.max(3, height * 0.24));

      patternCtx.fillStyle = '#5b6067';
      patternCtx.fillRect(x + 2, y + height - 5, width - 4, 3);

      patternCtx.strokeStyle = '#2f3439';
      patternCtx.lineWidth = 2;
      patternCtx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);

      patternCtx.strokeStyle = '#4a4f56';
      patternCtx.lineWidth = 1;
      patternCtx.beginPath();
      patternCtx.moveTo(x + 6, y + 6 + (seed % 5));
      patternCtx.lineTo(x + width - 6, y + height - 6);
      patternCtx.moveTo(x + width * 0.55, y + 4);
      patternCtx.lineTo(x + width * 0.35, y + height - 4);
      patternCtx.stroke();

      patternCtx.fillStyle = '#8f949b';
      patternCtx.fillRect(x + 4 + (seed % 5), y + 6 + (seed % 4), 2, 2);
      patternCtx.fillRect(x + width - 7, y + height - 8, 2, 2);
    }
  }

  patternCtx.fillStyle = 'rgba(203, 213, 225, 0.18)';
  for (let i = 0; i < 220; i += 1) {
    const x = (i * 37) % tile.width;
    const y = (i * 61) % tile.height;
    patternCtx.fillRect(x, y, 1.2, 1.2);
  }

  return ctx.createPattern(tile, 'repeat');
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
  const originX = templeLayout.x - camera.x;
  const originY = templeLayout.y - camera.y;

  drawTempleAtmosphere(originX, originY);
  drawTempleCourtyard(originX, originY);
  drawPagoda(originX + 10, originY + 20, 180, 5);
  drawTempleMain(originX + 220, originY + 120, 290, 168);
  drawTorii(originX + 290, originY + 70, 170, 150);
  drawPagoda(originX + 540, originY + 40, 190, 4);
  drawTempleFence(originX, originY);
  drawLanternRow(originX, originY);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('Temple Impérial des Brumes', originX + 238, originY + 320);
}

function drawPagoda(x, y, width, levels) {
  for (let i = 0; i < levels; i += 1) {
    const levelY = y + i * 46;
    const levelWidth = width - i * 14;
    const levelX = x + i * 7;

    ctx.fillStyle = '#be123c';
    ctx.fillRect(levelX + 10, levelY + 14, levelWidth - 20, 34);

    ctx.fillStyle = '#fb7185';
    ctx.fillRect(levelX + 14, levelY + 20, levelWidth - 28, 6);
    ctx.fillRect(levelX + 14, levelY + 34, levelWidth - 28, 4);

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(levelX - 10, levelY + 16);
    ctx.lineTo(levelX + levelWidth + 10, levelY + 16);
    ctx.lineTo(levelX + levelWidth - 8, levelY);
    ctx.lineTo(levelX + 8, levelY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(levelX + levelWidth / 2 - 2, levelY - 8, 4, 8);
  }

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(x + width / 2, y - 10, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawTempleMain(x, y, width, height) {
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(x, y + 46, width, height - 46);

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x + 12, y + 58, width - 24, height - 70);

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(x - 34, y + 48);
  ctx.lineTo(x + width + 34, y + 48);
  ctx.lineTo(x + width - 24, y + 4);
  ctx.lineTo(x + 24, y + 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 14, y + 48, width + 28, 6);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x + width / 2 - 16, y + 68, 32, 10);

  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(x + width / 2 - 40, y + 132, 80, 82);
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x + width / 2 - 34, y + 138, 68, 74);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(x + width / 2 - 4, y + 138, 8, 74);

  ctx.fillStyle = '#fca5a5';
  const windowWidth = 30;
  const windowHeight = 54;
  for (let i = 0; i < 6; i += 1) {
    const wx = x + 18 + i * 42;
    ctx.fillRect(wx, y + 92, windowWidth, windowHeight);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(wx + 14, y + 92, 4, windowHeight);
    ctx.fillStyle = '#fca5a5';
  }

  ctx.fillStyle = '#9ca3af';
  for (let i = 0; i < 6; i += 1) {
    ctx.fillRect(x + 10 + i * 48, y + height - 8, 30, 8);
  }
}

function drawTorii(x, y, width, height) {
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(x + 8, y + 40, 18, height - 40);
  ctx.fillRect(x + width - 26, y + 40, 18, height - 40);
  ctx.fillRect(x - 18, y + 22, width + 36, 15);
  ctx.fillRect(x + 8, y + 6, width - 16, 12);

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x + width / 2 - 7, y + 40, 14, height - 40);

  ctx.fillStyle = '#fca5a5';
  ctx.fillRect(x + 18, y + 30, width - 36, 4);
}

function drawTempleAtmosphere(originX, originY) {
  const cloudBaseY = originY - 50;
  ctx.fillStyle = 'rgba(241, 245, 249, 0.7)';
  drawCloud(originX + 40, cloudBaseY + 10, 32);
  drawCloud(originX + 260, cloudBaseY - 8, 28);
  drawCloud(originX + 520, cloudBaseY + 16, 34);

  ctx.fillStyle = 'rgba(251, 191, 36, 0.18)';
  ctx.beginPath();
  ctx.arc(originX + 370, originY + 6, 72, 0, Math.PI * 2);
  ctx.fill();
}

function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.arc(x + size * 0.55, y - 6, size * 0.42, 0, Math.PI * 2);
  ctx.arc(x + size * 1.08, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTempleCourtyard(originX, originY) {
  const courtY = originY + 300;
  ctx.fillStyle = '#374151';
  ctx.fillRect(originX + 80, courtY, 620, 64);

  ctx.fillStyle = '#6b7280';
  for (let i = 0; i < 19; i += 1) {
    ctx.fillRect(originX + 86 + i * 32, courtY + 6, 24, 10);
    ctx.fillRect(originX + 94 + i * 32, courtY + 24, 24, 10);
    ctx.fillRect(originX + 86 + i * 32, courtY + 42, 24, 10);
  }
}

function drawTempleFence(originX, originY) {
  const fenceY = originY + 282;
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(originX + 32, fenceY, 90, 10);
  ctx.fillRect(originX + 608, fenceY, 114, 10);

  for (let i = 0; i < 7; i += 1) {
    ctx.fillRect(originX + 40 + i * 12, fenceY - 16, 5, 26);
    ctx.fillRect(originX + 616 + i * 14, fenceY - 16, 5, 26);
  }
}

function drawLanternRow(originX, originY) {
  for (let i = 0; i < 4; i += 1) {
    const lx = originX + 170 + i * 145;
    const ly = originY + 286;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(lx, ly - 26, 6, 24);

    ctx.fillStyle = '#fb923c';
    ctx.fillRect(lx - 8, ly - 38, 22, 14);
    ctx.fillStyle = '#fdba74';
    ctx.fillRect(lx - 6, ly - 35, 18, 8);
  }
}

function drawRiverBridges() {
  riverBridges.forEach((bridge) => {
    const x = bridge.x - camera.x;
    const y = bridge.y - camera.y;
    const deckX = x + 8;
    const deckW = bridge.w - 16;
    const deckH = bridge.h;
    const archDepth = 16;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.beginPath();
    ctx.ellipse(x + bridge.w / 2, y + bridge.h / 2 + 10, 18, bridge.h * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#6b7280';
    ctx.fillRect(deckX - 10, y + 8, 8, 14);
    ctx.fillRect(deckX + deckW + 2, y + 8, 8, 14);
    ctx.fillRect(deckX - 10, y + bridge.h - 22, 8, 14);
    ctx.fillRect(deckX + deckW + 2, y + bridge.h - 22, 8, 14);

    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(deckX, y + bridge.h - 8);
    ctx.quadraticCurveTo(deckX + deckW / 2, y + bridge.h + archDepth, deckX + deckW, y + bridge.h - 8);
    ctx.lineTo(deckX + deckW - 3, y + bridge.h - 8);
    ctx.quadraticCurveTo(deckX + deckW / 2, y + bridge.h + archDepth - 8, deckX + 3, y + bridge.h - 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#92400e';
    ctx.fillRect(deckX, y, deckW, deckH);

    ctx.fillStyle = '#b45309';
    ctx.fillRect(deckX, y, deckW, 5);

    ctx.fillStyle = '#fed7aa';
    for (let plankY = y + 12; plankY < y + bridge.h - 12; plankY += 14) {
      ctx.fillRect(deckX + 3, plankY, deckW - 6, 8);
    }

    ctx.fillStyle = '#7c2d12';
    for (let railY = y + 10; railY <= y + bridge.h - 10; railY += 22) {
      ctx.fillRect(deckX - 6, railY, 4, 12);
      ctx.fillRect(deckX + deckW + 2, railY, 4, 12);
    }

    ctx.strokeStyle = '#fcd34d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(deckX - 2, y + 8);
    ctx.quadraticCurveTo(x + bridge.w / 2, y - 8, deckX + deckW + 2, y + 8);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(deckX - 2, y + bridge.h - 10);
    ctx.quadraticCurveTo(x + bridge.w / 2, y + bridge.h + 6, deckX + deckW + 2, y + bridge.h - 10);
    ctx.stroke();
  });
}

function drawBarrier() {
  const walls = getBarrierWallRects();
  const topWall = walls[0];
  const bottomWall = walls[1];

  const topX = topWall.x - camera.x;
  const topY = topWall.y - camera.y;
  const botX = bottomWall.x - camera.x;
  const botY = bottomWall.y - camera.y;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(topX, topY, topWall.w, topWall.h);
  ctx.fillRect(botX, botY, bottomWall.w, bottomWall.h);

  const bx = entryBarrier.x - camera.x;
  const by = entryBarrier.y - camera.y;

  ctx.fillStyle = '#111827';
  ctx.fillRect(bx + 18, by, 16, entryBarrier.h);

  if (!entryBarrier.isOpen) {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(bx, by + 16, entryBarrier.w, 18);
    ctx.fillRect(bx, by + 62, entryBarrier.w, 18);
    ctx.fillRect(bx, by + 108, entryBarrier.w, 18);
    ctx.fillRect(bx, by + 154, entryBarrier.w, 18);
    ctx.fillRect(bx, by + 200, entryBarrier.w, 18);
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = '13px Arial';
  ctx.fillText('Portail', bx - 8, by - 8);
}

function drawTempleTrees() {
  templeTrees.forEach((tree) => {
    const trunkWidth = 10 * tree.size;
    const trunkHeight = 24 * tree.size;
    const crownRadius = 26 * tree.size;

    const x = tree.x - camera.x;
    const y = tree.y - camera.y;

    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - trunkWidth / 2, y - trunkHeight / 2, trunkWidth, trunkHeight);

    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(x, y - trunkHeight / 2 - 8, crownRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f9a8d4';
    ctx.beginPath();
    ctx.arc(x - crownRadius * 0.45, y - trunkHeight / 2 - 14, crownRadius * 0.58, 0, Math.PI * 2);
    ctx.arc(x + crownRadius * 0.4, y - trunkHeight / 2 - 10, crownRadius * 0.52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(x - 8, y + 12, 2.4, 0, Math.PI * 2);
    ctx.arc(x + 6, y + 8, 2, 0, Math.PI * 2);
    ctx.arc(x + 12, y + 15, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawTempleRiver() {
  drawRiverPath(templeRiver.width + 28, '#1e3a3f');
  drawRiverPath(templeRiver.width + 10, '#1e40af');
  drawRiverPath(templeRiver.width * 0.66, '#38bdf8');

  const endPoint = templeRiver.points[templeRiver.points.length - 1];
  const endX = endPoint.x - camera.x;
  const endY = endPoint.y - camera.y;
  ctx.fillStyle = '#1e3a3f';
  ctx.beginPath();
  ctx.arc(endX, endY, templeRiver.width * 0.62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e40af';
  ctx.beginPath();
  ctx.arc(endX, endY, templeRiver.width * 0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(endX, endY, templeRiver.width * 0.31, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(186, 230, 253, 0.75)';
  for (let i = 0; i < templeRiver.points.length - 1; i += 1) {
    const p1 = templeRiver.points[i];
    const p2 = templeRiver.points[i + 1];
    const segmentLength = Math.hypot(p2.x - p1.x, p2.y - p1.y);

    for (let dist = 0; dist <= segmentLength; dist += templeRiver.waveStep) {
      const t = segmentLength === 0 ? 0 : dist / segmentLength;
      const worldX = p1.x + (p2.x - p1.x) * t;
      const worldY = p1.y + (p2.y - p1.y) * t;
      const x = worldX - camera.x;
      const y = worldY - camera.y;

      ctx.beginPath();
      ctx.ellipse(x + 8, y - 6, 7, 3, 0.2, 0, Math.PI * 2);
      ctx.ellipse(x - 9, y + 7, 6, 2.5, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawRiverPath(width, color) {
  ctx.beginPath();
  const firstPoint = templeRiver.points[0];
  ctx.moveTo(firstPoint.x - camera.x, firstPoint.y - camera.y);

  for (let i = 1; i < templeRiver.points.length - 1; i += 1) {
    const current = templeRiver.points[i];
    const next = templeRiver.points[i + 1];
    const controlX = current.x - camera.x;
    const controlY = current.y - camera.y;
    const endX = (current.x + next.x) / 2 - camera.x;
    const endY = (current.y + next.y) / 2 - camera.y;

    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  }

  const beforeLast = templeRiver.points[templeRiver.points.length - 2];
  const lastPoint = templeRiver.points[templeRiver.points.length - 1];
  ctx.quadraticCurveTo(
    beforeLast.x - camera.x,
    beforeLast.y - camera.y,
    lastPoint.x - camera.x,
    lastPoint.y - camera.y
  );

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawMiniMap() {
  const mapWidth = 208;
  const mapHeight = 132;
  const mapX = canvas.width - mapWidth - 16;
  const mapY = 16;

  ctx.fillStyle = 'rgba(2, 6, 23, 0.78)';
  ctx.fillRect(mapX, mapY, mapWidth, mapHeight);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(mapX, mapY, mapWidth, mapHeight);

  zones.forEach((zone) => {
    const zx = mapX + (zone.x / WORLD_WIDTH) * mapWidth;
    const zy = mapY + (zone.y / WORLD_HEIGHT) * mapHeight;
    const zw = (zone.w / WORLD_WIDTH) * mapWidth;
    const zh = (zone.h / WORLD_HEIGHT) * mapHeight;

    const zoneColor = zone.name === 'Temple Chinois' ? '#7f1d1d' : zone.color;
    ctx.fillStyle = zoneColor;
    ctx.fillRect(zx, zy, zw, zh);
  });

  ctx.beginPath();
  const miniFirst = templeRiver.points[0];
  ctx.moveTo(
    mapX + (miniFirst.x / WORLD_WIDTH) * mapWidth,
    mapY + (miniFirst.y / WORLD_HEIGHT) * mapHeight
  );
  for (let i = 1; i < templeRiver.points.length - 1; i += 1) {
    const current = templeRiver.points[i];
    const next = templeRiver.points[i + 1];
    const controlX = mapX + (current.x / WORLD_WIDTH) * mapWidth;
    const controlY = mapY + (current.y / WORLD_HEIGHT) * mapHeight;
    const endX = mapX + ((current.x + next.x) / 2 / WORLD_WIDTH) * mapWidth;
    const endY = mapY + ((current.y + next.y) / 2 / WORLD_HEIGHT) * mapHeight;
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  }
  const miniBeforeLast = templeRiver.points[templeRiver.points.length - 2];
  const miniLast = templeRiver.points[templeRiver.points.length - 1];
  ctx.quadraticCurveTo(
    mapX + (miniBeforeLast.x / WORLD_WIDTH) * mapWidth,
    mapY + (miniBeforeLast.y / WORLD_HEIGHT) * mapHeight,
    mapX + (miniLast.x / WORLD_WIDTH) * mapWidth,
    mapY + (miniLast.y / WORLD_HEIGHT) * mapHeight
  );
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke();

  riverBridges.forEach((bridge) => {
    const bx = mapX + (bridge.x / WORLD_WIDTH) * mapWidth;
    const by = mapY + (bridge.y / WORLD_HEIGHT) * mapHeight;
    const bw = (bridge.w / WORLD_WIDTH) * mapWidth;
    const bh = (bridge.h / WORLD_HEIGHT) * mapHeight;
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(bx, by, bw, Math.max(2, bh));
  });

  const playerMapX = mapX + ((player.x + player.width / 2) / WORLD_WIDTH) * mapWidth;
  const playerMapY = mapY + ((player.y + player.height / 2) / WORLD_HEIGHT) * mapHeight;
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(playerMapX, playerMapY, 3.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '11px Arial';
  ctx.fillText('Carte', mapX + 8, mapY + 14);
}

function drawHint() {
  const panelX = 16;
  const panelY = 84;
  const panelW = 430;
  const panelH = 38;

  ctx.fillStyle = 'rgba(2, 6, 23, 0.82)';
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 1;
  ctx.strokeRect(panelX + 0.5, panelY + 0.5, panelW - 1, panelH - 1);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(hintMessage, panelX + 12, panelY + 24);
}

function drawPlayer() {
  const px = player.x - camera.x;
  const py = player.y - camera.y;

  const isWizard = selectedClass === 'sorcier';

  ctx.fillStyle = isWizard ? '#a855f7' : '#f97316';
  ctx.fillRect(px, py, player.width, player.height);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 6, py + 6, 4, 4);
  ctx.fillRect(px + 16, py + 6, 4, 4);

  if (isWizard) {
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(px + player.width / 2, py - 14);
    ctx.lineTo(px + player.width - 2, py + 3);
    ctx.lineTo(px + 2, py + 3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.fillRect(px + 2, py + 2, player.width - 4, 4);

    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(px + 8, py + 16);
    ctx.lineTo(px + player.width / 2, py + 24);
    ctx.lineTo(px + player.width - 8, py + 16);
    ctx.closePath();
    ctx.fill();

    if (player.hasStarterWeapon) {
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(px + player.width + 2, py + 2, 3, 21);
      ctx.fillStyle = '#c4b5fd';
      ctx.fillRect(px + player.width + 1, py - 2, 5, 5);
    }

    if (player.hasStarterPotions) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(px - 8, py + 14, 4, 7);
      ctx.fillStyle = '#f0abfc';
      ctx.fillRect(px - 3, py + 15, 4, 6);
    }
  } else {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(px - 6, py + 7, 8, 13);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(px - 5, py + 9, 6, 9);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(px - 3, py + 11, 2, 2);

    if (player.hasStarterWeapon) {
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(px + player.width + 2, py + 2, 3, 16);
      ctx.fillRect(px + player.width + 1, py + 1, 5, 3);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(px + player.width + 2, py + 18, 3, 6);
    }

    if (player.hasStarterShield) {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(px - 10, py + 5);
      ctx.lineTo(px - 2, py + 5);
      ctx.lineTo(px - 2, py + 17);
      ctx.lineTo(px - 6, py + 22);
      ctx.lineTo(px - 10, py + 17);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function findCurrentZone() {
  const centerX = player.x + player.width / 2;

  if (centerX < 16 * TILE) return 'Temple Chinois';
  if (centerX < 32 * TILE) return 'Forêt Ancienne';
  if (centerX < 48 * TILE) return 'Montagnes Brisées';
  return 'Sanctuaire Final';
}

function isBlockedByWorld() {
  const colliders = [
    ...templeColliders,
    ...finalTempleColliders,
    ...getBarrierWallRects(),
    ...getGateColliderIfClosed(),
    ...getFinalGateWallColliders(),
    ...getFinalBarrierColliderIfClosed()
  ];

  if (isPlayerInRiver() && !isPlayerOnBridge()) {
    return true;
  }

  if (isPlayerInFinalMoat() && !isPlayerOnFinalAccessBridge()) {
    return true;
  }

  return colliders.some((rect) => isCollidingRect(player, rect));
}

function isPlayerInFinalMoat() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  return (
    centerX >= finalMoat.x &&
    centerX <= finalMoat.x + finalMoat.w &&
    centerY >= finalMoat.y &&
    centerY <= finalMoat.y + finalMoat.h
  );
}

function isPlayerOnFinalAccessBridge() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  return (
    centerX >= finalAccessBridge.x &&
    centerX <= finalAccessBridge.x + finalAccessBridge.w &&
    centerY >= finalAccessBridge.y &&
    centerY <= finalAccessBridge.y + finalAccessBridge.h
  );
}

function isPlayerOnBridge() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const crossingToleranceX = 10;
  const crossingToleranceY = 12;

  return riverBridges.some((bridge) => (
    centerX >= bridge.x - crossingToleranceX &&
    centerX <= bridge.x + bridge.w + crossingToleranceX &&
    centerY >= bridge.y - crossingToleranceY &&
    centerY <= bridge.y + bridge.h + crossingToleranceY
  ));
}

function isPlayerInRiver() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const riverRadius = templeRiver.width * 0.5 - 4;

  for (let i = 0; i < templeRiver.points.length - 1; i += 1) {
    const p1 = templeRiver.points[i];
    const p2 = templeRiver.points[i + 1];
    const distance = pointToSegmentDistance(centerX, centerY, p1.x, p1.y, p2.x, p2.y);
    if (distance <= riverRadius) {
      return true;
    }
  }

  const endPoint = templeRiver.points[templeRiver.points.length - 1];
  const endDistance = Math.hypot(centerX - endPoint.x, centerY - endPoint.y);
  if (endDistance <= templeRiver.width * 0.44) {
    return true;
  }

  return false;
}

function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }

  const projection = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const t = clamp(projection, 0, 1);
  const nearestX = x1 + t * dx;
  const nearestY = y1 + t * dy;
  return Math.hypot(px - nearestX, py - nearestY);
}

function distanceToBarrier() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const barrierCenterX = entryBarrier.x + entryBarrier.w / 2;
  const barrierCenterY = entryBarrier.y + entryBarrier.h / 2;
  return Math.hypot(centerX - barrierCenterX, centerY - barrierCenterY);
}

function handleInteract() {
  if (tryOpenStarterChest()) {
    return;
  }
  if (tryOpenForestChest()) {
    return;
  }
  if (tryOpenFinalBarrier()) {
    return;
  }
  tryOpenBarrier();
}

function tryOpenBarrier() {
  if (entryBarrier.isOpen) return;
  if (distanceToBarrier() < 90) {
    entryBarrier.isOpen = true;
  }
}

function tryOpenFinalBarrier() {
  if (finalBarrier.isOpen) return false;
  if (distanceToFinalBarrier() >= 120) return false;
  finalBarrier.isOpen = true;
  hintMessage = 'Barrière finale ouverte';
  return true;
}

function distanceToFinalBarrier() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const barrierCenterX = finalBarrier.x + finalBarrier.w / 2;
  const barrierCenterY = finalBarrier.y + finalBarrier.h / 2;
  return Math.hypot(centerX - barrierCenterX, centerY - barrierCenterY);
}

function tryOpenStarterChest() {
  if (starterChest.isOpened) return false;
  if (distanceToStarterChest() >= 80) return false;

  starterChest.isOpened = true;
  if (selectedClass === 'sorcier') {
    player.hasStarterWeapon = true;
    player.hasStarterPotions = true;
    addItemsToInventory(['Bâton novice', 'Potions x2']);
  } else {
    player.hasStarterWeapon = true;
    player.hasStarterShield = true;
    addItemsToInventory(['Épée courte', 'Bouclier rond']);
  }

  hintMessage = 'Coffre ouvert: équipement récupéré';
  return true;
}

function tryOpenForestChest() {
  const nearbyChest = getNearbyForestChest();
  if (!nearbyChest || nearbyChest.isOpened) {
    return false;
  }

  nearbyChest.isOpened = true;
  addItemsToInventory(nearbyChest.loot);
  hintMessage = 'Coffre de forêt ouvert: butin ajouté';
  return true;
}

function getNearbyForestChest() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  for (const chest of forestChests) {
    if (chest.isOpened) {
      continue;
    }

    const chestCenterX = chest.x + chest.w / 2;
    const chestCenterY = chest.y + chest.h / 2;
    const distance = Math.hypot(centerX - chestCenterX, centerY - chestCenterY);
    if (distance < 84) {
      return chest;
    }
  }

  return null;
}

function distanceToStarterChest() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const chestCenterX = starterChest.x + starterChest.w / 2;
  const chestCenterY = starterChest.y + starterChest.h / 2;
  return Math.hypot(centerX - chestCenterX, centerY - chestCenterY);
}

function updateHealthHud() {
  const ratio = player.maxHealth > 0 ? player.health / player.maxHealth : 0;
  const percent = clamp(Math.round(ratio * 100), 0, 100);

  if (healthFill) {
    healthFill.style.width = `${percent}%`;
  }

  if (healthText) {
    healthText.textContent = `${player.health} / ${player.maxHealth}`;
  }
}

function toggleInventory() {
  if (!gameStarted) return;
  inventoryOpen = !inventoryOpen;
  inventoryPanel.classList.toggle('hidden', !inventoryOpen);
}

function closeInventory() {
  inventoryOpen = false;
  inventoryPanel.classList.add('hidden');
}

function buildInventory(choice) {
  const wizardItems = [
    'Livre de sort',
    'Cristal arcanique',
    'Cape runique',
    'Parchemin de soin',
    'Clé du temple',
    'Herbes sacrées',
    'Encens',
    'Bourse'
  ];

  const barbarianItems = [
    'Hache lourde',
    'Ration de viande',
    'Pierre à feu',
    'Corde robuste',
    'Totem de guerre',
    'Potion de rage',
    'Clé du temple',
    'Bandages',
    'Torche'
  ];

  inventoryItems = [...(choice === 'sorcier' ? wizardItems : barbarianItems)];
  inventoryTitle.textContent = `Inventaire ${choice === 'sorcier' ? 'du Sorcier' : 'du Barbare'}`;
  renderInventory();
}

function addItemsToInventory(items) {
  items.forEach((item) => {
    if (!inventoryItems.includes(item)) {
      inventoryItems.push(item);
    }
  });
  renderInventory();
}

function renderInventory() {
  inventoryGrid.innerHTML = '';
  inventoryItems.forEach((item) => {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    const label = document.createElement('span');
    label.className = 'inventory-item';
    label.textContent = item;
    slot.appendChild(label);
    inventoryGrid.appendChild(slot);
  });
}

function getBarrierWallRects() {
  return [
    {
      x: entryBarrier.x,
      y: 0,
      w: entryBarrier.w,
      h: entryBarrier.y
    },
    {
      x: entryBarrier.x,
      y: entryBarrier.y + entryBarrier.h,
      w: entryBarrier.w,
      h: WORLD_HEIGHT - (entryBarrier.y + entryBarrier.h)
    }
  ];
}

function getGateColliderIfClosed() {
  if (entryBarrier.isOpen) return [];
  return [
    {
      x: entryBarrier.x,
      y: entryBarrier.y,
      w: entryBarrier.w,
      h: entryBarrier.h
    }
  ];
}

function getFinalBarrierColliderIfClosed() {
  if (finalBarrier.isOpen) return [];
  return [
    {
      x: finalBarrier.x,
      y: finalBarrier.y,
      w: finalBarrier.w,
      h: finalBarrier.h
    }
  ];
}

function getFinalGateWallColliders() {
  const topH = finalGateWall.gapY - finalGateWall.y;
  const bottomY = finalGateWall.gapY + finalGateWall.gapH;
  const bottomH = finalGateWall.y + finalGateWall.h - bottomY;

  return [
    {
      x: finalGateWall.x,
      y: finalGateWall.y,
      w: finalGateWall.w,
      h: topH
    },
    {
      x: finalGateWall.x,
      y: bottomY,
      w: finalGateWall.w,
      h: bottomH
    }
  ];
}

function isCollidingRect(entity, rect) {
  return !(
    entity.x + entity.width <= rect.x ||
    entity.x >= rect.x + rect.w ||
    entity.y + entity.height <= rect.y ||
    entity.y >= rect.y + rect.h
  );
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
