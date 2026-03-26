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
const dragonDialog = document.getElementById('dragon-dialog');
const dragonDialogQuestion = document.getElementById('dragon-dialog-question');
const dragonDialogForm = document.getElementById('dragon-dialog-form');
const dragonDialogInput = document.getElementById('dragon-dialog-input');
const dragonDialogCancel = document.getElementById('dragon-dialog-cancel');
const titleScreen = document.getElementById('title-screen');
const setupScreen = document.getElementById('setup-screen');
const playButton = document.getElementById('play-btn');
const backTitleButton = document.getElementById('back-title-btn');
const startAdventureButton = document.getElementById('start-adventure-btn');
const playerNameInput = document.getElementById('player-name-input');
const storyBriefing = document.getElementById('story-briefing');
const classChoiceButtons = document.querySelectorAll('.class-choice-btn');
const difficultyChoiceButtons = document.querySelectorAll('.difficulty-choice-btn');

const hungerFill = document.getElementById('hunger-fill');
const hungerText = document.getElementById('hunger-text');
const thirstFill = document.getElementById('thirst-fill');
const thirstText = document.getElementById('thirst-text');
const tempFill = document.getElementById('temp-fill');
const tempText = document.getElementById('temp-text');
const dayNightIndicator = document.getElementById('day-night-indicator');

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
  x: finalPortal.x,
  y: finalPortal.y,
  w: finalPortal.w,
  h: finalPortal.h,
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

const forestClearings = [
  { x: 910, y: 260, rx: 88, ry: 52 },
  { x: 1110, y: 510, rx: 108, ry: 62 },
  { x: 1330, y: 860, rx: 94, ry: 56 },
  { x: 980, y: 1120, rx: 84, ry: 48 }
];

const forestBushes = [
  { x: 870, y: 240, size: 0.95 },
  { x: 1010, y: 300, size: 1.1 },
  { x: 1170, y: 260, size: 0.9 },
  { x: 1280, y: 330, size: 1.05 },
  { x: 1450, y: 280, size: 0.88 },
  { x: 900, y: 630, size: 1.05 },
  { x: 1030, y: 770, size: 1.15 },
  { x: 1200, y: 700, size: 0.98 },
  { x: 1360, y: 760, size: 1.1 },
  { x: 1470, y: 670, size: 0.9 },
  { x: 890, y: 980, size: 1.12 },
  { x: 1020, y: 1070, size: 0.96 },
  { x: 1180, y: 990, size: 1.04 },
  { x: 1340, y: 1110, size: 1.08 },
  { x: 1460, y: 1030, size: 0.94 }
];

const forestRocks = [
  { x: 940, y: 220, w: 22, h: 14 },
  { x: 1080, y: 440, w: 26, h: 16 },
  { x: 1240, y: 520, w: 20, h: 13 },
  { x: 1410, y: 590, w: 24, h: 14 },
  { x: 980, y: 860, w: 18, h: 12 },
  { x: 1180, y: 920, w: 24, h: 15 },
  { x: 1320, y: 1040, w: 27, h: 16 },
  { x: 1460, y: 1150, w: 20, h: 12 }
];

const forestStumps = [
  { x: 890, y: 430, r: 10 },
  { x: 1120, y: 330, r: 11 },
  { x: 1290, y: 640, r: 9 },
  { x: 1435, y: 910, r: 12 },
  { x: 1000, y: 1180, r: 10 }
];

const forestFlowers = [
  { x: 845, y: 350, color: '#fde68a' },
  { x: 905, y: 365, color: '#fca5a5' },
  { x: 970, y: 410, color: '#f9a8d4' },
  { x: 1060, y: 570, color: '#fde68a' },
  { x: 1140, y: 640, color: '#bbf7d0' },
  { x: 1210, y: 780, color: '#fca5a5' },
  { x: 1290, y: 840, color: '#fde68a' },
  { x: 1380, y: 930, color: '#f9a8d4' },
  { x: 1460, y: 840, color: '#bbf7d0' },
  { x: 910, y: 1080, color: '#fde68a' },
  { x: 1000, y: 1150, color: '#fca5a5' },
  { x: 1125, y: 1070, color: '#bbf7d0' },
  { x: 1210, y: 1160, color: '#f9a8d4' },
  { x: 1320, y: 1200, color: '#fde68a' }
];

// === SYSTÈME DE FOYER MÉDIÉVAL ===
// Feu de camp fixe dans la forêt : s'allume progressivement avec le bois collecté
const medievalFoyer = {
  x: 1055,
  y: 695,
  radius: 30,
  woodCount: 0,     // bois accumulé
  maxWood: 9,       // plein feu
  // seuils: stage 0=éteint, 1=braises, 2=petite flamme, 3=feu moyen, 4=grand feu
  stages: [0, 2, 4, 6, 9]
};

const mountainHealingCherry = {
  x: 1770,
  y: 820,
  canopyRadius: 86,
  healRadius: 200,
  healAmount: 2,
  healIntervalMs: 700
};

const mountainBossKey = {
  x: 2208,
  y: 1092,
  radius: 16,
  isDropped: false,
  isCollected: false
};

const miniBosses = [
  {
    id: 'temple-guardian',
    name: 'Gardien du Temple',
    rewardItemId: 'legendaryHelmet',
    rewardLabel: 'Casque legendaire',
    x: 520,
    y: 1160,
    w: 34,
    h: 34,
    hp: 3,
    maxHp: 3,
    speed: 1.05,
    dirX: 1,
    dirY: 1,
    minX: 280,
    maxX: 700,
    minY: 980,
    maxY: 1360,
    color: '#f97316'
  },
  {
    id: 'forest-stalker',
    name: 'Traqueur Sylvestre',
    rewardItemId: 'healingPotion',
    rewardLabel: 'Potion de soin',
    x: 1110,
    y: 1040,
    w: 34,
    h: 34,
    hp: 3,
    maxHp: 3,
    speed: 1.18,
    dirX: 1,
    dirY: -1,
    minX: 900,
    maxX: 1380,
    minY: 900,
    maxY: 1260,
    color: '#22c55e'
  },
  {
    id: 'mountain-brute',
    name: 'Brute des Crêtes',
    rewardItemId: 'legendaryBoots',
    rewardLabel: 'Bottes legendaires',
    x: 1820,
    y: 980,
    w: 38,
    h: 38,
    hp: 4,
    maxHp: 4,
    speed: 0.92,
    dirX: -1,
    dirY: 1,
    minX: 1680,
    maxX: 2240,
    minY: 820,
    maxY: 1240,
    color: '#94a3b8'
  }
];

const miniBossSubBoss = {
  name: 'Cerbère des Crêtes',
  x: 2060,
  y: 940,
  w: 58,
  h: 52,
  hp: 8,
  maxHp: 8,
  speed: 1.3,
  dirX: 1,
  dirY: 1,
  minX: 1880,
  maxX: 2280,
  minY: 820,
  maxY: 1240,
  isUnlocked: false,
  isDefeated: false,
  // Attaque de flammes
  lastFireTime: 0,
  fireInterval: 1500, // Crache des flammes toutes les 1.5 secondes
  contactDamage: 2, // Dégâts au contact
  flameDamage: 1.5 // Dégâts par flamme
};

// Projectiles de flammes du Cerbère
const cerbereFlames = [];

const mountainHealingCherryPetals = Array.from({ length: 22 }, (_, index) => ({
  startX: -96 + (index % 8) * 24 + (index % 3) * 3,
  startY: -172 + Math.floor(index / 8) * 18,
  sway: 8 + (index % 5) * 2,
  speed: 22 + (index % 6) * 5,
  drift: index % 2 === 0 ? 1 : -1,
  size: 3 + (index % 3),
  delay: index * 0.23
}));

const mountainPeaks = [
  { x: 1595, baseY: 330, w: 210, h: 170 },
  { x: 1770, baseY: 300, w: 250, h: 220 },
  { x: 1985, baseY: 340, w: 230, h: 180 },
  { x: 2180, baseY: 310, w: 270, h: 210 }
];

const mountainPines = [
  { x: 1610, y: 610, size: 0.95 },
  { x: 1700, y: 700, size: 1.08 },
  { x: 1805, y: 640, size: 0.9 },
  { x: 1920, y: 730, size: 1.12 },
  { x: 2040, y: 680, size: 0.96 },
  { x: 2145, y: 780, size: 1.15 },
  { x: 2255, y: 700, size: 0.88 },
  { x: 1655, y: 980, size: 1.02 },
  { x: 1775, y: 1100, size: 1.18 },
  { x: 1890, y: 1010, size: 0.94 },
  { x: 2035, y: 1140, size: 1.1 },
  { x: 2165, y: 1040, size: 0.97 },
  { x: 2260, y: 1180, size: 1.08 }
];

const mountainBoulders = [
  { x: 1635, y: 560, w: 34, h: 22 },
  { x: 1740, y: 845, w: 42, h: 26 },
  { x: 1865, y: 760, w: 28, h: 18 },
  { x: 1975, y: 930, w: 36, h: 22 },
  { x: 2090, y: 820, w: 40, h: 25 },
  { x: 2205, y: 980, w: 32, h: 20 },
  { x: 2285, y: 700, w: 26, h: 16 }
];

const mountainShrines = [
  { x: 1710, y: 560, scale: 0.9 },
  { x: 2120, y: 900, scale: 1 }
];

const mountainGrassTufts = [
  { x: 1600, y: 540, size: 0.8 },
  { x: 1685, y: 620, size: 0.72 },
  { x: 1810, y: 820, size: 0.9 },
  { x: 1895, y: 940, size: 0.76 },
  { x: 1970, y: 700, size: 0.68 },
  { x: 2055, y: 1060, size: 0.84 },
  { x: 2160, y: 840, size: 0.8 },
  { x: 2240, y: 1120, size: 0.75 }
];

const mountainFlowerPatches = [
  { x: 1640, y: 1188, color: '#f472b6' },
  { x: 1735, y: 1148, color: '#e879f9' },
  { x: 1840, y: 1220, color: '#f43f5e' },
  { x: 1985, y: 1165, color: '#fb7185' },
  { x: 2100, y: 1240, color: '#f472b6' },
  { x: 2210, y: 1180, color: '#ec4899' }
];

// Dragon endormi au sommet des montagnes
const sleepingDragon = {
  x: 1770,
  y: 200,
  w: 120,
  h: 100,
  color: '#8b2e1a',
  accentColor: '#c23a1a',
  wingColor: '#a83a2a',
  flightHeight: 150,
  flightRange: 200
};

const dragonRiddle = {
  question: 'Je grandis quand je mange, mais je meurs quand je bois. Qui suis-je ?',
  acceptedAnswers: ['feu', 'le feu']
};

const mountainWallColliders = [];

// Barrière invisible à la hauteur du dragon (empêche de passer au-dessus)
const dragonTailBarrier = {
  x: 32 * TILE,
  y: 150,
  w: 16 * TILE,
  h: 100
};

const forestChests = [
  {
    x: 980,
    y: 520,
    w: 36,
    h: 26,
    isOpened: false,
    hasBeeTrap: true,
    loot: [
      { id: 'wood', quantity: 2 },
      { id: 'stone', quantity: 1 },
      { id: 'bandage', quantity: 1 }
    ]
  },
  {
    x: 1200,
    y: 860,
    w: 36,
    h: 26,
    isOpened: false,
    loot: [
      { id: 'cookedMeat', quantity: 2 },
      { id: 'waterFlask', quantity: 1 },
      { id: 'healingPotion', quantity: 1 }
    ]
  },
  {
    x: 1400,
    y: 420,
    w: 36,
    h: 26,
    isOpened: false,
    loot: [
      { id: 'berries', quantity: 3 },
      { id: 'bandage', quantity: 2 },
      { id: 'wood', quantity: 1 }
    ]
  }
];

const templeRiver = {
  width: 164,
  waveStep: 46,
  points: [
    { x: 18, y: 900 },
    { x: 22, y: 1235 },
    { x: 92, y: 1320 },
    { x: 860, y: 1320 },
    { x: 1500, y: 1320 },
    { x: 2200, y: 1320 },
    { x: 2860, y: 1320 }
  ]
};

const riverBridges = [
  {
    zone: 'Temple Chinois',
    x: 345,
    y: 1160,
    w: 58,
    h: 330
  },
  {
    zone: 'Forêt Ancienne',
    x: 1053,
    y: 1160,
    w: 58,
    h: 330
  },
  {
    zone: 'Montagnes Brisées',
    x: 1760,
    y: 1160,
    w: 58,
    h: 330
  }
];

const finalBoss = {
  x: finalZone.x + 800,
  y: 680,
  w: 56,
  h: 72,
  hp: 20,
  maxHp: 20,
  isDefeated: false,
  phase: 1,
  // Movement
  speed: 1.4,
  minX: finalZone.x + 340,
  maxX: finalZone.x + finalZone.w - 200,
  minY: 320,
  maxY: 1260,
  // Hit feedback
  lastHitTime: 0,
  invincibleMs: 500,
  flashEndTime: 0,
  enrageTime: 0,
  // Contact damage (cooldown-based)
  contactDamage: 2,
  lastContactTime: 0,
  contactCooldownMs: 700,
  // Orb attack
  lastOrbTime: 0,
  // Dash
  isDashing: false,
  dashVX: 0,
  dashVY: 0,
  dashStartTime: 0,
  dashDurationMs: 420,
  lastDashTime: 0,
  // Laser (phase 3)
  isLasering: false,
  laserAngle: 0,
  laserStartTime: 0,
  laserDurationMs: 2200,
  lastLaserTime: 0,
  lastLaserHitTime: 0
};

const finalBossOrbs = []; // { x, y, vx, vy, r, phase }

const zones = [
  templeZone,
    {
      name: 'Forêt Ancienne',
      x: 16 * TILE,
      y: 0,
      w: 16 * TILE,
      h: WORLD_HEIGHT,
      color: '#0b2e1f'
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
const forestGroundPattern = createForestGroundPattern();
const mountainGroundPattern = createMountainGroundPattern();
const finalZonePattern = createFinalZonePattern();

// Particules maléfiques pour la zone du boss
const evilParticles = [];
for (let i = 0; i < 60; i++) {
  evilParticles.push({
    x: finalZone.x + Math.random() * finalZone.w,
    y: Math.random() * WORLD_HEIGHT,
    size: 2 + Math.random() * 4,
    speed: 0.3 + Math.random() * 0.8,
    alpha: 0.3 + Math.random() * 0.5,
    color: Math.random() > 0.5 ? '#ef4444' : '#a855f7'
  });
}

// Flammes pour la zone du boss
const evilFlames = [];
for (let i = 0; i < 12; i++) {
  evilFlames.push({
    x: finalZone.x + 80 + i * 120,
    baseY: WORLD_HEIGHT - 60,
    phase: Math.random() * Math.PI * 2
  });
}

let gameStarted = false;
let selectedClass = 'barbare';
let selectedDifficulty = 'normal';
let currentZone = 'Temple Chinois';
let hintMessage = 'Objectif: explore les cerisiers';
let inventoryOpen = false;
let inventoryItems = [];
let mountainHealLastTick = 0;
let dragonRiddleSolved = false;
let isDragonDialogOpen = false;
let isGameOver = false;
let gameOverReason = '';
let isVictory = false;

// === SYSTÈME DE SURVIE ===
const survival = {
  hunger: 100,
  maxHunger: 100,
  thirst: 100,
  maxThirst: 100,
  temperature: 20, // en °C, optimal entre 15-25
  minTemp: -10,
  maxTemp: 45,
  
  // Taux de diminution (par seconde)
  hungerRate: 0.8,
  thirstRate: 1.2,
  
  // Dégâts de survie
  starvingDamage: 2,
  dehydrationDamage: 3,
  freezingDamage: 1.5,
  overheatDamage: 1,
  poisonDamagePerTick: 2,
  
  lastUpdate: 0,
  
  // Cycle jour/nuit
  dayTime: 360, // 6h00 du matin (en minutes, 0-1440)
  daySpeed: 2, // minutes de jeu par seconde réelle
  day: 1,
  
  // État
  isNight: false,
  nearCampfire: false,
  poisonUntil: 0,
  nextPoisonTick: 0
};

const difficultyLabels = {
  facile: 'Facile',
  normal: 'Normal',
  hardcore: 'Hardcore'
};

const baseDifficultySettings = {
  hungerRate: survival.hungerRate,
  thirstRate: survival.thirstRate,
  starvingDamage: survival.starvingDamage,
  dehydrationDamage: survival.dehydrationDamage,
  finalBossMaxHp: finalBoss.maxHp,
  finalBossContactDamage: finalBoss.contactDamage
};

// Ressources collectables dans le monde
const survivalResources = {
  berries: [], // Baies pour la faim
  waterSources: [], // Sources d'eau
  wood: [], // Bois
  stone: [], // Pierre
  campfires: [] // Feux de camp placés par le joueur
};

// Générer les ressources
function generateSurvivalResources() {
  // Baies dans la forêt
  for (let i = 0; i < 15; i++) {
    survivalResources.berries.push({
      x: 16 * TILE + 50 + Math.random() * (15 * TILE),
      y: 200 + Math.random() * (WORLD_HEIGHT - 400),
      collected: false,
      respawnTime: 0,
      hungerRestore: 15
    });
  }
  
  // Baies dans les montagnes
  for (let i = 0; i < 8; i++) {
    survivalResources.berries.push({
      x: 32 * TILE + 50 + Math.random() * (15 * TILE),
      y: 500 + Math.random() * (WORLD_HEIGHT - 700),
      collected: false,
      respawnTime: 0,
      hungerRestore: 20
    });
  }
  
  // Sources d'eau (près de la rivière)
  survivalResources.waterSources = [
    { x: 200, y: 1200, radius: 60, thirstRestore: 40 },
    { x: 600, y: 1280, radius: 50, thirstRestore: 35 },
    { x: 1100, y: 1280, radius: 55, thirstRestore: 40 },
    { x: 1800, y: 1280, radius: 50, thirstRestore: 35 },
    { x: 2400, y: 1280, radius: 45, thirstRestore: 30 }
  ];
  
  // Bois (arbres abattables)
  for (let i = 0; i < 12; i++) {
    survivalResources.wood.push({
      x: 16 * TILE + 80 + Math.random() * (14 * TILE),
      y: 150 + Math.random() * (WORLD_HEIGHT - 350),
      collected: false,
      respawnTime: 0
    });
  }
  
  // Pierre dans les montagnes
  for (let i = 0; i < 10; i++) {
    survivalResources.stone.push({
      x: 32 * TILE + 60 + Math.random() * (15 * TILE),
      y: 500 + Math.random() * (WORLD_HEIGHT - 600),
      collected: false,
      respawnTime: 0
    });
  }
}

// Recettes de crafting
const craftingRecipes = [
  { name: 'Feu de camp', ingredients: ['Bois x3', 'Pierre x2'], result: 'campfire' },
  { name: 'Bandage', ingredients: ['Herbes x2'], result: 'bandage' },
  { name: 'Torche', ingredients: ['Bois x1', 'Tissu x1'], result: 'torch' },
  { name: 'Viande cuite', ingredients: ['Viande crue x1', 'Feu'], result: 'cookedMeat' }
];

// Inventaire de ressources de survie
const survivalInventory = {
  wood: 0,
  stone: 0,
  berries: 0,
  poisonedBerries: 0,
  rawMeat: 0,
  cookedMeat: 0,
  herbs: 0,
  cloth: 0,
  water: 0
};

const beeSwarm = {
  isActive: false,
  isDefeated: false,
  x: 0,
  y: 0,
  speed: 2.25,
  orbitAngle: 0,
  orbitRadius: 14,
  hitRadius: 68,
  contactDamage: 1,
  damageCooldownMs: 450,
  lastDamageTime: 0
};

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
  displayName: 'Aventurier',
  hasStarterWeapon: false,
  hasStarterShield: false,
  hasStarterPotions: false,
  hasLegendaryArmor: false
};

const inventoryCategoryOrder = {
  equipment: 0,
  consumable: 1,
  resource: 2,
  quest: 3
};

const inventoryCategoryLabels = {
  equipment: 'Equipement',
  consumable: 'Consommable',
  resource: 'Ressource',
  quest: 'Quete'
};

const inventoryItemDefinitions = {
  shortSword: {
    label: 'Hache courte',
    category: 'equipment',
    description: '+15 Force. Equipee automatiquement.',
    stackable: false
  },
  noviceStaff: {
    label: 'Baton novice',
    category: 'equipment',
    description: '+18 Mage. Equipe automatiquement.',
    stackable: false
  },
  roundShield: {
    label: 'Bouclier rond',
    category: 'equipment',
    description: '+20 PV max. Equipe automatiquement.',
    stackable: false
  },
  bandage: {
    label: 'Bandage',
    category: 'consumable',
    description: 'Rend 25 PV.',
    stackable: true,
    useLabel: 'Soigner'
  },
  healingPotion: {
    label: 'Potion de soin',
    category: 'consumable',
    description: 'Rend 45 PV.',
    stackable: true,
    useLabel: 'Boire'
  },
  waterFlask: {
    label: 'Gourde',
    category: 'consumable',
    description: 'Restaure 35 de soif.',
    stackable: true,
    useLabel: 'Boire'
  },
  berries: {
    label: 'Baies',
    category: 'resource',
    description: 'Restaure 15 de faim.',
    stackable: true,
    useLabel: 'Manger'
  },
  cookedMeat: {
    label: 'Viande cuite',
    category: 'resource',
    description: 'Restaure 40 de faim.',
    stackable: true,
    useLabel: 'Manger'
  },
  wood: {
    label: 'Bois',
    category: 'resource',
    description: 'Sert a poser un feu de camp.',
    stackable: true
  },
  stone: {
    label: 'Pierre',
    category: 'resource',
    description: 'Sert a poser un feu de camp.',
    stackable: true
  },
  bossKey: {
    label: 'Cle du boss',
    category: 'quest',
    description: 'Ouvre la barriere du sanctuaire final.',
    stackable: false
  },
  legendaryHelmet: {
    label: 'Casque legendaire',
    category: 'equipment',
    description: 'Piece de set requise pour survivre au sanctuaire final.',
    stackable: false
  },
  legendaryArmor: {
    label: 'Armure legendaire',
    category: 'equipment',
    description: 'Piece de set requise pour survivre au sanctuaire final.',
    stackable: false
  },
  legendaryBoots: {
    label: 'Bottes legendaires',
    category: 'equipment',
    description: 'Piece de set requise pour survivre au sanctuaire final.',
    stackable: false
  }
};

const finalBossLegendaryRequirements = [
  { id: 'legendaryHelmet', label: 'Casque legendaire' },
  { id: 'legendaryArmor', label: 'Armure legendaire' },
  { id: 'legendaryBoots', label: 'Bottes legendaires' }
];

const resourceInventoryBindings = {
  wood: 'wood',
  stone: 'stone',
  berries: 'berries',
  cookedMeat: 'cookedMeat',
  waterFlask: 'water'
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

initializeIntroMenu();

if (playButton) {
  playButton.addEventListener('click', () => {
    showSetupScreen();
  });
}

if (backTitleButton) {
  backTitleButton.addEventListener('click', () => {
    showTitleScreen();
  });
}

classChoiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedClass = button.dataset.class || 'barbare';
    classChoiceButtons.forEach((btn) => btn.classList.toggle('is-selected', btn === button));
    updateIntroBriefing();
  });
});

difficultyChoiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedDifficulty = button.dataset.difficulty || 'normal';
    difficultyChoiceButtons.forEach((btn) => btn.classList.toggle('is-selected', btn === button));
    updateIntroBriefing();
  });
});

if (playerNameInput) {
  playerNameInput.addEventListener('input', () => {
    updateIntroBriefing();
  });
}

if (startAdventureButton) {
  startAdventureButton.addEventListener('click', () => {
    const desiredName = sanitizePlayerName(playerNameInput ? playerNameInput.value : '');
    startGame(selectedClass || 'barbare', selectedDifficulty || 'normal', desiredName);
  });
}

function initializeIntroMenu() {
  selectedClass = 'barbare';
  selectedDifficulty = 'normal';
  showTitleScreen();
  if (playerNameInput) {
    playerNameInput.value = 'Aventurier';
  }
  classChoiceButtons.forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.class === selectedClass);
  });
  difficultyChoiceButtons.forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.difficulty === selectedDifficulty);
  });
  updateIntroBriefing();
}

function showTitleScreen() {
  if (titleScreen) {
    titleScreen.classList.remove('hidden');
  }
  if (setupScreen) {
    setupScreen.classList.add('hidden');
  }
}

function showSetupScreen() {
  if (titleScreen) {
    titleScreen.classList.add('hidden');
  }
  if (setupScreen) {
    setupScreen.classList.remove('hidden');
  }
  if (playerNameInput) {
    playerNameInput.focus();
    playerNameInput.select();
  }
  updateIntroBriefing();
}

function sanitizePlayerName(rawName) {
  const cleaned = (rawName || '').replace(/\s+/g, ' ').trim();
  return cleaned.length > 0 ? cleaned.slice(0, 18) : 'Aventurier';
}

function getClassLabel(classChoice) {
  return classChoice === 'sorcier' ? 'Sorcier' : 'Barbare';
}

function getDifficultyLabel() {
  return difficultyLabels[selectedDifficulty] || 'Normal';
}

function updateIntroBriefing() {
  if (!storyBriefing) {
    return;
  }

  const heroName = sanitizePlayerName(playerNameInput ? playerNameInput.value : '');
  const classLabel = getClassLabel(selectedClass);
  const difficultyLabel = getDifficultyLabel();
  storyBriefing.textContent = `${heroName}, ${classLabel} des terres oubliées, approche du Temple des Brumes.\nSmaug détient l'Armure légendaire: réponds à son énigme pour espérer survivre.\nDifficulté ${difficultyLabel}: traverse les zones, complète ton set, puis affronte Maléficus.`;
}

function applyDifficultyPreset(difficulty) {
  survival.hungerRate = baseDifficultySettings.hungerRate;
  survival.thirstRate = baseDifficultySettings.thirstRate;
  survival.starvingDamage = baseDifficultySettings.starvingDamage;
  survival.dehydrationDamage = baseDifficultySettings.dehydrationDamage;
  finalBoss.maxHp = baseDifficultySettings.finalBossMaxHp;
  finalBoss.contactDamage = baseDifficultySettings.finalBossContactDamage;

  if (difficulty === 'facile') {
    player.maxHealth += 20;
    player.health = player.maxHealth;
    player.speed += 0.2;
    survival.hungerRate *= 0.8;
    survival.thirstRate *= 0.8;
    finalBoss.maxHp = Math.max(14, Math.round(baseDifficultySettings.finalBossMaxHp * 0.85));
    finalBoss.contactDamage = Math.max(1, baseDifficultySettings.finalBossContactDamage - 0.5);
    return;
  }

  if (difficulty === 'hardcore') {
    player.maxHealth = Math.max(70, player.maxHealth - 20);
    player.health = player.maxHealth;
    player.speed = Math.max(2.2, player.speed - 0.1);
    survival.hungerRate *= 1.3;
    survival.thirstRate *= 1.3;
    survival.starvingDamage *= 1.35;
    survival.dehydrationDamage *= 1.35;
    finalBoss.maxHp = Math.round(baseDifficultySettings.finalBossMaxHp * 1.25);
    finalBoss.contactDamage = baseDifficultySettings.finalBossContactDamage + 1;
  }
}

window.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

  if (!gameStarted) {
    if (key === 'Enter' && setupScreen && !setupScreen.classList.contains('hidden')) {
      if (startAdventureButton) {
        startAdventureButton.click();
      }
      event.preventDefault();
    }
    return;
  }

  if (isDragonDialogVisible()) {
    if (key === 'Escape') {
      closeDragonDialog();
      hintMessage = 'Smaug: Reviens me voir si tu oses repondre a mon enigme.';
      event.preventDefault();
    }
    return;
  }

  if (key === 'b') {
    toggleInventory();
    event.preventDefault();
    return;
  }

  if (key === 'e') {
    if (!handleInteract()) {
      tryCollectResource();
    }
    event.preventDefault();
    return;
  }

  if (key === 'f') {
    tryEatFood();
    event.preventDefault();
    return;
  }

  if (key === 'c') {
    tryPlaceCampfire();
    event.preventDefault();
    return;
  }

  if (key in keys) {
    keys[key] = true;
    event.preventDefault();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (!gameStarted) {
    return;
  }
  if (isDragonDialogVisible()) {
    if (key in keys) {
      keys[key] = false;
    }
    return;
  }
  if (key in keys) {
    keys[key] = false;
    event.preventDefault();
  }
});

dragonDialogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitDragonDialogAnswer();
});

dragonDialogCancel.addEventListener('click', () => {
  closeDragonDialog();
  hintMessage = 'Smaug: Reviens me voir si tu oses repondre a mon enigme.';
});

function startGame(choice, difficulty = 'normal', customName = 'Aventurier') {
  if (gameStarted) return;

  selectedClass = choice;
  selectedDifficulty = difficulty;
  player.displayName = sanitizePlayerName(customName);
  starterChest.isOpened = false;
  entryBarrier.isOpen = false;
  finalBarrier.isOpen = false;
  player.hasStarterWeapon = false;
  player.hasStarterShield = false;
  player.hasStarterPotions = false;
  player.hasLegendaryArmor = false;
  isDragonDialogOpen = false;
  dragonDialog.classList.add('hidden');
  
  // Reset position au spawn
  player.x = 8 * TILE;
  player.y = WORLD_HEIGHT / 2;
  camera.x = 0;
  camera.y = 0;
  
  // Reset survie
  survivalResources.campfires = [];
  medievalFoyer.woodCount = 0;
  survivalResources.berries.forEach(b => { b.collected = false; });
  survivalResources.wood.forEach(w => { w.collected = false; });
  survivalResources.stone.forEach(s => { s.collected = false; });
  survivalInventory.wood = 2;
  survivalInventory.stone = 1;
  survivalInventory.berries = 3;
  survivalInventory.poisonedBerries = 0;
  survivalInventory.rawMeat = 0;
  survivalInventory.cookedMeat = 0;
  survivalInventory.water = 1;
  
  forestChests.forEach((chest) => {
    chest.isOpened = false;
  });
  mountainBossKey.isDropped = false;
  mountainBossKey.isCollected = false;
  miniBosses.forEach((boss) => {
    boss.hp = boss.maxHp;
  });
  miniBossSubBoss.hp = miniBossSubBoss.maxHp;
  miniBossSubBoss.isUnlocked = false;
  miniBossSubBoss.isDefeated = false;
  beeSwarm.isActive = false;
  beeSwarm.isDefeated = false;
  beeSwarm.lastDamageTime = 0;
  mountainHealLastTick = 0;
  dragonRiddleSolved = false;
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

  applyDifficultyPreset(selectedDifficulty);

  characterScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  buildInventory(choice);
  inventoryItems = inventoryItems.filter((item) => !item.id.startsWith('legendary'));
  renderInventory();
  closeInventory();
  updateHealthHud();
  initSurvival();
  isGameOver = false;
  gameOverReason = '';
  isVictory = false;
  // Reset final boss
  finalBoss.x = finalZone.x + 800;
  finalBoss.y = 680;
  finalBoss.hp = finalBoss.maxHp;
  finalBoss.isDefeated = false;
  finalBoss.phase = 1;
  finalBoss.isDashing = false;
  finalBoss.isLasering = false;
  finalBoss.lastHitTime = 0;
  finalBoss.lastContactTime = 0;
  finalBoss.lastOrbTime = 0;
  finalBoss.lastDashTime = 0;
  finalBoss.lastLaserTime = 0;
  finalBoss.lastLaserHitTime = 0;
  finalBoss.flashEndTime = 0;
  finalBossOrbs.length = 0;
  gameStarted = true;
  requestAnimationFrame(gameLoop);
}

function update() {
  if (!isDragonDialogVisible() && isDragonDialogOpen) {
    isDragonDialogOpen = false;
  }

  if (inventoryOpen) {
    playerInfo.textContent = `${player.displayName} (${player.className}) | Diff: ${getDifficultyLabel()} | Force: ${player.force} | Mage: ${player.mage} | Zone: ${currentZone} | Inventaire ouvert`;
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

  updateMountainHealing();
  updateMiniBosses();
  updateFinalBoss();
  updateFinalBossOrbs();
  updateBeeSwarm();
  updateSurvival();
  checkEnemyCollision();

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

  playerInfo.textContent = `${player.displayName} (${player.className}) | Diff: ${getDifficultyLabel()} | Force: ${player.force} | Mage: ${player.mage} | Zone: ${currentZone} | Portail: ${entryBarrier.isOpen ? 'Ouvert' : 'Fermé'}`;
  updateHealthHud();

  const nearbyForestChest = getNearbyForestChest();

  if (beeSwarm.isActive) {
    hintMessage = '🐝 Abeilles en colère ! Attire-les vers un feu de camp allumé pour les disperser';
  } else if (!starterChest.isOpened) {
    if (distanceToStarterChest() < 80) {
      hintMessage = 'Coffre trouvé ! Appuie sur E pour l’ouvrir';
    } else {
      hintMessage = 'Objectif: explore les cerisiers';
    }
  } else if (nearbyForestChest) {
    hintMessage = 'Coffre de forêt: appuie sur E';
  } else if (distanceToFoyer() < 64) {
    if (medievalFoyer.woodCount >= medievalFoyer.maxWood) {
      hintMessage = '🔥 Foyer médiéval embrasé !';
    } else if (survivalInventory.wood > 0) {
      hintMessage = `🪵 Appuie sur E pour alimenter le foyer (${medievalFoyer.woodCount}/${medievalFoyer.maxWood} bûches)`;
    } else {
      hintMessage = '🪵 Foyer médiéval: ramasse du bois dans la forêt (E près des bûches)';
    }
  } else if (getNearbyMiniBoss()) {
    hintMessage = 'Mini-boss repéré: appuie sur E pour attaquer';
  } else if (isPlayerNearSubBoss() && !miniBossSubBoss.isDefeated) {
    hintMessage = miniBossSubBoss.isUnlocked
      ? 'Sous-boss: appuie sur E pour combattre'
      : `Bats d'abord les mini-boss (${countDefeatedMiniBosses()}/${miniBosses.length})`;
  } else if (!mountainBossKey.isCollected && mountainBossKey.isDropped && isPlayerNearMountainBossKey()) {
    hintMessage = 'La clé du grand boss est là: appuie sur E';
  } else if (isPlayerNearDragon()) {
    hintMessage = dragonRiddleSolved
      ? 'Smaug: l\'armure legendaire est a toi. Termine ton set et affronte Maleficus.'
      : 'Smaug t\'observe: appuie sur E pour repondre a son enigme et obtenir l\'Armure legendaire';
  } else if (isPlayerInMountainHealingZone()) {
    hintMessage = 'Cerisier sacré: la zone régénère +1 vie petit à petit';
  } else if (isPlayerNearMountainHealingTree()) {
    hintMessage = 'Montagnes: approche du cerisier sacré pour te soigner';
  } else if (isPlayerNearFinalBoss() && !finalBoss.isDefeated) {
    if (!hasFullLegendarySet()) {
      hintMessage = `Set legendaire incomplet: ${formatMissingLegendaryRequirements()}. Echec assure contre Maleficus.`;
    } else {
      const ph = finalBoss.phase;
      const phLabel = ph >= 3 ? ' ☠ RAGE' : ph >= 2 ? ' ⚔ Phase II' : '';
      hintMessage = `Maléficus${phLabel} — E pour frapper ! (${finalBoss.hp}/${finalBoss.maxHp} PV)`;
    }
  } else if (finalBoss.isDefeated && currentZone === 'Sanctuaire Final') {
    hintMessage = '🏆 Maléficus vaincu — Le royaume est en paix !';
  } else if (!finalBarrier.isOpen && distanceToFinalBarrier() < 120) {
    if (mountainBossKey.isCollected && !hasFullLegendarySet()) {
      hintMessage = `Barriere ouverte, mais set legendaire incomplet: ${formatMissingLegendaryRequirements()}`;
    } else {
      hintMessage = mountainBossKey.isCollected
        ? 'Barrière du sanctuaire: appuie sur E'
        : 'Il faut battre le sous-boss pour obtenir la clé';
    }
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
  drawForestDecor();
  drawMountainDecor();
  drawForestTrees();
  drawTempleTrees();
  drawMiniBosses();
  drawSubBoss();
  drawCerbereFlames();
  drawMountainHealingCherry();
  drawMountainBossKey();
  drawSleepingDragon();
  drawForestChests();
  drawRiverBridges();
  drawFinalAccessBridge();
  drawFinalGateWall();
  drawFinalPortal();
  drawStarterChest();
  drawFinalBarrier();
  drawFinalBoss();
  drawFinalBossOrbs();
  drawBarrier();
  drawMedievalFoyer();
  drawSurvivalResources();
  drawBeeSwarm();
  drawPlayer();
  drawNightOverlay();
  drawMiniMap();
  drawHint();
  drawSurvivalInventoryHUD();
  if (isVictory) drawVictory();
}

function drawMountainHealingCherry() {
  const x = mountainHealingCherry.x - camera.x;
  const y = mountainHealingCherry.y - camera.y;
  const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
  const time = Date.now() * 0.0007;

  ctx.save();

  // Ombre
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(x, y + 190, 92, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tronc
  ctx.strokeStyle = '#8b6f47';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x, y + 100);
  ctx.lineTo(x, y + 180);
  ctx.stroke();

  // Grandes branches
  ctx.strokeStyle = '#8b6f47';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 46, y + 84);
  ctx.lineTo(x - 18, y - 12);
  ctx.moveTo(x + 56, y + 84);
  ctx.lineTo(x + 22, y - 28);
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  const blossomClusters = [
    { dx: -72, dy: -134, r: 30 },
    { dx: -26, dy: -142, r: 36 },
    { dx: 28, dy: -148, r: 38 },
    { dx: 82, dy: -128, r: 30 },
    { dx: -94, dy: -92, r: 26 },
    { dx: -42, dy: -88, r: 34 },
    { dx: 12, dy: -94, r: 34 },
    { dx: 62, dy: -86, r: 30 },
    { dx: 104, dy: -78, r: 24 },
    { dx: -60, dy: -46, r: 28 },
    { dx: -8, dy: -36, r: 34 },
    { dx: 44, dy: -42, r: 30 }
  ];

  blossomClusters.forEach((cluster) => {
    ctx.beginPath();
    ctx.arc(x + cluster.dx, y + cluster.dy, cluster.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(x + cluster.dx - cluster.r * 0.24, y + cluster.dy - cluster.r * 0.12, cluster.r * 0.44, 0, Math.PI * 2);
    ctx.arc(x + cluster.dx + cluster.r * 0.22, y + cluster.dy + cluster.r * 0.08, cluster.r * 0.36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f472b6';
  });

  ctx.fillStyle = '#f9a8d4';
  for (let i = 0; i < 24; i += 1) {
    const petalX = x - 72 + i * 7;
    const petalY = y + 28 + (i % 6) * 10 + pulse * 2;
    ctx.beginPath();
    ctx.ellipse(petalX, petalY, 4, 2, 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  mountainHealingCherryPetals.forEach((petal) => {
    const fallCycle = (time * (petal.speed / 32) + petal.delay) % 7;
    const normalized = fallCycle / 7;
    const petalX = x + petal.startX + Math.sin(time * 1.8 + petal.delay) * petal.sway + normalized * 18 * petal.drift;
    const petalY = y + petal.startY + normalized * 240;
    const rotation = Math.sin(time * 4 + petal.delay) * 0.8;
    const alpha = 0.35 + (1 - normalized) * 0.45;

    ctx.save();
    ctx.translate(petalX, petalY);
    ctx.rotate(rotation);
    ctx.fillStyle = `rgba(251, 207, 232, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size, petal.size * 0.55, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(244, 114, 182, ${(alpha * 0.75).toFixed(3)})`;
    ctx.beginPath();
    ctx.ellipse(-0.8, -0.4, petal.size * 0.42, petal.size * 0.22, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px Arial';
  ctx.fillText('Cerisier sacré', x - 34, y - 168);

  ctx.restore();
}

function drawMountainBossKey() {
  if (mountainBossKey.isCollected || !mountainBossKey.isDropped) {
    return;
  }

  const x = mountainBossKey.x - camera.x;
  const y = mountainBossKey.y - camera.y;
  const pulse = (Math.sin(Date.now() * 0.006) + 1) / 2;

  ctx.save();
  ctx.fillStyle = `rgba(250, 204, 21, ${(0.18 + pulse * 0.18).toFixed(3)})`;
  ctx.beginPath();
  ctx.arc(x, y, 18 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(x - 4, y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x + 1, y - 3, 18, 6);
  ctx.fillRect(x + 10, y - 3, 5, 15);
  ctx.fillRect(x + 16, y - 3, 4, 10);

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x - 4, y, 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px Arial';
  ctx.fillText('Clé du boss', x - 28, y - 20);
  ctx.restore();
}

function drawSleepingDragon() {
  const time = Date.now() * 0.0006;
  const dx = sleepingDragon.x - camera.x;
  const dy = sleepingDragon.y - camera.y;
  const wingFlap = Math.sin(time * 2) * 0.25;
  
  ctx.save();
  
  // === OMBRE MASSIVE ===
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(dx + 20, dy + 120, 120, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === QUEUE MASSIVE ===
  ctx.strokeStyle = sleepingDragon.color;
  ctx.lineWidth = 25;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(dx - 60, dy + 40);
  ctx.bezierCurveTo(
    dx - 140, dy + 80,
    dx - 160, dy - 40,
    dx - 100, dy - 120
  );
  ctx.stroke();
  
  // Écailles de queue (grandes)
  ctx.fillStyle = sleepingDragon.accentColor;
  for (let i = 0; i < 8; i++) {
    const t = i / 8;
    const qx = dx - 60 + (t * -40);
    const qy = dy + 40 + (Math.sin(t * Math.PI * 2) * 80 - 100 * t);
    ctx.beginPath();
    ctx.ellipse(qx, qy, 8, 12, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // === AILES MASSIVES ===
  // Aile gauche
  ctx.fillStyle = sleepingDragon.wingColor;
  ctx.save();
  ctx.translate(dx - 50, dy - 20);
  ctx.rotate(wingFlap - 0.3);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-80, -120, -140, -100, -120, 20);
  ctx.lineTo(-60, 10);
  ctx.bezierCurveTo(-80, -80, -100, -60, -40, 0);
  ctx.closePath();
  ctx.fill();
  
  // Membranes de l'aile
  ctx.strokeStyle = sleepingDragon.accentColor;
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(-30 - i * 15, -10);
    ctx.lineTo(-80 - i * 20, -90 - i * 10);
    ctx.stroke();
  }
  ctx.restore();
  
  // Aile droite
  ctx.fillStyle = sleepingDragon.wingColor;
  ctx.save();
  ctx.translate(dx + 50, dy - 20);
  ctx.rotate(-wingFlap + 0.3);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(80, -120, 140, -100, 120, 20);
  ctx.lineTo(60, 10);
  ctx.bezierCurveTo(80, -80, 100, -60, 40, 0);
  ctx.closePath();
  ctx.fill();
  
  // Membranes droites
  ctx.strokeStyle = sleepingDragon.accentColor;
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(30 + i * 15, -10);
    ctx.lineTo(80 + i * 20, -90 - i * 10);
    ctx.stroke();
  }
  ctx.restore();
  
  // === CORPS PRINCIPAL ===
  ctx.fillStyle = sleepingDragon.color;
  ctx.beginPath();
  ctx.ellipse(dx, dy + 15, 70, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Écailles du corps (grandes et détaillées)
  ctx.fillStyle = sleepingDragon.accentColor;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const sx = dx - 55 + col * 22;
      const sy = dy - 20 + row * 18;
      ctx.beginPath();
      ctx.ellipse(sx, sy, 10, 14, 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // === COU ÉPAIS ===
  ctx.fillStyle = sleepingDragon.color;
  ctx.beginPath();
  ctx.moveTo(dx + 60, dy - 10);
  ctx.lineTo(dx + 80, dy - 40);
  ctx.lineTo(dx + 85, dy - 38);
  ctx.lineTo(dx + 65, dy - 8);
  ctx.closePath();
  ctx.fill();
  
  // Écailles du cou
  ctx.fillStyle = sleepingDragon.accentColor;
  for (let i = 0; i < 4; i++) {
    const nx = dx + 68 + i * 3;
    const ny = dy - 15 - i * 8;
    ctx.beginPath();
    ctx.ellipse(nx, ny, 7, 9, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // === TÊTE MASSIVE ET FÉROCE ===
  ctx.fillStyle = sleepingDragon.color;
  ctx.beginPath();
  // Forme de crâne de dragon
  ctx.moveTo(dx + 80, dy - 42);
  ctx.bezierCurveTo(dx + 100, dy - 60, dx + 130, dy - 65, dx + 150, dy - 50);
  ctx.lineTo(dx + 155, dy - 35);
  ctx.lineTo(dx + 150, dy - 20);
  ctx.lineTo(dx + 120, dy - 15);
  ctx.lineTo(dx + 85, dy - 25);
  ctx.closePath();
  ctx.fill();
  
  // Museau/Mâchoire inférieure
  ctx.fillStyle = sleepingDragon.accentColor;
  ctx.beginPath();
  ctx.moveTo(dx + 120, dy - 15);
  ctx.lineTo(dx + 155, dy - 20);
  ctx.lineTo(dx + 150, dy - 10);
  ctx.lineTo(dx + 120, dy - 5);
  ctx.closePath();
  ctx.fill();
  
  // Dents massives (supérieures)
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 6; i++) {
    const tx = dx + 125 + i * 8;
    const ty = dy - 22;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx + 3, ty + 10);
    ctx.lineTo(tx + 5, ty);
    ctx.closePath();
    ctx.fill();
  }
  
  // Dents massives (inférieures)
  for (let i = 0; i < 5; i++) {
    const tx = dx + 128 + i * 8;
    const ty = dy - 5;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx + 3, ty - 8);
    ctx.lineTo(tx + 5, ty);
    ctx.closePath();
    ctx.fill();
  }
  
  // Narines fumantes
  ctx.fillStyle = 'rgba(255, 100, 50, 0.5)';
  ctx.beginPath();
  ctx.ellipse(dx + 145, dy - 48, 6, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(dx + 145, dy - 38, 6, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Fumée des narines
  ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
  for (let i = 0; i < 3; i++) {
    const fx = dx + 150 + Math.sin(time + i) * 8;
    const fy = dy - 45 - i * 12;
    ctx.beginPath();
    ctx.arc(fx, fy, 4 + i * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // === YEUX PERÇANTS ===
  // Blanc de l'oeil
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(dx + 110, dy - 52, 8, 12, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(dx + 125, dy - 55, 8, 12, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Iris doré/rouge
  ctx.fillStyle = '#ff8800';
  ctx.beginPath();
  ctx.ellipse(dx + 110, dy - 52, 5, 8, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(dx + 125, dy - 55, 5, 8, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupilles verticales (menacantes)
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(dx + 110, dy - 52, 2, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(dx + 125, dy - 55, 2, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Regard de feu
  ctx.fillStyle = 'rgba(255, 100, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(dx + 110, dy - 52, 10, 14, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(dx + 125, dy - 55, 10, 14, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // === CORNES MASSIVES ===
  // Corne gauche
  ctx.strokeStyle = sleepingDragon.accentColor;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(dx + 105, dy - 62);
  ctx.bezierCurveTo(dx + 95, dy - 85, dx + 80, dy - 100, dx + 75, dy - 120);
  ctx.stroke();
  
  // Corne droite
  ctx.beginPath();
  ctx.moveTo(dx + 130, dy - 65);
  ctx.bezierCurveTo(dx + 145, dy - 90, dx + 160, dy - 110, dx + 170, dy - 130);
  ctx.stroke();
  
  // Pics crâniens
  ctx.fillStyle = sleepingDragon.accentColor;
  for (let i = 0; i < 3; i++) {
    const px = dx + 100 + i * 20;
    const py = dy - 68 - i * 3;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - 4, py - 14);
    ctx.lineTo(px + 4, py - 14);
    ctx.closePath();
    ctx.fill();
  }
  
  // === PATTES ===
  ctx.strokeStyle = sleepingDragon.color;
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  
  // Patte avant gauche
  ctx.beginPath();
  ctx.moveTo(dx - 40, dy + 50);
  ctx.lineTo(dx - 50, dy + 95);
  ctx.stroke();
  
  // Patte avant droite
  ctx.beginPath();
  ctx.moveTo(dx + 40, dy + 50);
  ctx.lineTo(dx + 50, dy + 95);
  ctx.stroke();
  
  // Patte arrière gauche
  ctx.beginPath();
  ctx.moveTo(dx - 60, dy + 35);
  ctx.lineTo(dx - 70, dy + 85);
  ctx.stroke();
  
  // Patte arrière droite
  ctx.beginPath();
  ctx.moveTo(dx + 60, dy + 35);
  ctx.lineTo(dx + 70, dy + 85);
  ctx.stroke();
  
  // Griffes des pattes
  ctx.fillStyle = sleepingDragon.accentColor;
  const pattesPos = [
    { x: dx - 50, y: dy + 95 },
    { x: dx + 50, y: dy + 95 },
    { x: dx - 70, y: dy + 85 },
    { x: dx + 70, y: dy + 85 }
  ];
  
  pattesPos.forEach(patte => {
    for (let g = 0; g < 4; g++) {
      ctx.beginPath();
      ctx.ellipse(patte.x - 6 + g * 3, patte.y + 8, 2, 5, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  // === NOM DU DRAGON ===
  ctx.fillStyle = 'rgba(200, 50, 50, 0.9)';
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SMAUG', dx, dy + 140);
  
  ctx.restore();
}

function drawMiniBosses() {
  miniBosses.forEach((boss) => {
    if (boss.hp <= 0) {
      return;
    }

    const x = boss.x - camera.x;
    const y = boss.y - camera.y;
    const hpRatio = boss.maxHp > 0 ? boss.hp / boss.maxHp : 0;
    const time = Date.now() * 0.003;
    const blink = Math.sin(time * 3) > 0.95;

    // === PERSONNAGE STYLE PIXEL ART ===
    
    // Cheveux bouclés noirs
    ctx.fillStyle = '#1a1a1a';
    // Base des cheveux
    ctx.fillRect(x + 4, y + 2, 28, 14);
    // Boucles du haut
    ctx.beginPath();
    ctx.arc(x + 10, y + 4, 6, 0, Math.PI * 2);
    ctx.arc(x + 18, y + 2, 5, 0, Math.PI * 2);
    ctx.arc(x + 26, y + 4, 6, 0, Math.PI * 2);
    ctx.arc(x + 6, y + 8, 4, 0, Math.PI * 2);
    ctx.arc(x + 30, y + 8, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Visage (peau mate)
    ctx.fillStyle = '#c68642';
    ctx.fillRect(x + 6, y + 12, 24, 20);
    
    // Oreilles
    ctx.fillStyle = '#b5651d';
    ctx.fillRect(x + 2, y + 16, 5, 8);
    ctx.fillRect(x + 29, y + 16, 5, 8);
    
    // Sourcils épais
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + 9, y + 15, 7, 2);
    ctx.fillRect(x + 20, y + 15, 7, 2);
    
    // Yeux (mi-clos style fatigué)
    if (!blink) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 18, 6, 4);
      ctx.fillRect(x + 20, y + 18, 6, 4);
      // Pupilles
      ctx.fillStyle = '#3d2314';
      ctx.fillRect(x + 12, y + 19, 3, 3);
      ctx.fillRect(x + 22, y + 19, 3, 3);
      // Paupières tombantes
      ctx.fillStyle = '#c68642';
      ctx.fillRect(x + 10, y + 17, 6, 2);
      ctx.fillRect(x + 20, y + 17, 6, 2);
    } else {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(x + 10, y + 19, 6, 1);
      ctx.fillRect(x + 20, y + 19, 6, 1);
    }
    
    // Nez
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(x + 16, y + 21, 4, 5);
    
    // Barbe naissante
    ctx.fillStyle = 'rgba(26, 26, 26, 0.3)';
    ctx.fillRect(x + 8, y + 28, 20, 4);
    
    // Bouche
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x + 13, y + 29, 10, 2);
    
    // Cou
    ctx.fillStyle = '#b5651d';
    ctx.fillRect(x + 14, y + 32, 8, 4);
    
    // T-shirt jaune moutarde
    ctx.fillStyle = '#d4a017';
    ctx.fillRect(x + 4, y + 35, 28, 14);
    // Col du t-shirt
    ctx.fillStyle = '#c49000';
    ctx.beginPath();
    ctx.moveTo(x + 14, y + 35);
    ctx.lineTo(x + 18, y + 39);
    ctx.lineTo(x + 22, y + 35);
    ctx.closePath();
    ctx.fill();
    
    // Manches
    ctx.fillStyle = '#d4a017';
    ctx.fillRect(x, y + 36, 6, 8);
    ctx.fillRect(x + 30, y + 36, 6, 8);

    // Barre de vie
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(x, y - 8, boss.w, 5);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x, y - 8, boss.w * hpRatio, 5);
  });
}

function drawSubBoss() {
  if (!miniBossSubBoss.isUnlocked || miniBossSubBoss.isDefeated) {
    return;
  }

  const x = miniBossSubBoss.x - camera.x;
  const y = miniBossSubBoss.y - camera.y;
  const hpRatio = miniBossSubBoss.maxHp > 0 ? miniBossSubBoss.hp / miniBossSubBoss.maxHp : 0;
  const time = Date.now() * 0.005;
  const breathe = Math.sin(time) * 2;

  // === CERBÈRE À TROIS TÊTES ===
  
  // Corps principal (violet/gris)
  ctx.fillStyle = '#6b5b7a';
  ctx.fillRect(x + 8, y + 20, 38, 22);
  
  // Dos avec épines
  ctx.fillStyle = '#8b7b9a';
  ctx.fillRect(x + 12, y + 16, 30, 6);
  
  // Pattes arrières
  ctx.fillStyle = '#5a4a6a';
  ctx.fillRect(x + 8, y + 38, 8, 12);
  ctx.fillRect(x + 18, y + 38, 8, 12);
  
  // Pattes avant
  ctx.fillRect(x + 32, y + 38, 8, 12);
  ctx.fillRect(x + 42, y + 38, 8, 12);
  
  // Griffes orange/feu
  ctx.fillStyle = '#f97316';
  ctx.fillRect(x + 8, y + 48, 8, 4);
  ctx.fillRect(x + 18, y + 48, 8, 4);
  ctx.fillRect(x + 32, y + 48, 8, 4);
  ctx.fillRect(x + 42, y + 48, 8, 4);
  
  // Queue enflammée
  ctx.fillStyle = '#5a4a6a';
  ctx.beginPath();
  ctx.moveTo(x, y + 26);
  ctx.lineTo(x - 10, y + 20 + breathe);
  ctx.lineTo(x - 8, y + 30);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 20 + breathe);
  ctx.lineTo(x - 16, y + 16 + breathe * 1.5);
  ctx.lineTo(x - 12, y + 24 + breathe);
  ctx.closePath();
  ctx.fill();

  // === TÊTE CENTRALE (plus grande) ===
  ctx.fillStyle = '#6b5b7a';
  ctx.fillRect(x + 20, y + 4, 16, 18);
  
  // Museau central
  ctx.fillStyle = '#5a4a6a';
  ctx.fillRect(x + 22, y + 14, 12, 10);
  
  // Oreilles/cornes orange
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(x + 20, y + 6);
  ctx.lineTo(x + 18, y - 4);
  ctx.lineTo(x + 24, y + 4);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 36, y + 6);
  ctx.lineTo(x + 38, y - 4);
  ctx.lineTo(x + 32, y + 4);
  ctx.closePath();
  ctx.fill();
  
  // Yeux rouges brillants (central)
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + 23, y + 8, 4, 4);
  ctx.fillRect(x + 29, y + 8, 4, 4);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x + 24, y + 9, 2, 2);
  ctx.fillRect(x + 30, y + 9, 2, 2);
  
  // Gueule avec crocs (central)
  ctx.fillStyle = '#1f1520';
  ctx.fillRect(x + 24, y + 18, 8, 5);
  ctx.fillStyle = '#f8fafc';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + 24 + i * 2, y + 18, 1, 3);
    ctx.fillRect(x + 24 + i * 2, y + 21, 1, 2);
  }

  // === TÊTE GAUCHE ===
  ctx.fillStyle = '#6b5b7a';
  ctx.fillRect(x + 2, y + 8, 14, 14);
  
  // Museau gauche
  ctx.fillStyle = '#5a4a6a';
  ctx.fillRect(x, y + 14, 10, 8);
  
  // Oreille gauche
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 10);
  ctx.lineTo(x, y);
  ctx.lineTo(x + 8, y + 8);
  ctx.closePath();
  ctx.fill();
  
  // Yeux (gauche)
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + 4, y + 12, 3, 3);
  ctx.fillRect(x + 10, y + 12, 3, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x + 5, y + 13, 1, 1);
  ctx.fillRect(x + 11, y + 13, 1, 1);
  
  // Gueule gauche
  ctx.fillStyle = '#1f1520';
  ctx.fillRect(x + 2, y + 18, 6, 4);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(x + 2, y + 18, 1, 2);
  ctx.fillRect(x + 4, y + 18, 1, 3);
  ctx.fillRect(x + 6, y + 18, 1, 2);

  // === TÊTE DROITE ===
  ctx.fillStyle = '#6b5b7a';
  ctx.fillRect(x + 40, y + 8, 14, 14);
  
  // Museau droit
  ctx.fillStyle = '#5a4a6a';
  ctx.fillRect(x + 46, y + 14, 10, 8);
  
  // Oreille droite
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(x + 52, y + 10);
  ctx.lineTo(x + 56, y);
  ctx.lineTo(x + 48, y + 8);
  ctx.closePath();
  ctx.fill();
  
  // Yeux (droit)
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + 43, y + 12, 3, 3);
  ctx.fillRect(x + 49, y + 12, 3, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x + 44, y + 13, 1, 1);
  ctx.fillRect(x + 50, y + 13, 1, 1);
  
  // Gueule droite
  ctx.fillStyle = '#1f1520';
  ctx.fillRect(x + 48, y + 18, 6, 4);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(x + 49, y + 18, 1, 2);
  ctx.fillRect(x + 51, y + 18, 1, 3);
  ctx.fillRect(x + 53, y + 18, 1, 2);

  // Effet de flammes autour
  const flameAlpha = 0.4 + Math.sin(time * 2) * 0.2;
  ctx.fillStyle = `rgba(249, 115, 22, ${flameAlpha})`;
  ctx.beginPath();
  ctx.arc(x + 28, y + 30, 35, 0, Math.PI * 2);
  ctx.fill();

  // Barre de vie
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.fillRect(x - 5, y - 20, 66, 8);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(x - 4, y - 19, 64 * hpRatio, 6);

  // Nom
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 12px Arial';
  ctx.fillText('⚔️ CERBÈRE', x - 2, y - 28);
}

function updateMiniBosses() {
  miniBosses.forEach((boss) => {
    if (boss.hp <= 0) {
      return;
    }

    boss.x += boss.dirX * boss.speed;
    boss.y += boss.dirY * boss.speed;

    if (boss.x < boss.minX || boss.x > boss.maxX) {
      boss.dirX *= -1;
    }
    if (boss.y < boss.minY || boss.y > boss.maxY) {
      boss.dirY *= -1;
    }
  });

  miniBossSubBoss.isUnlocked = countDefeatedMiniBosses() === miniBosses.length;

  if (!miniBossSubBoss.isUnlocked || miniBossSubBoss.isDefeated) {
    // Nettoyer les flammes si le boss est mort
    cerbereFlames.length = 0;
    return;
  }

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const bossCenterX = miniBossSubBoss.x + miniBossSubBoss.w / 2;
  const bossCenterY = miniBossSubBoss.y + miniBossSubBoss.h / 2;
  const distToPlayer = Math.hypot(playerCenterX - bossCenterX, playerCenterY - bossCenterY);
  
  // Le Cerbère suit le joueur s'il est dans la zone des montagnes
  if (currentZone === 'Montagnes Brisées' && distToPlayer < 400) {
    // Chasse le joueur
    const dx = playerCenterX - bossCenterX;
    const dy = playerCenterY - bossCenterY;
    const dist = Math.hypot(dx, dy);
    
    if (dist > 60) { // S'approche mais garde une distance minimale
      miniBossSubBoss.x += (dx / dist) * miniBossSubBoss.speed * 1.2;
      miniBossSubBoss.y += (dy / dist) * miniBossSubBoss.speed * 1.2;
    }
  } else {
    // Mouvement normal de patrouille
    miniBossSubBoss.x += miniBossSubBoss.dirX * miniBossSubBoss.speed;
    miniBossSubBoss.y += miniBossSubBoss.dirY * miniBossSubBoss.speed;
  }

  // Contraintes de zone
  if (miniBossSubBoss.x < miniBossSubBoss.minX) {
    miniBossSubBoss.x = miniBossSubBoss.minX;
    miniBossSubBoss.dirX *= -1;
  }
  if (miniBossSubBoss.x > miniBossSubBoss.maxX) {
    miniBossSubBoss.x = miniBossSubBoss.maxX;
    miniBossSubBoss.dirX *= -1;
  }
  if (miniBossSubBoss.y < miniBossSubBoss.minY) {
    miniBossSubBoss.y = miniBossSubBoss.minY;
    miniBossSubBoss.dirY *= -1;
  }
  if (miniBossSubBoss.y > miniBossSubBoss.maxY) {
    miniBossSubBoss.y = miniBossSubBoss.maxY;
    miniBossSubBoss.dirY *= -1;
  }

  // Cracher des flammes vers le joueur
  const now = Date.now();
  if (now - miniBossSubBoss.lastFireTime > miniBossSubBoss.fireInterval && distToPlayer < 350) {
    miniBossSubBoss.lastFireTime = now;
    
    // Créer 3 flammes (une par tête)
    const flameSpeed = 4;
    const dx = playerCenterX - bossCenterX;
    const dy = playerCenterY - bossCenterY;
    const dist = Math.hypot(dx, dy);
    
    // Flamme centrale (directe vers le joueur)
    cerbereFlames.push({
      x: bossCenterX,
      y: bossCenterY,
      vx: (dx / dist) * flameSpeed,
      vy: (dy / dist) * flameSpeed,
      size: 12,
      life: 120,
      maxLife: 120
    });
    
    // Flamme gauche (légèrement décalée)
    const angle = Math.atan2(dy, dx);
    cerbereFlames.push({
      x: bossCenterX - 15,
      y: bossCenterY,
      vx: Math.cos(angle - 0.3) * flameSpeed,
      vy: Math.sin(angle - 0.3) * flameSpeed,
      size: 10,
      life: 100,
      maxLife: 100
    });
    
    // Flamme droite (légèrement décalée)
    cerbereFlames.push({
      x: bossCenterX + 15,
      y: bossCenterY,
      vx: Math.cos(angle + 0.3) * flameSpeed,
      vy: Math.sin(angle + 0.3) * flameSpeed,
      size: 10,
      life: 100,
      maxLife: 100
    });
  }

  // Mettre à jour les flammes
  updateCerbereFlames();
}

function updateCerbereFlames() {
  for (let i = cerbereFlames.length - 1; i >= 0; i--) {
    const flame = cerbereFlames[i];
    
    // Déplacer la flamme
    flame.x += flame.vx;
    flame.y += flame.vy;
    flame.life--;
    
    // Vérifier collision avec le joueur
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;
    const dist = Math.hypot(playerCenterX - flame.x, playerCenterY - flame.y);
    
    if (dist < flame.size + 15) {
      // Le joueur est touché par la flamme
      player.health -= miniBossSubBoss.flameDamage;
      player.health = clamp(player.health, 0, player.maxHealth);
      cerbereFlames.splice(i, 1);
      continue;
    }
    
    // Supprimer si la vie est épuisée
    if (flame.life <= 0) {
      cerbereFlames.splice(i, 1);
    }
  }
}

function drawCerbereFlames() {
  cerbereFlames.forEach(flame => {
    const x = flame.x - camera.x;
    const y = flame.y - camera.y;
    const alpha = flame.life / flame.maxLife;
    const size = flame.size * (0.8 + alpha * 0.4);
    
    // Aura de chaleur
    ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Flamme extérieure (orange)
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(254, 215, 170, ${alpha})`);
    gradient.addColorStop(0.4, `rgba(251, 146, 60, ${alpha})`);
    gradient.addColorStop(0.7, `rgba(234, 88, 12, ${alpha * 0.8})`);
    gradient.addColorStop(1, `rgba(220, 38, 38, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Noyau brillant
    ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateMountainHealing() {
  if (!isPlayerInMountainHealingZone()) {
    mountainHealLastTick = 0;
    return;
  }

  if (player.health >= player.maxHealth) {
    return;
  }

  const now = Date.now();
  if (mountainHealLastTick === 0) {
    mountainHealLastTick = now;
    return;
  }

  if (now - mountainHealLastTick < mountainHealingCherry.healIntervalMs) {
    return;
  }

  player.health = clamp(player.health + mountainHealingCherry.healAmount, 0, player.maxHealth);
  mountainHealLastTick = now;
}

function isPlayerInMountainHealingZone() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  return Math.hypot(centerX - mountainHealingCherry.x, centerY - (mountainHealingCherry.y + 70)) <= mountainHealingCherry.healRadius;
}

function isPlayerNearMountainHealingTree() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  return Math.hypot(centerX - mountainHealingCherry.x, centerY - mountainHealingCherry.y) <= mountainHealingCherry.healRadius + 80;
}

function drawForestDecor() {
  const forestX = 16 * TILE;
  const forestY = 0;
  const forestW = 16 * TILE;
  const forestH = WORLD_HEIGHT;
    const screenX = forestX - camera.x;
    const screenY = forestY - camera.y;

  ctx.save();
  // Keep forest decoration strictly inside the forest zone.
  ctx.beginPath();
  ctx.rect(screenX, screenY, forestW, forestH);
  ctx.clip();

  for (let i = 0; i < forestClearings.length; i += 1) {
    const clearing = forestClearings[i];
    const x = clearing.x - camera.x;
    const y = clearing.y - camera.y;
    ctx.fillStyle = 'rgba(187, 247, 208, 0.12)';
    ctx.beginPath();
    ctx.ellipse(x, y, clearing.rx, clearing.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(220, 252, 231, 0.16)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(x, y, clearing.rx * 0.72, clearing.ry * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  const lightShift = Math.sin(Date.now() * 0.0008) * 14;
  for (let i = 0; i < 4; i += 1) {
    const lx = screenX + 80 + i * 170 + lightShift;
    const grad = ctx.createLinearGradient(lx, screenY, lx + 26, screenY + forestH);
    grad.addColorStop(0, 'rgba(254, 240, 138, 0.12)');
    grad.addColorStop(0.5, 'rgba(254, 240, 138, 0.03)');
    grad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(lx, screenY, 26, forestH);
  }

  forestBushes.forEach((bush) => {
    const x = bush.x - camera.x;
    const y = bush.y - camera.y;
    const r = 15 * bush.size;

      ctx.fillStyle = '#0b2e1f';
    ctx.beginPath();
    ctx.arc(x - r * 0.35, y + 2, r * 0.72, 0, Math.PI * 2);
    ctx.arc(x + r * 0.22, y + 1, r * 0.82, 0, Math.PI * 2);
    ctx.arc(x + r * 0.62, y + 3, r * 0.64, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.arc(x - r * 0.26, y - 2, r * 0.45, 0, Math.PI * 2);
    ctx.arc(x + r * 0.34, y - 3, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  });

  forestRocks.forEach((rock) => {
    const x = rock.x - camera.x;
    const y = rock.y - camera.y;
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.ellipse(x, y, rock.w / 2, rock.h / 2, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.ellipse(x - 3, y - 2, rock.w / 4, rock.h / 4, -0.1, 0, Math.PI * 2);
    ctx.fill();
  });

  forestStumps.forEach((stump) => {
    const x = stump.x - camera.x;
    const y = stump.y - camera.y;
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(x - stump.r * 0.55, y - stump.r * 0.2, stump.r * 1.1, stump.r * 1.3);
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(x, y - stump.r * 0.2, stump.r, stump.r * 0.54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.75)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y - stump.r * 0.2, stump.r * 0.42, 0, Math.PI * 2);
    ctx.stroke();
  });

  forestFlowers.forEach((flower) => {
    const x = flower.x - camera.x;
    const y = flower.y - camera.y;
    ctx.fillStyle = '#0f3d2e';
    ctx.fillRect(x, y, 1.6, 6);
    ctx.fillStyle = flower.color;
    ctx.beginPath();
    ctx.arc(x + 0.8, y - 1, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

// === FOYER MÉDIÉVAL : s'allume progressivement avec le bois collecté ===
function drawMedievalFoyer() {
  const fx = medievalFoyer.x - camera.x;
  const fy = medievalFoyer.y - camera.y;
  const time = Date.now() * 0.006;

  const wood = medievalFoyer.woodCount;
  const stages = medievalFoyer.stages;
  let stage = 0;
  for (let i = stages.length - 1; i >= 0; i--) {
    if (wood >= stages[i]) { stage = i; break; }
  }
  // Fraction vers le stage suivant (pour interpolation visuelle)
  const nextThresh = stages[stage + 1] ?? medievalFoyer.maxWood;
  const prevThresh = stages[stage];
  const frac = (nextThresh > prevThresh) ? (wood - prevThresh) / (nextThresh - prevThresh) : 1;

  ctx.save();

  // --- Zone lumineuse projetée au sol (selon intensité du feu) ---
  if (stage >= 1) {
    const lightR = 50 + stage * 28 + frac * 14;
    const alpha = 0.10 + stage * 0.04 + frac * 0.02;
    const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, lightR);
    glow.addColorStop(0, `rgba(251, 146, 60, ${(alpha * 2).toFixed(2)})`);
    glow.addColorStop(0.5, `rgba(234, 88, 12, ${alpha.toFixed(2)})`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(fx, fy, lightR, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Anneau de pierres ---
  const stoneCount = 8;
  for (let i = 0; i < stoneCount; i++) {
    const angle = (i / stoneCount) * Math.PI * 2;
    const sx = fx + Math.cos(angle) * 18;
    const sy = fy + Math.sin(angle) * 13;
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.ellipse(sx, sy, 6, 4, angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4b5563';
    ctx.beginPath();
    ctx.ellipse(sx - 1, sy - 1, 3, 2, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Bûches déposées (selon bois accumulé) ---
  const logCount = Math.min(wood, 4);
  for (let i = 0; i < logCount; i++) {
    const logAngle = (i / 4) * Math.PI - Math.PI / 4;
    const lx = fx + Math.cos(logAngle) * 10;
    const ly = fy + Math.sin(logAngle) * 7;
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(logAngle);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-14, -3, 28, 6);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(-11, -1, 20, 3);
    ctx.restore();
  }

  // --- Cendres (toujours visibles) ---
  ctx.fillStyle = '#6b7280';
  ctx.beginPath();
  ctx.ellipse(fx, fy + 2, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  if (stage === 0 && wood === 0) {
    // Foyer vide : tas de cendres froid
    ctx.fillStyle = '#9ca3af';
    ctx.beginPath();
    ctx.ellipse(fx, fy, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Étiquette
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🪵 Foyer vide — apporte du bois (E)', fx, fy - 26);
  } else if (stage >= 1) {
    // --- Fumée ---
    const smokeCount = 2 + stage;
    for (let i = 0; i < smokeCount; i++) {
      const sp = (time * 0.7 + i * 1.2) % 4;
      const alpha = Math.max(0, 0.28 - sp * 0.07);
      const smkX = fx + Math.sin(time + i) * 5;
      const smkY = fy - 24 - sp * 16;
      const smkR = 4 + sp * 5;
      ctx.fillStyle = `rgba(156, 163, 175, ${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(smkX, smkY, smkR, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Flammes progressives ---
    const flameH = 14 + stage * 9 + frac * 6 + Math.sin(time * 3) * 4;
    const flameW = 7 + stage * 3 + frac * 2;

    // Flamme extérieure (orange/rouge)
    const outerGrad = ctx.createLinearGradient(fx, fy, fx, fy - flameH * 1.3);
    outerGrad.addColorStop(0, `rgba(234, 88, 12, 0.95)`);
    outerGrad.addColorStop(0.55, '#f97316');
    outerGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.moveTo(fx - flameW, fy);
    ctx.quadraticCurveTo(
      fx - flameW * 0.6 + Math.sin(time * 2.1) * 3, fy - flameH * 0.55,
      fx + Math.sin(time * 1.8) * 4, fy - flameH * 1.3
    );
    ctx.quadraticCurveTo(
      fx + flameW * 0.6 - Math.sin(time * 1.4) * 3, fy - flameH * 0.55,
      fx + flameW, fy
    );
    ctx.closePath();
    ctx.fill();

    // Flamme intérieure (jaune)
    const innerH = flameH * 0.7;
    const innerGrad = ctx.createLinearGradient(fx, fy, fx, fy - innerH);
    innerGrad.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
    innerGrad.addColorStop(0.6, '#fde68a');
    innerGrad.addColorStop(1, 'rgba(255, 255, 200, 0)');
    ctx.fillStyle = innerGrad;
    ctx.beginPath();
    ctx.moveTo(fx - flameW * 0.5, fy);
    ctx.quadraticCurveTo(
      fx - flameW * 0.2 + Math.sin(time * 2.6) * 2, fy - innerH * 0.6,
      fx + Math.cos(time * 2.2) * 2, fy - innerH
    );
    ctx.quadraticCurveTo(
      fx + flameW * 0.2 - Math.sin(time * 1.9) * 2, fy - innerH * 0.6,
      fx + flameW * 0.5, fy
    );
    ctx.closePath();
    ctx.fill();

    // Cœur blanc brillant (stade 3+)
    if (stage >= 3) {
      ctx.fillStyle = 'rgba(255,255,220,0.7)';
      ctx.beginPath();
      ctx.arc(fx, fy - 6, 4 + frac * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Étincelles ---
    const sparkCount = stage * 2 + 1;
    for (let i = 0; i < sparkCount; i++) {
      const spT = (time * 1.5 + i * 0.9) % 3;
      const spX = fx + Math.sin(time * 3 + i * 2.3) * (flameW + 4);
      const spY = fy - 10 - spT * 14;
      const spA = Math.max(0, 0.9 - spT * 0.35);
      ctx.fillStyle = `rgba(254, 240, 138, ${spA.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(spX, spY, 1.5 + (1 - spT / 3), 0, Math.PI * 2);
      ctx.fill();
    }

    // Indicateur bois restant
    const pct = Math.min(wood / medievalFoyer.maxWood, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.roundRect(fx - 28, fy - flameH - 30, 56, 10, 4);
    ctx.fill();
    ctx.fillStyle = stage >= 4 ? '#fbbf24' : '#f97316';
    ctx.beginPath();
    ctx.roundRect(fx - 27, fy - flameH - 29, 54 * pct, 8, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(fx - 28, fy - flameH - 30, 56, 10);
  }

  // Bois déposé affiché
  if (wood > 0 && wood < medievalFoyer.maxWood) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`🪵 ${wood}/${medievalFoyer.maxWood}`, fx, fy + 32);
  } else if (wood >= medievalFoyer.maxWood) {
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🔥 Foyer embrasé !', fx, fy + 32);
  }

  ctx.restore();
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
  if (finalBarrier.isOpen) {
    return;
  }

  const x = finalBarrier.x - camera.x;
  const y = finalBarrier.y - camera.y;

  ctx.fillStyle = 'rgba(2, 6, 23, 0.75)';
  ctx.fillRect(x, y, finalBarrier.w, finalBarrier.h);

  ctx.fillStyle = '#dc2626';
  const bars = 5;
  const innerPadding = 8;
  const availableWidth = finalBarrier.w - innerPadding * 2;
  const barWidth = 9;
  const spacing = bars > 1 ? (availableWidth - bars * barWidth) / (bars - 1) : 0;
  for (let i = 0; i < bars; i += 1) {
    ctx.fillRect(x + innerPadding + i * (barWidth + spacing), y + 4, barWidth, finalBarrier.h - 8);
  }

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(x, y, finalBarrier.w, 4);
  ctx.fillRect(x, y + finalBarrier.h - 4, finalBarrier.w, 4);

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
  if (finalBoss.isDefeated) return;

  const bx = finalBoss.x - camera.x;
  const by = finalBoss.y - camera.y;
  const cx = bx + finalBoss.w / 2;
  const cy = by + finalBoss.h / 2;
  const time = Date.now() * 0.005;
  const now = Date.now();
  const isFlashing = now < finalBoss.flashEndTime;
  const ph = finalBoss.phase;

  ctx.save();

  // Aura de phase
  const auraRGBA = [
    'rgba(0,0,0,0)',
    'rgba(127,29,29,0.35)',
    'rgba(185,28,28,0.65)',
    'rgba(239,68,68,1.0)'
  ];
  const auraR = 42 + Math.sin(time * 2.4) * 6;
  const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraR);
  auraGrad.addColorStop(0, auraRGBA[ph] || 'rgba(0,0,0,0)');
  auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
  ctx.fill();

  // Anneaux d'énergie (phase 3)
  if (ph >= 3) {
    const ringAngle = time * 2.5;
    ctx.lineWidth = 2;
    for (let r = 0; r < 3; r++) {
      ctx.strokeStyle = `rgba(239,68,68,${0.55 - r * 0.1})`;
      ctx.save();
      ctx.translate(cx, cy + 8);
      ctx.rotate(ringAngle + r * Math.PI * 2 / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 46 + r * 9, 18 + r * 4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Cape
  ctx.fillStyle = isFlashing ? '#ffffff' : (ph >= 3 ? '#7f0000' : '#1a0030');
  ctx.beginPath();
  ctx.moveTo(bx + 10, by + 18);
  ctx.lineTo(bx - 6, by + 70 + Math.sin(time) * 5);
  ctx.lineTo(bx + 28, by + 58);
  ctx.lineTo(bx + 62, by + 70 + Math.sin(time + 1) * 5);
  ctx.lineTo(bx + 46, by + 18);
  ctx.closePath();
  ctx.fill();

  // Corps armure
  ctx.fillStyle = isFlashing ? '#e0e0e0' : '#0f0f12';
  ctx.fillRect(bx + 12, by + 18, 32, 38);

  // Épaulières
  ctx.fillStyle = isFlashing ? '#cccccc' : '#1c1c20';
  ctx.fillRect(bx + 4, by + 18, 14, 10);
  ctx.fillRect(bx + 38, by + 18, 14, 10);

  // Reflets rouges armure
  ctx.fillStyle = isFlashing ? 'rgba(200,200,200,0.5)' : 'rgba(220,20,60,0.45)';
  ctx.fillRect(bx + 14, by + 20, 3, 32);
  ctx.fillRect(bx + 39, by + 20, 3, 32);
  ctx.fillRect(bx + 14, by + 33, 28, 3);

  // Jambes
  ctx.fillStyle = isFlashing ? '#cccccc' : '#0f0f12';
  ctx.fillRect(bx + 14, by + 54, 12, 18);
  ctx.fillRect(bx + 30, by + 54, 12, 18);
  // Genouillères
  ctx.fillStyle = isFlashing ? '#999' : '#991b1b';
  ctx.fillRect(bx + 14, by + 57, 12, 5);
  ctx.fillRect(bx + 30, by + 57, 12, 5);

  // Heaume
  ctx.fillStyle = isFlashing ? '#e0e0e0' : '#0f0f12';
  ctx.fillRect(bx + 14, by + 2, 28, 20);
  // Crête
  ctx.fillStyle = isFlashing ? '#999' : '#7f1d1d';
  ctx.fillRect(bx + 18, by - 3, 20, 6);
  // Visière
  ctx.fillStyle = '#060606';
  ctx.fillRect(bx + 17, by + 12, 22, 8);
  // Yeux rouges lumineux
  const eyeGlow = 0.7 + Math.sin(time * 4) * 0.3;
  ctx.fillStyle = isFlashing ? '#ffffff' : `rgba(239,68,68,${eyeGlow.toFixed(2)})`;
  ctx.fillRect(bx + 20, by + 14, 6, 4);
  ctx.fillRect(bx + 30, by + 14, 6, 4);
  if (!isFlashing) {
    ctx.fillStyle = '#ff1111';
    ctx.fillRect(bx + 22, by + 14, 3, 4);
    ctx.fillRect(bx + 32, by + 14, 3, 4);
  }

  // Épée (bras droit) – oscille selon phase
  ctx.save();
  ctx.translate(bx + 52, by + 26);
  const swordSwing = ph >= 3
    ? -0.4 + Math.sin(time * 5.5) * 0.28
    : -0.18 + Math.sin(time * 1.8) * 0.1;
  ctx.rotate(swordSwing);
  ctx.fillStyle = isFlashing ? '#999' : '#4b2a0a';
  ctx.fillRect(-4, 10, 8, 18);
  ctx.fillStyle = isFlashing ? '#bbb' : '#92400e';
  ctx.fillRect(-9, 8, 18, 5);
  ctx.fillStyle = isFlashing ? '#e0e0e0' : '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(-4, -46);
  ctx.lineTo(4, -46);
  ctx.lineTo(6, 8);
  ctx.lineTo(-6, 8);
  ctx.closePath();
  ctx.fill();
  // Reflet lame rouge/violet
  ctx.fillStyle = isFlashing ? 'rgba(200,200,200,0.5)' : `rgba(${ph >= 3 ? '220,20,60' : '139,92,246'},${0.4 + Math.sin(time * 3) * 0.2})`;
  ctx.fillRect(-1, -42, 2, 46);
  ctx.restore();

  // Bras gauche: bouclier (phase 1-2) ou 2e épée (phase 3)
  if (ph <= 2) {
    ctx.fillStyle = isFlashing ? '#999' : '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(bx + 5, by + 22);
    ctx.lineTo(bx - 8, by + 28);
    ctx.lineTo(bx - 8, by + 42);
    ctx.lineTo(bx + 5, by + 48);
    ctx.lineTo(bx + 14, by + 48);
    ctx.lineTo(bx + 14, by + 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = isFlashing ? '#777' : '#ef4444';
    ctx.fillRect(bx - 1, by + 29, 5, 12);
    ctx.fillRect(bx - 5, by + 33, 13, 3);
  } else {
    ctx.save();
    ctx.translate(bx + 4, by + 26);
    ctx.rotate(0.32 + Math.sin(time * 6 + 1) * 0.3);
    ctx.fillStyle = isFlashing ? '#e0e0e0' : '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-3, -38);
    ctx.lineTo(3, -38);
    ctx.lineTo(5, 8);
    ctx.lineTo(-5, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = isFlashing ? 'rgba(180,180,180,0.5)' : 'rgba(168,85,247,0.55)';
    ctx.fillRect(-1, -34, 2, 38);
    ctx.fillStyle = isFlashing ? '#999' : '#92400e';
    ctx.fillRect(-8, 6, 16, 5);
    ctx.restore();
  }

  // Laser beam (phase 3)
  if (finalBoss.isLasering) {
    const angle = finalBoss.laserAngle;
    const len = 360;
    const ex = cx + Math.cos(angle) * len;
    const ey = cy + Math.sin(angle) * len;
    const laserGrad = ctx.createLinearGradient(cx, cy, ex, ey);
    laserGrad.addColorStop(0, 'rgba(239,68,68,0.95)');
    laserGrad.addColorStop(0.45, 'rgba(253,224,71,0.85)');
    laserGrad.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.strokeStyle = laserGrad;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  // Barre de vie
  const hpRatio = finalBoss.maxHp > 0 ? finalBoss.hp / finalBoss.maxHp : 0;
  const barW = 84;
  const barX = cx - barW / 2;
  const barY = by - 24;
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fillRect(barX - 2, barY - 2, barW + 4, 14);
  const phaseBarColors = ['', '#22c55e', '#f59e0b', '#ef4444'];
  ctx.fillStyle = phaseBarColors[ph] || '#ef4444';
  ctx.fillRect(barX, barY, barW * hpRatio, 10);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX - 2, barY - 2, barW + 4, 14);

  // Nom au-dessus
  const phaseLabels = ['', '', ' ⚔ Phase II', ' ☠ RAGE'];
  ctx.fillStyle = ph >= 3 ? '#ef4444' : '#f8fafc';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Maléficus${phaseLabels[ph] || ''}`, cx, barY - 6);
  ctx.textAlign = 'left';

  ctx.restore();
}

function updateFinalBoss() {
  if (finalBoss.isDefeated) return;

  const now = Date.now();
  const bcx = finalBoss.x + finalBoss.w / 2;
  const bcy = finalBoss.y + finalBoss.h / 2;
  const px = player.x + player.width / 2;
  const py = player.y + player.height / 2;
  const dist = Math.hypot(px - bcx, py - bcy);

  // Only engage when player is in the final zone
  if (currentZone !== 'Sanctuaire Final') return;

  // --- Determine phase ---
  const hpPct = finalBoss.maxHp > 0 ? finalBoss.hp / finalBoss.maxHp : 0;
  const prevPhase = finalBoss.phase;
  if      (hpPct > 0.65) finalBoss.phase = 1;
  else if (hpPct > 0.30) finalBoss.phase = 2;
  else                    finalBoss.phase = 3;
  if (finalBoss.phase > prevPhase) finalBoss.enrageTime = now;

  const speeds        = [0, 1.4, 2.1, 3.0];
  const orbCooldowns  = [0, 2400, 1500, 900];
  const dashCooldowns = [0, 1e9,  4200, 2600];
  const laserCooldowns= [0, 1e9,  1e9,  5500];
  const spd = speeds[finalBoss.phase];

  // --- DASH ---
  if (finalBoss.isDashing) {
    finalBoss.x += finalBoss.dashVX * 6.5;
    finalBoss.y += finalBoss.dashVY * 6.5;
    finalBoss.x = clamp(finalBoss.x, finalBoss.minX, finalBoss.maxX);
    finalBoss.y = clamp(finalBoss.y, finalBoss.minY, finalBoss.maxY);
    if (now - finalBoss.dashStartTime > finalBoss.dashDurationMs) {
      finalBoss.isDashing = false;
    }
  } else if (!finalBoss.isLasering) {
    // Poursuite du joueur
    if (dist > 2) {
      finalBoss.x += ((px - bcx) / dist) * spd;
      finalBoss.y += ((bcy < py ? 1 : -1) * Math.abs((py - bcy) / dist)) * spd * 0.6 + ((py - bcy) / dist) * spd * 0.4;
      finalBoss.x = clamp(finalBoss.x, finalBoss.minX, finalBoss.maxX);
      finalBoss.y = clamp(finalBoss.y, finalBoss.minY, finalBoss.maxY);
    }
    // Déclencher dash
    if (finalBoss.phase >= 2 &&
        now - finalBoss.lastDashTime > dashCooldowns[finalBoss.phase] &&
        dist < 400) {
      const len = Math.hypot(px - bcx, py - bcy) || 1;
      finalBoss.dashVX = (px - bcx) / len;
      finalBoss.dashVY = (py - bcy) / len;
      finalBoss.isDashing = true;
      finalBoss.dashStartTime = now;
      finalBoss.lastDashTime = now;
    }
  }

  // --- ORB ATTACK ---
  if (now - finalBoss.lastOrbTime > orbCooldowns[finalBoss.phase]) {
    const newBcx = finalBoss.x + finalBoss.w / 2;
    const newBcy = finalBoss.y + finalBoss.h / 2;
    const baseAngle = Math.atan2(py - newBcy, px - newBcx);
    const orbSpeed = 2.7 + finalBoss.phase * 0.45;
    const counts = [0, 1, 3, 5];
    const count = counts[finalBoss.phase];
    const spread = 0.30;
    const half = Math.floor(count / 2);
    for (let i = -half; i <= half; i++) {
      const angle = baseAngle + i * spread;
      finalBossOrbs.push({
        x: newBcx, y: newBcy,
        vx: Math.cos(angle) * orbSpeed,
        vy: Math.sin(angle) * orbSpeed,
        r: 8, phase: finalBoss.phase
      });
    }
    finalBoss.lastOrbTime = now;
  }

  // --- LASER (phase 3 only) ---
  if (finalBoss.phase === 3 && !finalBoss.isLasering &&
      now - finalBoss.lastLaserTime > laserCooldowns[3]) {
    finalBoss.isLasering = true;
    finalBoss.laserStartTime = now;
    const newBcx2 = finalBoss.x + finalBoss.w / 2;
    const newBcy2 = finalBoss.y + finalBoss.h / 2;
    finalBoss.laserAngle = Math.atan2(py - newBcy2, px - newBcx2);
    finalBoss.lastLaserTime = now;
    finalBoss.lastLaserHitTime = 0;
  }

  if (finalBoss.isLasering) {
    finalBoss.laserAngle += 0.025;
    if (now - finalBoss.laserStartTime > finalBoss.laserDurationMs) {
      finalBoss.isLasering = false;
    }
    // Dégâts laser sur le joueur
    if (now - finalBoss.lastLaserHitTime > 250) {
      const lbx = finalBoss.x + finalBoss.w / 2;
      const lby = finalBoss.y + finalBoss.h / 2;
      const lx = Math.cos(finalBoss.laserAngle) * 360;
      const ly = Math.sin(finalBoss.laserAngle) * 360;
      const lenSq = lx * lx + ly * ly;
      const t = clamp(((px - lbx) * lx + (py - lby) * ly) / lenSq, 0, 1);
      const closestX = lbx + t * lx;
      const closestY = lby + t * ly;
      if (Math.hypot(px - closestX, py - closestY) < 18) {
        player.health -= 3;
        player.health = clamp(player.health, 0, player.maxHealth);
        finalBoss.lastLaserHitTime = now;
      }
    }
  }
}

function updateFinalBossOrbs() {
  const px = player.x + player.width / 2;
  const py = player.y + player.height / 2;
  for (let i = finalBossOrbs.length - 1; i >= 0; i--) {
    const orb = finalBossOrbs[i];
    orb.x += orb.vx;
    orb.y += orb.vy;
    // Supprimer si hors du monde
    if (orb.x < finalZone.x - 100 || orb.x > WORLD_WIDTH + 100 ||
        orb.y < -100 || orb.y > WORLD_HEIGHT + 100) {
      finalBossOrbs.splice(i, 1);
      continue;
    }
    // Collision joueur
    if (Math.hypot(px - orb.x, py - orb.y) < orb.r + 14) {
      player.health -= 4;
      player.health = clamp(player.health, 0, player.maxHealth);
      const angle = Math.atan2(py - orb.y, px - orb.x);
      player.x += Math.cos(angle) * 22;
      player.y += Math.sin(angle) * 22;
      finalBossOrbs.splice(i, 1);
    }
  }
}

function drawFinalBossOrbs() {
  finalBossOrbs.forEach(orb => {
    const x = orb.x - camera.x;
    const y = orb.y - camera.y;
    const pulse = Math.sin(Date.now() * 0.008 + orb.x * 0.01) * 2;
    // Lueur
    ctx.fillStyle = orb.phase >= 3 ? 'rgba(220,38,38,0.35)' : 'rgba(124,58,237,0.35)';
    ctx.beginPath();
    ctx.arc(x, y, orb.r + 7 + pulse, 0, Math.PI * 2);
    ctx.fill();
    // Corps
    const g = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, orb.r + 2 + pulse);
    g.addColorStop(0, '#f8fafc');
    g.addColorStop(0.35, orb.phase >= 3 ? '#ef4444' : '#a78bfa');
    g.addColorStop(1, orb.phase >= 3 ? 'rgba(185,28,28,0)' : 'rgba(109,40,217,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, orb.r + pulse, 0, Math.PI * 2);
    ctx.fill();
    // Noyau
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 2, y - 2, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function tryHitFinalBoss() {
  if (finalBoss.isDefeated) return false;
  if (!isPlayerNearFinalBoss()) return false;
  if (!hasFullLegendarySet()) {
    hintMessage = `Impossible de battre Maleficus: equipement legendaire insuffisant (${formatMissingLegendaryRequirements()})`;
    return true;
  }
  const now = Date.now();
  if (now - finalBoss.lastHitTime < finalBoss.invincibleMs) {
    hintMessage = '⚡ Boss invincible ! Recule et reprends.';
    return true;
  }
  finalBoss.hp -= 1;
  finalBoss.lastHitTime = now;
  finalBoss.flashEndTime = now + finalBoss.invincibleMs;
  if (finalBoss.hp <= 0) {
    finalBoss.hp = 0;
    finalBoss.isDefeated = true;
    isVictory = true;
    finalBossOrbs.length = 0;
    hintMessage = '🏆 Maléficus vaincu ! Le royaume est libéré !';
  } else {
    const ph = finalBoss.phase;
    const label = ph >= 3 ? ' [☠ RAGE]' : ph >= 2 ? ' [Phase 2]' : '';
    hintMessage = `Maléficus${label} touché ! (${finalBoss.hp}/${finalBoss.maxHp} PV)`;
  }
  return true;
}

function isPlayerNearFinalBoss() {
  if (finalBoss.isDefeated) return false;
  return Math.hypot(
    (player.x + player.width / 2)  - (finalBoss.x + finalBoss.w / 2),
    (player.y + player.height / 2) - (finalBoss.y + finalBoss.h / 2)
  ) < 90;
}

function drawVictory() {
  ctx.fillStyle = 'rgba(0,0,0,0.82)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const pulse = (Math.sin(Date.now() * 0.003) + 1) / 2;
  ctx.fillStyle = `rgba(251,191,36,${(0.85 + pulse * 0.15).toFixed(2)})`;
  ctx.font = 'bold 68px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('⚔  VICTOIRE  ⚔', canvas.width / 2, canvas.height / 2 - 60);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '26px Arial';
  ctx.fillText('Maléficus a été vaincu !', canvas.width / 2, canvas.height / 2 - 8);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '18px Arial';
  ctx.fillText(`Jour ${survival.day} — Tu as libéré le royaume des ténèbres.`, canvas.width / 2, canvas.height / 2 + 38);
  ctx.fillStyle = `rgba(251,191,36,${(0.6 + pulse * 0.4).toFixed(2)})`;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Appuie sur R pour rejouer', canvas.width / 2, canvas.height / 2 + 110);
  ctx.textAlign = 'left';
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

    ctx.fillStyle = '#0f3d2e';
    ctx.beginPath();
    ctx.arc(x, y - trunkH / 2 - 12, crown, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#166534';
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
      
      // Transition vers la forêt (gradient droit)
      const templeForestGrad = ctx.createLinearGradient(x + zone.w - 80, y, x + zone.w, y);
      templeForestGrad.addColorStop(0, 'rgba(59, 52, 47, 0)');
      templeForestGrad.addColorStop(1, 'rgba(15, 61, 46, 0.4)');
      ctx.fillStyle = templeForestGrad;
      ctx.fillRect(x + zone.w - 80, y, 80, zone.h);
    } else if (zone.name === 'Forêt Ancienne') {
      ctx.fillStyle = '#0f3d2e';
      ctx.fillRect(x, y, zone.w, zone.h);

      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = forestGroundPattern || '#0b2e1f';
      ctx.fillRect(0, 0, zone.w, zone.h);
      ctx.restore();

      ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
      ctx.fillRect(x, y, zone.w, zone.h);
      
      // Transition depuis le temple (gradient gauche)
      const forestTempleGrad = ctx.createLinearGradient(x, y, x + 80, y);
      forestTempleGrad.addColorStop(0, 'rgba(15, 61, 46, 0.4)');
      forestTempleGrad.addColorStop(1, 'rgba(15, 61, 46, 0)');
      ctx.fillStyle = forestTempleGrad;
      ctx.fillRect(x, y, 80, zone.h);
      
      // Transition vers les montagnes (gradient droit)
      const forestMountainGrad = ctx.createLinearGradient(x + zone.w - 80, y, x + zone.w, y);
      forestMountainGrad.addColorStop(0, 'rgba(15, 61, 46, 0)');
      forestMountainGrad.addColorStop(1, 'rgba(51, 65, 85, 0.35)');
      ctx.fillStyle = forestMountainGrad;
      ctx.fillRect(x + zone.w - 80, y, 80, zone.h);
    } else if (zone.name === 'Montagnes Brisées') {
      const sky = ctx.createLinearGradient(x, y, x, y + zone.h * 0.64);
      sky.addColorStop(0, '#0b74c8');
      sky.addColorStop(1, '#8ec9f5');
      ctx.fillStyle = sky;
      ctx.fillRect(x, y, zone.w, zone.h * 0.64);

      const meadowY = y + zone.h * 0.52;
      const meadow = ctx.createLinearGradient(x, meadowY, x, y + zone.h);
      meadow.addColorStop(0, '#7cab4a');
      meadow.addColorStop(1, '#4c6e2d');
      ctx.fillStyle = meadow;
      ctx.fillRect(x, meadowY, zone.w, zone.h - zone.h * 0.52);

      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = mountainGroundPattern || '#475569';
      ctx.fillRect(0, zone.h * 0.48, zone.w, zone.h * 0.52);
      ctx.restore();

      const ridgeGlow = ctx.createLinearGradient(x, y, x, y + zone.h);
      ridgeGlow.addColorStop(0, 'rgba(219, 234, 254, 0.12)');
      ridgeGlow.addColorStop(0.65, 'rgba(56, 92, 44, 0.06)');
      ridgeGlow.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
      ctx.fillStyle = ridgeGlow;
      ctx.fillRect(x, y, zone.w, zone.h);
      
      // Transition depuis la forêt (gradient gauche)
      const mountainForestGrad = ctx.createLinearGradient(x, y, x + 80, y);
      mountainForestGrad.addColorStop(0, 'rgba(51, 65, 85, 0.35)');
      mountainForestGrad.addColorStop(1, 'rgba(51, 65, 85, 0)');
      ctx.fillStyle = mountainForestGrad;
      ctx.fillRect(x, y, 80, zone.h);
      
      // Transition vers le sanctuaire (gradient droit) - effet brumeux
      const mountainEvilGrad = ctx.createLinearGradient(x + zone.w - 100, y, x + zone.w, y);
      mountainEvilGrad.addColorStop(0, 'rgba(51, 65, 85, 0)');
      mountainEvilGrad.addColorStop(0.5, 'rgba(125, 30, 30, 0.2)');
      mountainEvilGrad.addColorStop(1, 'rgba(26, 5, 5, 0.4)');
      ctx.fillStyle = mountainEvilGrad;
      ctx.fillRect(x + zone.w - 100, y, 100, zone.h);
    } else if (zone.name === 'Sanctuaire Final') {
      // Fond dégradé rouge sang vers noir
      const evilSky = ctx.createLinearGradient(x, y, x, y + zone.h);
      evilSky.addColorStop(0, '#0a0a0a');
      evilSky.addColorStop(0.3, '#1a0a0a');
      evilSky.addColorStop(0.6, '#2d0f0f');
      evilSky.addColorStop(1, '#1a0505');
      ctx.fillStyle = evilSky;
      ctx.fillRect(x, y, zone.w, zone.h);

      // Pattern de sol maléfique
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = finalZonePattern || '#1a0505';
      ctx.fillRect(0, 0, zone.w, zone.h);
      ctx.restore();

      // Brume rouge animée
      const time = Date.now() * 0.001;
      ctx.fillStyle = `rgba(127, 29, 29, ${0.15 + Math.sin(time) * 0.05})`;
      ctx.fillRect(x, y + zone.h * 0.7, zone.w, zone.h * 0.3);

      // Éclairs aléatoires
      if (Math.random() < 0.008) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.fillRect(x, y, zone.w, zone.h);
      }

      // Effet de vignette sombre
      const vignette = ctx.createRadialGradient(
        x + zone.w / 2, y + zone.h / 2, zone.h * 0.2,
        x + zone.w / 2, y + zone.h / 2, zone.h * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(x, y, zone.w, zone.h);
      
      // Transition depuis les montagnes (gradient gauche) - brume maléfique
      const evilMountainGrad = ctx.createLinearGradient(x, y, x + 100, y);
      evilMountainGrad.addColorStop(0, 'rgba(26, 5, 5, 0.4)');
      evilMountainGrad.addColorStop(0.5, 'rgba(125, 30, 30, 0.2)');
      evilMountainGrad.addColorStop(1, 'rgba(26, 5, 5, 0)');
      ctx.fillStyle = evilMountainGrad;
      ctx.fillRect(x, y, 100, zone.h);

      // Dessiner les particules maléfiques
      evilParticles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = WORLD_HEIGHT;
          p.x = finalZone.x + Math.random() * finalZone.w;
        }
        const px = p.x - camera.x;
        const py = p.y - camera.y;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.5 + Math.sin(time * 2 + p.x) * 0.5);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Dessiner les flammes au sol
      evilFlames.forEach(flame => {
        const fx = flame.x - camera.x;
        const fy = flame.baseY - camera.y;
        const flicker = Math.sin(time * 8 + flame.phase);
        const flameHeight = 40 + flicker * 15;

        // Flamme principale (rouge/orange)
        const flameGrad = ctx.createLinearGradient(fx, fy, fx, fy - flameHeight);
        flameGrad.addColorStop(0, 'rgba(220, 38, 38, 0.9)');
        flameGrad.addColorStop(0.4, 'rgba(234, 88, 12, 0.7)');
        flameGrad.addColorStop(0.7, 'rgba(251, 146, 60, 0.5)');
        flameGrad.addColorStop(1, 'rgba(254, 215, 170, 0)');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(fx - 12, fy);
        ctx.quadraticCurveTo(fx - 8 + flicker * 3, fy - flameHeight * 0.5, fx, fy - flameHeight);
        ctx.quadraticCurveTo(fx + 8 - flicker * 3, fy - flameHeight * 0.5, fx + 12, fy);
        ctx.closePath();
        ctx.fill();

        // Lueur au sol
        ctx.fillStyle = 'rgba(220, 38, 38, 0.3)';
        ctx.beginPath();
        ctx.ellipse(fx, fy + 5, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Crânes décoratifs sur les côtés
      for (let i = 0; i < 4; i++) {
        const skullX = x + 30 + i * 350;
        const skullY = y + 100 + (i % 2) * 600;
        ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
        ctx.beginPath();
        ctx.arc(skullX, skullY, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
        ctx.beginPath();
        ctx.arc(skullX - 8, skullY - 5, 6, 0, Math.PI * 2);
        ctx.arc(skullX + 8, skullY - 5, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(skullX - 10, skullY + 10, 20, 8);
      }

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

function createMountainGroundPattern() {
  const tile = document.createElement('canvas');
  tile.width = 192;
  tile.height = 192;
  const patternCtx = tile.getContext('2d');

  patternCtx.fillStyle = '#4b5563';
  patternCtx.fillRect(0, 0, tile.width, tile.height);

  patternCtx.fillStyle = '#64748b';
  for (let i = 0; i < 130; i += 1) {
    const x = (i * 43) % tile.width;
    const y = (i * 29) % tile.height;
    patternCtx.beginPath();
    patternCtx.ellipse(x, y, 9 + (i % 5), 5 + (i % 3), (i % 7) * 0.2, 0, Math.PI * 2);
    patternCtx.fill();
  }

  patternCtx.strokeStyle = 'rgba(226, 232, 240, 0.15)';
  patternCtx.lineWidth = 1;
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 37 + 11) % tile.width;
    const y = (i * 61 + 7) % tile.height;
    patternCtx.beginPath();
    patternCtx.moveTo(x - 8, y + 4);
    patternCtx.lineTo(x, y - 5);
    patternCtx.lineTo(x + 7, y + 3);
    patternCtx.stroke();
  }

  patternCtx.fillStyle = 'rgba(148, 163, 184, 0.22)';
  for (let i = 0; i < 150; i += 1) {
    const x = (i * 17) % tile.width;
    const y = (i * 41) % tile.height;
    patternCtx.fillRect(x, y, 2, 2);
  }

  return ctx.createPattern(tile, 'repeat');
}

function createFinalZonePattern() {
  const tile = document.createElement('canvas');
  tile.width = 128;
  tile.height = 128;
  const patternCtx = tile.getContext('2d');

  // Fond sombre
  patternCtx.fillStyle = '#1a0505';
  patternCtx.fillRect(0, 0, tile.width, tile.height);

  // Fissures rougeoyantes
  patternCtx.strokeStyle = 'rgba(220, 38, 38, 0.4)';
  patternCtx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    const startX = (i * 37) % tile.width;
    const startY = (i * 23) % tile.height;
    patternCtx.beginPath();
    patternCtx.moveTo(startX, startY);
    patternCtx.lineTo(startX + 20 + (i % 3) * 10, startY + 15 + (i % 4) * 8);
    patternCtx.lineTo(startX + 35, startY + 40);
    patternCtx.stroke();
  }

  // Pierres sombres
  patternCtx.fillStyle = '#2d1f1f';
  for (let i = 0; i < 20; i++) {
    const x = (i * 29) % tile.width;
    const y = (i * 41) % tile.height;
    patternCtx.fillRect(x, y, 8 + (i % 4), 6 + (i % 3));
  }

  // Éclats de lave
  patternCtx.fillStyle = 'rgba(234, 88, 12, 0.5)';
  for (let i = 0; i < 15; i++) {
    const x = (i * 17 + 5) % tile.width;
    const y = (i * 31 + 7) % tile.height;
    patternCtx.beginPath();
    patternCtx.arc(x, y, 2, 0, Math.PI * 2);
    patternCtx.fill();
  }

  // Symboles occultes
  patternCtx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
  patternCtx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const cx = 32 + (i % 2) * 64;
    const cy = 32 + Math.floor(i / 2) * 64;
    patternCtx.beginPath();
    patternCtx.arc(cx, cy, 12, 0, Math.PI * 2);
    patternCtx.moveTo(cx, cy - 15);
    patternCtx.lineTo(cx, cy + 15);
    patternCtx.moveTo(cx - 15, cy);
    patternCtx.lineTo(cx + 15, cy);
    patternCtx.stroke();
  }

  return ctx.createPattern(tile, 'repeat');
}

function drawMountainDecor() {
  const mountainX = 32 * TILE;
  const mountainY = 0;
  const mountainW = 16 * TILE;
  const mountainH = WORLD_HEIGHT;
  const screenX = mountainX - camera.x;
  const screenY = mountainY - camera.y;
  const mistShift = Math.sin(Date.now() * 0.00055) * 20;

  ctx.save();
  ctx.beginPath();
  ctx.rect(screenX, screenY, mountainW, mountainH);
  ctx.clip();

  mountainPeaks.forEach((peak, index) => {
    const x = peak.x - camera.x;
    const y = peak.baseY - camera.y;

    ctx.fillStyle = index % 2 === 0 ? '#5b687a' : '#6a788c';
    ctx.beginPath();
    ctx.moveTo(x - peak.w / 2, y);
    ctx.lineTo(x, y - peak.h);
    ctx.lineTo(x + peak.w / 2, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(241, 245, 249, 0.72)';
    ctx.beginPath();
    ctx.moveTo(x - peak.w * 0.12, y - peak.h * 0.74);
    ctx.lineTo(x, y - peak.h);
    ctx.lineTo(x + peak.w * 0.16, y - peak.h * 0.72);
    ctx.lineTo(x + peak.w * 0.06, y - peak.h * 0.58);
    ctx.lineTo(x - peak.w * 0.04, y - peak.h * 0.62);
    ctx.closePath();
    ctx.fill();
  });

  ctx.fillStyle = '#4e5f71';
  ctx.beginPath();
  ctx.moveTo(screenX - 80, screenY + 520);
  ctx.lineTo(screenX + 60, screenY + 440);
  ctx.lineTo(screenX + 220, screenY + 500);
  ctx.lineTo(screenX + 360, screenY + 430);
  ctx.lineTo(screenX + 520, screenY + 520);
  ctx.lineTo(screenX + 760, screenY + 460);
  ctx.lineTo(screenX + mountainW + 80, screenY + 560);
  ctx.lineTo(screenX + mountainW + 80, screenY + 780);
  ctx.lineTo(screenX - 80, screenY + 780);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < 3; i += 1) {
    const cloudY = screenY + 180 + i * 240;
    ctx.fillStyle = 'rgba(226, 232, 240, 0.08)';
    drawCloud(screenX + 160 + i * 180 + mistShift, cloudY, 54);
    drawCloud(screenX + 350 + i * 150 - mistShift * 0.6, cloudY + 28, 42);
  }

  mountainPines.forEach((pine) => {
    const x = pine.x - camera.x;
    const y = pine.y - camera.y;
    const trunkH = 26 * pine.size;
    const trunkW = 8 * pine.size;

    ctx.fillStyle = '#4a2c1d';
    ctx.fillRect(x - trunkW / 2, y - trunkH / 2, trunkW, trunkH);

    ctx.fillStyle = '#0f3d2e';
    ctx.beginPath();
    ctx.moveTo(x, y - 42 * pine.size);
    ctx.lineTo(x - 24 * pine.size, y - 4 * pine.size);
    ctx.lineTo(x + 24 * pine.size, y - 4 * pine.size);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y - 26 * pine.size);
    ctx.lineTo(x - 28 * pine.size, y + 12 * pine.size);
    ctx.lineTo(x + 28 * pine.size, y + 12 * pine.size);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.moveTo(x, y - 12 * pine.size);
    ctx.lineTo(x - 22 * pine.size, y + 24 * pine.size);
    ctx.lineTo(x + 22 * pine.size, y + 24 * pine.size);
    ctx.closePath();
    ctx.fill();
  });

  mountainBoulders.forEach((boulder) => {
    const x = boulder.x - camera.x;
    const y = boulder.y - camera.y;
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.ellipse(x, y, boulder.w / 2, boulder.h / 2, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.ellipse(x - boulder.w * 0.15, y - boulder.h * 0.12, boulder.w * 0.22, boulder.h * 0.2, -0.15, 0, Math.PI * 2);
    ctx.fill();
  });

  mountainShrines.forEach((shrine) => {
    const x = shrine.x - camera.x;
    const y = shrine.y - camera.y;
    const scale = shrine.scale;

    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(x - 18 * scale, y - 8 * scale, 36 * scale, 30 * scale);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(x - 26 * scale, y - 8 * scale);
    ctx.lineTo(x + 26 * scale, y - 8 * scale);
    ctx.lineTo(x + 18 * scale, y - 24 * scale);
    ctx.lineTo(x - 18 * scale, y - 24 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(x - 3 * scale, y - 2 * scale, 6 * scale, 18 * scale);
    ctx.fillStyle = 'rgba(251, 191, 36, 0.16)';
    ctx.beginPath();
    ctx.arc(x, y + 12 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.fill();
  });

  mountainGrassTufts.forEach((tuft) => {
    const x = tuft.x - camera.x;
    const y = tuft.y - camera.y;
    const h = 10 * tuft.size;
    ctx.strokeStyle = '#84cc16';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y + 2);
    ctx.lineTo(x - 2, y - h);
    ctx.moveTo(x + 4, y + 2);
    ctx.lineTo(x + 3, y - h * 0.9);
    ctx.moveTo(x + 8, y + 2);
    ctx.lineTo(x + 10, y - h * 0.75);
    ctx.stroke();
  });

  mountainFlowerPatches.forEach((flower) => {
    const x = flower.x - camera.x;
    const y = flower.y - camera.y;
    ctx.fillStyle = '#2f6c33';
    ctx.fillRect(x, y, 2, 9);
    ctx.fillStyle = flower.color;
    ctx.beginPath();
    ctx.arc(x + 1, y - 1, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(x + 1, y - 1, 1, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function createForestGroundPattern() {
  const tile = document.createElement('canvas');
  tile.width = 192;
  tile.height = 192;
  const patternCtx = tile.getContext('2d');

  patternCtx.fillStyle = '#0f3f2a';
  patternCtx.fillRect(0, 0, tile.width, tile.height);

  patternCtx.fillStyle = '#1a5a37';
  for (let i = 0; i < 170; i += 1) {
    const x = (i * 37) % tile.width;
    const y = (i * 53) % tile.height;
    const w = 8 + (i % 6);
    const h = 5 + (i % 4);
    patternCtx.fillRect(x, y, w, h);
  }

  patternCtx.fillStyle = '#0b2e1f';
  for (let i = 0; i < 220; i += 1) {
    const x = (i * 29 + 11) % tile.width;
    const y = (i * 47 + 7) % tile.height;
    patternCtx.fillRect(x, y, 2, 2);
  }

  patternCtx.strokeStyle = 'rgba(134, 239, 172, 0.22)';
  patternCtx.lineWidth = 1;
  for (let y = 12; y < tile.height; y += 24) {
    for (let x = 6; x < tile.width; x += 26) {
      patternCtx.beginPath();
      patternCtx.moveTo(x, y + 6);
      patternCtx.lineTo(x + 2, y - 4);
      patternCtx.lineTo(x + 4, y + 6);
      patternCtx.stroke();
    }
  }

  return ctx.createPattern(tile, 'repeat');
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

  drawRiverWaterfall();

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

function drawRiverWaterfall() {
  const source = templeRiver.points[0];
  const plunge = templeRiver.points[1];
  const x = source.x - camera.x;
  const topY = source.y - camera.y;
  const bottomY = plunge.y - camera.y;
  const waterfallWidth = templeRiver.width * 0.64;
  const shimmer = (Math.sin(Date.now() * 0.01) + 1) / 2;

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(x - waterfallWidth / 2, topY, waterfallWidth, bottomY - topY);

  ctx.fillStyle = 'rgba(186, 230, 253, 0.65)';
  for (let i = 0; i < 6; i += 1) {
    const streamX = x - waterfallWidth / 2 + 12 + i * (waterfallWidth / 6);
    ctx.fillRect(streamX, topY, 7 + (i % 2), bottomY - topY);
  }

  ctx.fillStyle = `rgba(241, 245, 249, ${(0.36 + shimmer * 0.24).toFixed(3)})`;
  ctx.beginPath();
  ctx.ellipse(plunge.x - camera.x, bottomY + 16, templeRiver.width * 0.42, 24 + shimmer * 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(191, 219, 254, 0.7)';
  for (let i = 0; i < 8; i += 1) {
    const foamX = plunge.x - camera.x - 44 + i * 12;
    const foamY = bottomY + 14 + (i % 3) * 6;
    ctx.beginPath();
    ctx.ellipse(foamX, foamY, 8, 3, 0.2, 0, Math.PI * 2);
    ctx.fill();
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

  if (isWizard) {
    // === SORCIER VERT PIXEL ART ===
    const time = Date.now() * 0.003;
    
    // Particules magiques vertes (à gauche)
    ctx.fillStyle = '#4ade80';
    const sparkleOffset = Math.sin(time * 2) * 2;
    ctx.beginPath();
    ctx.arc(px - 8 + sparkleOffset, py + 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.arc(px - 12, py + 4, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px - 6, py + 14, 2, 0, Math.PI * 2);
    ctx.fill();

    // Bâton magique (à droite)
    ctx.fillStyle = '#5c3d2e';
    ctx.fillRect(px + player.width + 2, py - 8, 3, 40);
    // Tête du bâton (orbe)
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.arc(px + player.width + 3, py - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(px + player.width + 3, py - 10, 3, 0, Math.PI * 2);
    ctx.fill();

    // Chapeau pointu vert
    // Base du chapeau
    ctx.fillStyle = '#15803d';
    ctx.fillRect(px, py - 12, 26, 6);
    // Bande dorée
    ctx.fillStyle = '#eab308';
    ctx.fillRect(px + 2, py - 8, 22, 3);
    // Partie principale du chapeau
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(px + 2, py - 12);
    ctx.lineTo(px + 13, py - 38);
    ctx.lineTo(px + 24, py - 12);
    ctx.closePath();
    ctx.fill();
    // Pointe courbée
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(px + 13, py - 38);
    ctx.quadraticCurveTo(px + 20, py - 42, px + 24, py - 34);
    ctx.lineTo(px + 19, py - 33);
    ctx.quadraticCurveTo(px + 17, py - 36, px + 13, py - 38);
    ctx.fill();
    // Ombre sur le chapeau
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(px + 17, py - 12);
    ctx.lineTo(px + 13, py - 35);
    ctx.lineTo(px + 24, py - 12);
    ctx.closePath();
    ctx.fill();

    // Cheveux noirs (sous le chapeau)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(px + 2, py - 6, 22, 6);

    // Visage (peau claire)
    ctx.fillStyle = '#fcd9b6';
    ctx.fillRect(px + 4, py, 18, 12);
    
    // Yeux
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(px + 7, py + 4, 3, 2);
    ctx.fillRect(px + 16, py + 4, 3, 2);

    // Robe verte (corps)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(px + 2, py + 12, 22, 22);
    // Centre de la robe (noir)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(px + 9, py + 12, 8, 22);
    
    // Bras gauche (avec manche verte)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(px - 6, py + 12, 10, 8);
    // Main gauche
    ctx.fillStyle = '#fcd9b6';
    ctx.fillRect(px - 8, py + 18, 5, 5);

    // Bras droit (tenant le bâton)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(px + 22, py + 12, 8, 8);
    // Main droite
    ctx.fillStyle = '#fcd9b6';
    ctx.fillRect(px + 24, py + 18, 5, 5);

    // Bas de la robe (évasé)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(px, py + 34);
    ctx.lineTo(px - 4, py + 44);
    ctx.lineTo(px + 30, py + 44);
    ctx.lineTo(px + 26, py + 34);
    ctx.closePath();
    ctx.fill();
    // Centre bas noir
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(px + 9, py + 34);
    ctx.lineTo(px + 6, py + 44);
    ctx.lineTo(px + 20, py + 44);
    ctx.lineTo(px + 17, py + 34);
    ctx.closePath();
    ctx.fill();

    // Pieds
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(px + 2, py + 42, 8, 4);
    ctx.fillRect(px + 16, py + 42, 8, 4);

    if (player.hasLegendaryArmor) {
      // Armure légendaire dorée (sorcier)
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(px + 3, py + 13, 20, 8);
      ctx.fillRect(px + 6, py + 21, 14, 10);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(px + 5, py + 14, 3, 16);
      ctx.fillRect(px + 18, py + 14, 3, 16);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(px + 12, py + 15, 2, 14);
      // Épaulières
      ctx.fillStyle = '#eab308';
      ctx.fillRect(px - 1, py + 13, 4, 4);
      ctx.fillRect(px + 23, py + 13, 4, 4);
    }

    if (player.hasStarterPotions) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(px - 14, py + 20, 4, 6);
      ctx.fillStyle = '#f0abfc';
      ctx.fillRect(px - 14, py + 28, 4, 6);
    }
  } else {
    // === BARBARIAN PIXEL ART ===
    
    // Tête (peau)
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(px + 4, py - 2, 18, 16);
    
    // Cheveux/crâne chauve sur le dessus
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(px + 6, py - 4, 14, 4);
    
    // Barbe brune épaisse
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(px + 4, py + 8, 18, 10);
    ctx.fillRect(px + 6, py + 6, 14, 4);
    // Moustache
    ctx.fillRect(px + 6, py + 5, 5, 3);
    ctx.fillRect(px + 15, py + 5, 5, 3);
    
    // Yeux
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(px + 7, py + 2, 3, 3);
    ctx.fillRect(px + 16, py + 2, 3, 3);
    
    // Sourcils épais
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(px + 6, py, 5, 2);
    ctx.fillRect(px + 15, py, 5, 2);
    
    // Nez
    ctx.fillStyle = '#c49a6c';
    ctx.fillRect(px + 12, py + 3, 2, 4);
    
    // Corps musclé (torse nu)
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(px + 2, py + 16, 22, 18);
    
    // Muscles du torse
    ctx.fillStyle = '#c49a6c';
    // Pectoraux
    ctx.fillRect(px + 4, py + 18, 7, 5);
    ctx.fillRect(px + 15, py + 18, 7, 5);
    // Abdos
    ctx.fillRect(px + 8, py + 25, 4, 3);
    ctx.fillRect(px + 14, py + 25, 4, 3);
    ctx.fillRect(px + 8, py + 29, 4, 3);
    ctx.fillRect(px + 14, py + 29, 4, 3);
    
    // Lanières de cuir sur le torse
    ctx.fillStyle = '#654321';
    ctx.fillRect(px + 2, py + 16, 3, 18);
    ctx.fillRect(px + 21, py + 16, 3, 18);
    // Lanière en X
    ctx.beginPath();
    ctx.moveTo(px + 5, py + 16);
    ctx.lineTo(px + 13, py + 28);
    ctx.lineTo(px + 13, py + 26);
    ctx.lineTo(px + 7, py + 16);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(px + 21, py + 16);
    ctx.lineTo(px + 13, py + 28);
    ctx.lineTo(px + 13, py + 26);
    ctx.lineTo(px + 19, py + 16);
    ctx.fill();
    
    // Bras musclés
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(px - 4, py + 16, 6, 14);
    ctx.fillRect(px + 24, py + 16, 6, 14);
    // Muscles des bras
    ctx.fillStyle = '#c49a6c';
    ctx.fillRect(px - 3, py + 18, 4, 4);
    ctx.fillRect(px + 25, py + 18, 4, 4);
    
    // Mains
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(px - 4, py + 30, 6, 4);
    ctx.fillRect(px + 24, py + 30, 6, 4);
    
    // Pagne en fourrure
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(px + 2, py + 34, 22, 10);
    // Texture fourrure
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(px + 4, py + 36, 3, 6);
    ctx.fillRect(px + 10, py + 35, 3, 7);
    ctx.fillRect(px + 16, py + 36, 3, 6);
    ctx.fillRect(px + 20, py + 37, 2, 5);
    // Ceinture
    ctx.fillStyle = '#654321';
    ctx.fillRect(px + 2, py + 33, 22, 3);
    // Boucle de ceinture
    ctx.fillStyle = '#a0a0a0';
    ctx.fillRect(px + 11, py + 33, 4, 3);
    
    // Jambes
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(px + 4, py + 44, 7, 8);
    ctx.fillRect(px + 15, py + 44, 7, 8);
    
    // Bottes/pieds
    ctx.fillStyle = '#3d2817';
    ctx.fillRect(px + 3, py + 50, 9, 4);
    ctx.fillRect(px + 14, py + 50, 9, 4);

    if (player.hasLegendaryArmor) {
      // Armure légendaire dorée (barbare)
      ctx.fillStyle = '#d97706';
      ctx.fillRect(px + 3, py + 16, 20, 6);
      ctx.fillRect(px + 4, py + 22, 18, 12);
      // Bordures et reflets or
      ctx.fillStyle = '#facc15';
      ctx.fillRect(px + 4, py + 17, 2, 16);
      ctx.fillRect(px + 20, py + 17, 2, 16);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(px + 12, py + 18, 2, 13);
      // Rivets
      ctx.fillStyle = '#fde047';
      ctx.fillRect(px + 8, py + 20, 2, 2);
      ctx.fillRect(px + 16, py + 20, 2, 2);
      ctx.fillRect(px + 8, py + 27, 2, 2);
      ctx.fillRect(px + 16, py + 27, 2, 2);
    }

    // Arme (si équipée)
    if (player.hasStarterWeapon) {
      // Grande hache
      ctx.fillStyle = '#654321';
      ctx.fillRect(px + player.width + 4, py - 5, 4, 40);
      // Tête de hache
      ctx.fillStyle = '#71717a';
      ctx.beginPath();
      ctx.moveTo(px + player.width + 8, py - 5);
      ctx.lineTo(px + player.width + 20, py + 2);
      ctx.lineTo(px + player.width + 20, py + 12);
      ctx.lineTo(px + player.width + 8, py + 18);
      ctx.closePath();
      ctx.fill();
      // Reflet sur la hache
      ctx.fillStyle = '#a1a1aa';
      ctx.beginPath();
      ctx.moveTo(px + player.width + 10, py - 2);
      ctx.lineTo(px + player.width + 16, py + 3);
      ctx.lineTo(px + player.width + 16, py + 8);
      ctx.lineTo(px + player.width + 10, py + 12);
      ctx.closePath();
      ctx.fill();
    }

    // Bouclier (si équipé)
    if (player.hasStarterShield) {
      ctx.fillStyle = '#654321';
      ctx.beginPath();
      ctx.moveTo(px - 12, py + 14);
      ctx.lineTo(px - 2, py + 14);
      ctx.lineTo(px - 2, py + 32);
      ctx.lineTo(px - 7, py + 38);
      ctx.lineTo(px - 12, py + 32);
      ctx.closePath();
      ctx.fill();
      // Bordure métallique
      ctx.strokeStyle = '#71717a';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Symbole au centre
      ctx.fillStyle = '#a0a0a0';
      ctx.beginPath();
      ctx.arc(px - 7, py + 24, 4, 0, Math.PI * 2);
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
    ...mountainWallColliders,
    dragonTailBarrier,
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

function distanceToFoyer() {
  const cx = player.x + player.width / 2;
  const cy = player.y + player.height / 2;
  return Math.hypot(cx - medievalFoyer.x, cy - medievalFoyer.y);
}

function tryDepositWoodAtFoyer() {
  if (distanceToFoyer() > 64) return false;
  if (medievalFoyer.woodCount >= medievalFoyer.maxWood) {
    hintMessage = '🔥 Foyer déjà embrasé !';
    return true;
  }
  if (survivalInventory.wood <= 0) {
    hintMessage = '🪵 Tu n\'as pas de bois — ramasse-en dans la forêt (E)';
    return true;
  }
  // Déposer 1 bûche à la fois
  survivalInventory.wood--;
  medievalFoyer.woodCount++;
  syncResourceInventory(false);
  const stage = [...medievalFoyer.stages].reverse().findIndex(t => medievalFoyer.woodCount >= t);
  const stageNum = medievalFoyer.stages.length - 1 - stage;
  const stageLabels = ['', 'Des braises s\'allument…', 'Une petite flamme vacille !', 'Le feu prend bien !', '🔥 Feu de camp médiéval embrasé !'];
  hintMessage = stageLabels[stageNum] || `Bois : ${medievalFoyer.woodCount}/${medievalFoyer.maxWood}`;
  return true;
}

function handleInteract() {
  if (tryDepositWoodAtFoyer()) {
    return true;
  }
  if (tryTalkToDragon()) {
    return true;
  }
  if (tryHitFinalBoss()) {
    return true;
  }
  if (tryOpenStarterChest()) {
    return true;
  }
  if (tryOpenForestChest()) {
    return true;
  }
  if (tryHitMiniBoss()) {
    return true;
  }
  if (tryHitSubBoss()) {
    return true;
  }
  if (tryCollectMountainBossKey()) {
    return true;
  }
  if (tryOpenFinalBarrier()) {
    return true;
  }
  return tryOpenBarrier();
}

function tryOpenBarrier() {
  if (entryBarrier.isOpen) return false;
  if (distanceToBarrier() < 90) {
    entryBarrier.isOpen = true;
    return true;
  }
  return false;
}

function tryOpenFinalBarrier() {
  if (finalBarrier.isOpen) return false;
  if (distanceToFinalBarrier() >= 120) return false;
  if (!mountainBossKey.isCollected) {
    hintMessage = 'La porte du boss est verrouillée: bats le sous-boss pour la clé';
    return false;
  }
  finalBarrier.isOpen = true;
  if (hasFullLegendarySet()) {
    hintMessage = 'Barriere finale ouverte: set legendaire complet, tu peux affronter Maleficus';
  } else {
    hintMessage = `Barriere finale ouverte, mais il manque: ${formatMissingLegendaryRequirements()}`;
  }
  return true;
}

function tryTalkToDragon() {
  if (!isPlayerNearDragon()) {
    return false;
  }

  if (!dragonDialog || !dragonDialogQuestion || !dragonDialogInput) {
    const answer = window.prompt(`Smaug: ${dragonRiddle.question}\n\nReponds en un mot:`) || '';
    const normalizedAnswer = answer.trim().toLowerCase();
    if (dragonRiddle.acceptedAnswers.includes(normalizedAnswer)) {
      const hadArmorBefore = getInventoryItemCount('legendaryArmor') > 0;
      dragonRiddleSolved = true;
      if (!hadArmorBefore) {
        addItemsToInventory([{ id: 'legendaryArmor', quantity: 1 }]);
      }
      hintMessage = hadArmorBefore
        ? 'Smaug: Encore juste. Tu es digne de l\'Armure legendaire.'
        : 'Smaug: Bonne reponse. Voici l\'Armure legendaire.';
    } else if (normalizedAnswer.length > 0) {
      hintMessage = 'Smaug: Mauvaise reponse. Sans Armure legendaire, Maleficus est impossible a tuer.';
    } else {
      hintMessage = 'Smaug: Reviens me voir si tu oses repondre a mon enigme.';
    }
    return true;
  }

  openDragonDialog();

  return true;
}

function openDragonDialog() {
  if (!dragonDialog || !dragonDialogQuestion || !dragonDialogInput) {
    return;
  }
  clearMovementKeys();
  isDragonDialogOpen = true;
  dragonDialogQuestion.textContent = dragonRiddle.question;
  dragonDialogInput.value = '';
  dragonDialog.classList.remove('hidden');
  dragonDialogInput.focus();
}

function closeDragonDialog() {
  clearMovementKeys();
  isDragonDialogOpen = false;
  dragonDialog.classList.add('hidden');
}

function isDragonDialogVisible() {
  return !!dragonDialog && !dragonDialog.classList.contains('hidden');
}

function clearMovementKeys() {
  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });
}

function submitDragonDialogAnswer() {
  const normalizedAnswer = dragonDialogInput.value.trim().toLowerCase();
  closeDragonDialog();

  if (!normalizedAnswer) {
    hintMessage = 'Smaug: Le silence n\'est pas une reponse.';
    return;
  }

  const isCorrect = dragonRiddle.acceptedAnswers.includes(normalizedAnswer);
  if (isCorrect) {
    const hadArmorBefore = getInventoryItemCount('legendaryArmor') > 0;
    dragonRiddleSolved = true;
    if (!hadArmorBefore) {
      addItemsToInventory([{ id: 'legendaryArmor', quantity: 1 }]);
    }
    hintMessage = hadArmorBefore
      ? 'Smaug: Encore juste. Tu connais deja la reponse, guerrier.'
      : 'Smaug: Bonne reponse. Voici l\'Armure legendaire. Tu peux desormais completer le set final.';
    return;
  }

  hintMessage = 'Smaug: Mauvaise reponse. Sans Armure legendaire, Maleficus est impossible a tuer.';
}

function tryHitMiniBoss() {
  const nearbyBoss = getNearbyMiniBoss();
  if (!nearbyBoss) {
    return false;
  }

  nearbyBoss.hp -= 1;
  if (nearbyBoss.hp <= 0) {
    nearbyBoss.hp = 0;
    addItemsToInventory([{ id: nearbyBoss.rewardItemId, quantity: 1 }]);
    hintMessage = `${nearbyBoss.name} vaincu: ${nearbyBoss.rewardLabel} obtenu (${countDefeatedMiniBosses()}/${miniBosses.length})`;
  } else {
    hintMessage = `${nearbyBoss.name} touché (${nearbyBoss.hp} PV)`;
  }

  return true;
}

function tryHitSubBoss() {
  if (!miniBossSubBoss.isUnlocked || miniBossSubBoss.isDefeated) {
    return false;
  }

  if (!isPlayerNearSubBoss()) {
    return false;
  }

  miniBossSubBoss.hp -= 1;
  if (miniBossSubBoss.hp <= 0) {
    miniBossSubBoss.hp = 0;
    miniBossSubBoss.isDefeated = true;
    mountainBossKey.x = miniBossSubBoss.x + miniBossSubBoss.w / 2;
    mountainBossKey.y = miniBossSubBoss.y + miniBossSubBoss.h / 2;
    mountainBossKey.isDropped = true;
    hintMessage = 'Sous-boss vaincu: la clé du grand boss est tombée';
  } else {
    hintMessage = `Sous-boss touché (${miniBossSubBoss.hp} PV)`;
  }

  return true;
}

function tryCollectMountainBossKey() {
  if (mountainBossKey.isCollected || !mountainBossKey.isDropped) return false;
  if (!isPlayerNearMountainBossKey()) return false;

  mountainBossKey.isCollected = true;
  addItemsToInventory([{ id: 'bossKey', quantity: 1 }]);
  if (hasFullLegendarySet()) {
    hintMessage = 'Cle du boss recuperee. Set legendaire complet: tu peux survivre dans le sanctuaire final.';
  } else {
    hintMessage = `Cle du boss recuperee. Pour survivre: Casque legendaire, Armure legendaire, Bottes legendaires. Manque: ${formatMissingLegendaryRequirements()}`;
  }
  return true;
}

function distanceToFinalBarrier() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const barrierCenterX = finalBarrier.x + finalBarrier.w / 2;
  const barrierCenterY = finalBarrier.y + finalBarrier.h / 2;
  return Math.hypot(centerX - barrierCenterX, centerY - barrierCenterY);
}

function isPlayerNearMountainBossKey() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  return Math.hypot(centerX - mountainBossKey.x, centerY - mountainBossKey.y) <= mountainBossKey.radius + 58;
}

function isPlayerNearDragon() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const dragonCenterX = sleepingDragon.x;
  const dragonCenterY = sleepingDragon.y + 60;

  // Noyau du corps du dragon.
  if (Math.hypot(centerX - dragonCenterX, centerY - dragonCenterY) <= 230) {
    return true;
  }

  // Zone large couvrant ailes + queue, pour une interaction plus tolérante.
  const dragonZone = {
    x: sleepingDragon.x - 190,
    y: sleepingDragon.y - 170,
    w: 380,
    h: 360
  };

  const nearestX = clamp(centerX, dragonZone.x, dragonZone.x + dragonZone.w);
  const nearestY = clamp(centerY, dragonZone.y, dragonZone.y + dragonZone.h);
  return Math.hypot(centerX - nearestX, centerY - nearestY) <= 90;
}

function getNearbyMiniBoss() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  for (const boss of miniBosses) {
    if (boss.hp <= 0) {
      continue;
    }

    const bossCenterX = boss.x + boss.w / 2;
    const bossCenterY = boss.y + boss.h / 2;
    const distance = Math.hypot(centerX - bossCenterX, centerY - bossCenterY);
    if (distance < 82) {
      return boss;
    }
  }

  return null;
}

function isPlayerNearSubBoss() {
  if (!miniBossSubBoss.isUnlocked || miniBossSubBoss.isDefeated) {
    return false;
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const bossCenterX = miniBossSubBoss.x + miniBossSubBoss.w / 2;
  const bossCenterY = miniBossSubBoss.y + miniBossSubBoss.h / 2;
  return Math.hypot(centerX - bossCenterX, centerY - bossCenterY) < 94;
}

function countDefeatedMiniBosses() {
  let defeated = 0;
  miniBosses.forEach((boss) => {
    if (boss.hp <= 0) {
      defeated += 1;
    }
  });
  return defeated;
}

function tryOpenStarterChest() {
  if (starterChest.isOpened) return false;
  if (distanceToStarterChest() >= 80) return false;

  starterChest.isOpened = true;
  if (selectedClass === 'sorcier') {
    addItemsToInventory([
      { id: 'noviceStaff', quantity: 1 },
      { id: 'healingPotion', quantity: 2 },
      { id: 'waterFlask', quantity: 1 }
    ]);
  } else {
    addItemsToInventory([
      { id: 'shortSword', quantity: 1 },
      { id: 'roundShield', quantity: 1 },
      { id: 'bandage', quantity: 1 },
      { id: 'cookedMeat', quantity: 1 }
    ]);
  }

  hintMessage = 'Coffre ouvert: equipement et provisions recuperes';
  return true;
}

function tryOpenForestChest() {
  const nearbyChest = getNearbyForestChest();
  if (!nearbyChest || nearbyChest.isOpened) {
    return false;
  }

  nearbyChest.isOpened = true;
  addItemsToInventory(nearbyChest.loot);

  if (nearbyChest.hasBeeTrap && !beeSwarm.isDefeated) {
    beeSwarm.isActive = true;
    beeSwarm.x = nearbyChest.x + nearbyChest.w / 2;
    beeSwarm.y = nearbyChest.y + nearbyChest.h / 2;
    beeSwarm.lastDamageTime = 0;
    hintMessage = '🐝 Piège ! Des abeilles t attaquent. Attire-les vers un feu de camp allumé';
  } else {
    hintMessage = 'Coffre de foret ouvert: provisions ajoutees';
  }
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
  inventoryItems = [];
  inventoryTitle.textContent = `Inventaire ${choice === 'sorcier' ? 'du Sorcier' : 'du Barbare'}`;
  syncResourceInventory(false);
  renderInventory();
}

function addItemsToInventory(items) {
  let shouldSyncResources = false;

  items.forEach((rawItem) => {
    const item = normalizeInventoryItem(rawItem);
    if (!item) {
      return;
    }

    const resourceKey = resourceInventoryBindings[item.id];
    if (resourceKey) {
      survivalInventory[resourceKey] = (survivalInventory[resourceKey] || 0) + item.quantity;
      shouldSyncResources = true;
      return;
    }

    addInventoryItem(item.id, item.quantity, false);
  });

  if (shouldSyncResources) {
    syncResourceInventory(false);
  }

  updatePlayerInventoryFlags();
  renderInventory();
}

function renderInventory() {
  inventoryGrid.innerHTML = '';
  sortInventoryItems();

  inventoryItems.forEach((item) => {
    const definition = inventoryItemDefinitions[item.id];
    if (!definition) {
      return;
    }

    const slot = document.createElement('div');
    slot.className = 'inventory-slot';

    const category = document.createElement('span');
    category.className = 'inventory-category';
    category.textContent = inventoryCategoryLabels[definition.category] || 'Objet';

    const label = document.createElement('strong');
    label.className = 'inventory-name';
    label.textContent = definition.label;

    const description = document.createElement('span');
    description.className = 'inventory-desc';
    description.textContent = definition.description;

    const footer = document.createElement('div');
    footer.className = 'inventory-slot-footer';

    const quantity = document.createElement('span');
    quantity.className = 'inventory-qty';
    quantity.textContent = definition.stackable === false ? 'Unique' : `x${item.quantity}`;

    footer.appendChild(quantity);

    if (canUseInventoryItem(item.id)) {
      const action = document.createElement('button');
      action.className = 'inventory-action';
      action.type = 'button';
      action.textContent = definition.useLabel || 'Utiliser';
      action.addEventListener('click', () => {
        useInventoryItem(item.id);
      });
      footer.appendChild(action);
    }

    slot.appendChild(category);
    slot.appendChild(label);
    slot.appendChild(description);
    slot.appendChild(footer);
    inventoryGrid.appendChild(slot);
  });
}

function normalizeInventoryItem(rawItem) {
  if (!rawItem) {
    return null;
  }

  if (typeof rawItem === 'string') {
    const legacyItems = {
      'Clé du boss': { id: 'bossKey', quantity: 1 }
    };
    return legacyItems[rawItem] || null;
  }

  if (!rawItem.id || !inventoryItemDefinitions[rawItem.id]) {
    return null;
  }

  return {
    id: rawItem.id,
    quantity: rawItem.quantity || 1
  };
}

function getInventoryItem(itemId) {
  return inventoryItems.find((item) => item.id === itemId);
}

function getInventoryItemCount(itemId) {
  const item = getInventoryItem(itemId);
  return item ? item.quantity : 0;
}

function getMissingLegendaryRequirements() {
  return finalBossLegendaryRequirements.filter((requirement) => getInventoryItemCount(requirement.id) <= 0);
}

function hasFullLegendarySet() {
  return getMissingLegendaryRequirements().length === 0;
}

function formatMissingLegendaryRequirements() {
  const missing = getMissingLegendaryRequirements();
  if (missing.length === 0) {
    return 'aucun';
  }
  return missing.map((requirement) => requirement.label).join(', ');
}

function addInventoryItem(itemId, quantity = 1, shouldRender = true) {
  const definition = inventoryItemDefinitions[itemId];
  if (!definition) {
    return;
  }

  const existing = getInventoryItem(itemId);
  if (existing) {
    if (definition.stackable === false) {
      if (shouldRender) {
        renderInventory();
      }
      return;
    }
    existing.quantity += quantity;
  } else {
    inventoryItems.push({
      id: itemId,
      quantity: definition.stackable === false ? 1 : quantity
    });
    applyPassiveInventoryEffect(itemId);
  }

  updatePlayerInventoryFlags();
  if (shouldRender) {
    renderInventory();
  }
}

function removeInventoryItem(itemId, quantity = 1, shouldRender = true) {
  const existing = getInventoryItem(itemId);
  if (!existing) {
    return false;
  }

  existing.quantity -= quantity;
  if (existing.quantity <= 0) {
    inventoryItems = inventoryItems.filter((item) => item.id !== itemId);
  }

  updatePlayerInventoryFlags();
  if (shouldRender) {
    renderInventory();
  }

  return true;
}

function syncResourceInventory(shouldRender = true) {
  Object.entries(resourceInventoryBindings).forEach(([itemId, resourceKey]) => {
    const quantity = survivalInventory[resourceKey] || 0;
    const existing = getInventoryItem(itemId);

    if (quantity <= 0) {
      if (existing) {
        inventoryItems = inventoryItems.filter((item) => item.id !== itemId);
      }
      return;
    }

    if (existing) {
      existing.quantity = quantity;
    } else {
      inventoryItems.push({ id: itemId, quantity });
    }
  });

  updatePlayerInventoryFlags();
  if (shouldRender) {
    renderInventory();
  }
}

function updatePlayerInventoryFlags() {
  player.hasStarterWeapon = getInventoryItemCount('shortSword') > 0 || getInventoryItemCount('noviceStaff') > 0;
  player.hasStarterShield = getInventoryItemCount('roundShield') > 0;
  player.hasStarterPotions = getInventoryItemCount('healingPotion') > 0;
  player.hasLegendaryArmor = getInventoryItemCount('legendaryArmor') > 0;
}

function applyPassiveInventoryEffect(itemId) {
  if (itemId === 'shortSword') {
    player.force += 15;
    return;
  }

  if (itemId === 'noviceStaff') {
    player.mage += 18;
    return;
  }

  if (itemId === 'roundShield') {
    player.maxHealth += 20;
    player.health = clamp(player.health + 20, 0, player.maxHealth);
  }
}

function sortInventoryItems() {
  inventoryItems.sort((left, right) => {
    const leftDefinition = inventoryItemDefinitions[left.id];
    const rightDefinition = inventoryItemDefinitions[right.id];
    const leftOrder = inventoryCategoryOrder[leftDefinition.category] ?? 99;
    const rightOrder = inventoryCategoryOrder[rightDefinition.category] ?? 99;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return leftDefinition.label.localeCompare(rightDefinition.label, 'fr');
  });
}

function canUseInventoryItem(itemId) {
  return ['bandage', 'healingPotion', 'waterFlask', 'berries', 'cookedMeat'].includes(itemId);
}

function useInventoryItem(itemId) {
  if (itemId === 'bandage') {
    if (player.health >= player.maxHealth) {
      hintMessage = 'Vie deja pleine';
      return false;
    }

    player.health = clamp(player.health + 25, 0, player.maxHealth);
    removeInventoryItem('bandage', 1, false);
    hintMessage = 'Bandage utilise: +25 PV';
  } else if (itemId === 'healingPotion') {
    if (player.health >= player.maxHealth) {
      hintMessage = 'Vie deja pleine';
      return false;
    }

    player.health = clamp(player.health + 45, 0, player.maxHealth);
    removeInventoryItem('healingPotion', 1, false);
    hintMessage = 'Potion bue: +45 PV';
  } else if (itemId === 'waterFlask') {
    if (survival.thirst >= survival.maxThirst) {
      hintMessage = 'Soif deja pleine';
      return false;
    }

    if (survivalInventory.water <= 0) {
      return false;
    }

    survivalInventory.water -= 1;
    survival.thirst = clamp(survival.thirst + 35, 0, survival.maxThirst);
    syncResourceInventory(false);
    hintMessage = 'Gourde bue: +35 soif';
  } else if (itemId === 'berries') {
    if (survivalInventory.berries <= 0) {
      return false;
    }

    survivalInventory.berries -= 1;
    const atePoisonedBerry = survivalInventory.poisonedBerries > 0;
    if (atePoisonedBerry) {
      survivalInventory.poisonedBerries -= 1;
    }

    const berryEffect = applyForestBerryEffect(atePoisonedBerry);
    syncResourceInventory(false);

    if (berryEffect.randomHungerLoss > 0) {
      hintMessage = berryEffect.gotPoisoned
        ? `Baie sauvage: +${berryEffect.baseHungerRestore} faim, -${berryEffect.randomHungerLoss} faim, poison !`
        : `Baie sauvage: +${berryEffect.baseHungerRestore} faim, -${berryEffect.randomHungerLoss} faim`;
    } else {
      hintMessage = `Baies mangees: +${berryEffect.baseHungerRestore} faim`;
    }
  } else if (itemId === 'cookedMeat') {
    if (survival.hunger >= survival.maxHunger) {
      hintMessage = 'Faim deja pleine';
      return false;
    }

    if (survivalInventory.cookedMeat <= 0) {
      return false;
    }

    survivalInventory.cookedMeat -= 1;
    survival.hunger = clamp(survival.hunger + 40, 0, survival.maxHunger);
    syncResourceInventory(false);
    hintMessage = 'Viande mangee: +40 faim';
  } else {
    return false;
  }

  updateHealthHud();
  updateSurvivalHUD();
  renderInventory();
  return true;
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

// === FONCTIONS DE SURVIE ===

function initSurvival() {
  generateSurvivalResources();
  survival.lastUpdate = Date.now();
  survival.hunger = 100;
  survival.thirst = 100;
  survival.temperature = 20;
  survival.dayTime = 360;
  survival.day = 1;
  survival.poisonUntil = 0;
  survival.nextPoisonTick = 0;
  survivalInventory.wood = 2;
  survivalInventory.stone = 1;
  survivalInventory.berries = 3;
  survivalInventory.poisonedBerries = 0;
  survivalInventory.water = 1;
  syncResourceInventory();
}

function updateSurvival() {
  const now = Date.now();
  const deltaSeconds = (now - survival.lastUpdate) / 1000;
  survival.lastUpdate = now;
  
  // Mise à jour du cycle jour/nuit
  survival.dayTime += survival.daySpeed * deltaSeconds;
  if (survival.dayTime >= 1440) {
    survival.dayTime -= 1440;
    survival.day++;
  }
  
  // Déterminer si c'est la nuit (20h - 6h)
  survival.isNight = survival.dayTime < 360 || survival.dayTime >= 1200;
  
  // Calculer la température ambiante selon la zone et l'heure
  let baseTemp = 20;
  if (currentZone === 'Montagnes Brisées') baseTemp = 8;
  else if (currentZone === 'Sanctuaire Final') baseTemp = 35;
  else if (currentZone === 'Forêt Ancienne') baseTemp = 18;
  
  // La nuit fait baisser la température
  if (survival.isNight) {
    baseTemp -= 12;
  }
  
  // Près d'un feu de camp = +15°C
  survival.nearCampfire = isNearCampfire();
  if (survival.nearCampfire) {
    baseTemp += 15;
  }
  
  // Transition douce de la température
  survival.temperature += (baseTemp - survival.temperature) * 0.02;
  survival.temperature = clamp(survival.temperature, survival.minTemp, survival.maxTemp);
  
  // Diminution de la faim et de la soif
  survival.hunger -= survival.hungerRate * deltaSeconds;
  survival.thirst -= survival.thirstRate * deltaSeconds;
  survival.hunger = clamp(survival.hunger, 0, survival.maxHunger);
  survival.thirst = clamp(survival.thirst, 0, survival.maxThirst);
  
  // Dégâts de survie
  if (survival.hunger <= 0) {
    player.health -= survival.starvingDamage * deltaSeconds;
  }
  if (survival.thirst <= 0) {
    player.health -= survival.dehydrationDamage * deltaSeconds;
  }
  if (survival.temperature < 5) {
    player.health -= survival.freezingDamage * deltaSeconds * (1 - survival.temperature / 5);
  }
  if (survival.temperature > 35) {
    player.health -= survival.overheatDamage * deltaSeconds * ((survival.temperature - 35) / 10);
  }

  // Effet de poison (le Sorcier subit moins de dégâts)
  if (survival.poisonUntil > now) {
    if (now >= survival.nextPoisonTick) {
      const poisonMultiplier = player.className === 'Sorcier' ? 0.5 : 1;
      player.health -= survival.poisonDamagePerTick * poisonMultiplier;
      survival.nextPoisonTick = now + 1000;
      if (Math.random() < 0.25) {
        hintMessage = player.className === 'Sorcier'
          ? 'Poison affaibli: le Sorcier résiste.'
          : 'Poison en cours...';
      }
    }
  } else {
    survival.poisonUntil = 0;
  }
  
  player.health = clamp(player.health, 0, player.maxHealth);
  
  // Respawn des ressources
  const respawnDelay = 30000; // 30 secondes
  survivalResources.berries.forEach(berry => {
    if (berry.collected && now > berry.respawnTime) {
      berry.collected = false;
    }
  });
  survivalResources.wood.forEach(wood => {
    if (wood.collected && now > wood.respawnTime) {
      wood.collected = false;
    }
  });
  survivalResources.stone.forEach(stone => {
    if (stone.collected && now > stone.respawnTime) {
      stone.collected = false;
    }
  });
  
  // Mise à jour du HUD
  updateSurvivalHUD();
}

function updateSurvivalHUD() {
  // Faim
  const hungerPercent = (survival.hunger / survival.maxHunger) * 100;
  if (hungerFill) hungerFill.style.width = `${hungerPercent}%`;
  if (hungerText) hungerText.textContent = Math.round(survival.hunger);
  
  // Soif
  const thirstPercent = (survival.thirst / survival.maxThirst) * 100;
  if (thirstFill) thirstFill.style.width = `${thirstPercent}%`;
  if (thirstText) thirstText.textContent = Math.round(survival.thirst);
  
  // Température
  const tempPercent = ((survival.temperature - survival.minTemp) / (survival.maxTemp - survival.minTemp)) * 100;
  if (tempFill) tempFill.style.width = `${tempPercent}%`;
  if (tempText) tempText.textContent = `${Math.round(survival.temperature)}°C`;
  
  // Jour/Nuit
  const hours = Math.floor(survival.dayTime / 60);
  const minutes = Math.floor(survival.dayTime % 60);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const icon = survival.isNight ? '🌙' : '☀️';
  if (dayNightIndicator) {
    dayNightIndicator.textContent = `${icon} Jour ${survival.day} - ${timeStr}`;
    dayNightIndicator.style.color = survival.isNight ? '#94a3b8' : '#fbbf24';
  }
}

function applyForestBerryEffect(forcedPoison = false) {
  const now = Date.now();
  const baseHungerRestore = 25;
  survival.hunger = clamp(survival.hunger + baseHungerRestore, 0, survival.maxHunger);

  let randomHungerLoss = 0;
  let gotPoisoned = false;

  // Certaines baies ramassées en forêt sont empoisonnées.
  if (forcedPoison) {
    randomHungerLoss = Math.floor(Math.random() * 13) + 8; // 8..20
    survival.hunger = clamp(survival.hunger - randomHungerLoss, 0, survival.maxHunger);

    gotPoisoned = true;
    const poisonDurationMs = player.className === 'Sorcier' ? 4000 : 8000;
    survival.poisonUntil = Math.max(survival.poisonUntil, now + poisonDurationMs);
    survival.nextPoisonTick = now + 800;
  }

  return {
    baseHungerRestore,
    randomHungerLoss,
    gotPoisoned
  };
}

function updateBeeSwarm() {
  if (!beeSwarm.isActive) {
    return;
  }

  if (isBeeSwarmNearActiveFire()) {
    beeSwarm.isActive = false;
    beeSwarm.isDefeated = true;
    hintMessage = '🔥 Les abeilles fuient la fumee du feu de camp. Danger passe';
    return;
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const dx = centerX - beeSwarm.x;
  const dy = centerY - beeSwarm.y;
  const dist = Math.hypot(dx, dy) || 1;

  beeSwarm.x += (dx / dist) * beeSwarm.speed;
  beeSwarm.y += (dy / dist) * beeSwarm.speed;
  beeSwarm.orbitAngle += 0.18;
}

function isBeeSwarmNearActiveFire() {
  if (medievalFoyer.woodCount > 0) {
    const foyerDist = Math.hypot(beeSwarm.x - medievalFoyer.x, beeSwarm.y - medievalFoyer.y);
    if (foyerDist < 92) {
      return true;
    }
  }

  return survivalResources.campfires.some((fire) => {
    const dist = Math.hypot(beeSwarm.x - fire.x, beeSwarm.y - fire.y);
    return dist < 84;
  });
}

function isNearCampfire() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  
  return survivalResources.campfires.some(fire => {
    const dist = Math.hypot(centerX - fire.x, centerY - fire.y);
    return dist < 80;
  });
}

function tryCollectResource() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  
  // Collecter des baies
  for (const berry of survivalResources.berries) {
    if (berry.collected) continue;
    const dist = Math.hypot(centerX - berry.x, centerY - berry.y);
    if (dist < 40) {
      berry.collected = true;
      berry.respawnTime = Date.now() + 30000;

      const isForestBerry = berry.x >= 16 * TILE && berry.x < 32 * TILE;
      const isPoisonedBerry = isForestBerry && Math.random() < 0.4;

      survivalInventory.berries++;
      if (isPoisonedBerry) {
        survivalInventory.poisonedBerries++;
      }
      syncResourceInventory();
      hintMessage = isPoisonedBerry
        ? `Baies collectees (+1) - Total: ${survivalInventory.berries} (une baie semble empoisonnee...)`
        : `Baies collectees (+1) - Total: ${survivalInventory.berries}`;
      return true;
    }
  }
  
  // Collecter du bois
  for (const wood of survivalResources.wood) {
    if (wood.collected) continue;
    const dist = Math.hypot(centerX - wood.x, centerY - wood.y);
    if (dist < 45) {
      wood.collected = true;
      wood.respawnTime = Date.now() + 45000;
      survivalInventory.wood++;
      syncResourceInventory();
      hintMessage = `Bois collecté (+1) - Total: ${survivalInventory.wood}`;
      return true;
    }
  }
  
  // Collecter de la pierre
  for (const stone of survivalResources.stone) {
    if (stone.collected) continue;
    const dist = Math.hypot(centerX - stone.x, centerY - stone.y);
    if (dist < 40) {
      stone.collected = true;
      stone.respawnTime = Date.now() + 60000;
      survivalInventory.stone++;
      syncResourceInventory();
      hintMessage = `Pierre collectée (+1) - Total: ${survivalInventory.stone}`;
      return true;
    }
  }
  
  // Boire de l'eau
  for (const water of survivalResources.waterSources) {
    const dist = Math.hypot(centerX - water.x, centerY - water.y);
    if (dist < water.radius) {
      survival.thirst = clamp(survival.thirst + water.thirstRestore, 0, survival.maxThirst);
      hintMessage = `Soif restaurée (+${water.thirstRestore})`;
      return true;
    }
  }
  
  return false;
}

function tryEatFood() {
  return useInventoryItem('berries') || useInventoryItem('cookedMeat');
}

function tryPlaceCampfire() {
  if (survivalInventory.wood >= 3 && survivalInventory.stone >= 2) {
    survivalInventory.wood -= 3;
    survivalInventory.stone -= 2;
    syncResourceInventory(false);
    survivalResources.campfires.push({
      x: player.x + player.width / 2,
      y: player.y + player.height / 2 + 30,
      createdAt: Date.now()
    });
    hintMessage = 'Feu de camp placé! Reste près pour te réchauffer.';
    return true;
  }
  hintMessage = `Feu de camp: besoin de 3 bois (${survivalInventory.wood}) et 2 pierres (${survivalInventory.stone})`;
  return false;
}

function drawSurvivalResources() {
  // Dessiner les baies
  survivalResources.berries.forEach(berry => {
    if (berry.collected) return;
    const x = berry.x - camera.x;
    const y = berry.y - camera.y;
    
    // Buisson
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Baies
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(x - 4, y - 3, 4, 0, Math.PI * 2);
    ctx.arc(x + 3, y - 2, 3.5, 0, Math.PI * 2);
    ctx.arc(x, y + 4, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Dessiner le bois
  survivalResources.wood.forEach(wood => {
    if (wood.collected) return;
    const x = wood.x - camera.x;
    const y = wood.y - camera.y;
    
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - 15, y - 4, 30, 8);
    ctx.fillRect(x - 12, y + 2, 24, 6);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x - 10, y - 2, 20, 4);
  });
  
  // Dessiner la pierre
  survivalResources.stone.forEach(stone => {
    if (stone.collected) return;
    const x = stone.x - camera.x;
    const y = stone.y - camera.y;
    
    ctx.fillStyle = '#6b7280';
    ctx.beginPath();
    ctx.ellipse(x, y, 14, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#9ca3af';
    ctx.beginPath();
    ctx.ellipse(x - 3, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Dessiner les sources d'eau (indication)
  survivalResources.waterSources.forEach(water => {
    const x = water.x - camera.x;
    const y = water.y - camera.y;
    
    ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, water.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#7dd3fc';
    ctx.font = '10px Arial';
    ctx.fillText('💧 Eau', x - 15, y - water.radius - 5);
  });
  
  // Dessiner les feux de camp
  survivalResources.campfires.forEach(fire => {
    const x = fire.x - camera.x;
    const y = fire.y - camera.y;
    const time = Date.now() * 0.008;
    const flicker = Math.sin(time) * 5;
    
    // Zone de chaleur
    ctx.fillStyle = 'rgba(251, 146, 60, 0.15)';
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI * 2);
    ctx.fill();
    
    // Pierres
    ctx.fillStyle = '#4b5563';
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(x + Math.cos(angle) * 14, y + Math.sin(angle) * 10, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Bois
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - 10, y - 3, 20, 6);
    ctx.fillRect(x - 8, y + 2, 16, 5);
    
    // Flammes
    const flameGrad = ctx.createLinearGradient(x, y, x, y - 30 - flicker);
    flameGrad.addColorStop(0, '#f97316');
    flameGrad.addColorStop(0.5, '#fbbf24');
    flameGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x - 8, y);
    ctx.quadraticCurveTo(x - 5 + flicker * 0.3, y - 15, x, y - 28 - flicker);
    ctx.quadraticCurveTo(x + 5 - flicker * 0.3, y - 15, x + 8, y);
    ctx.closePath();
    ctx.fill();
    
    // Étincelles
    ctx.fillStyle = '#fef08a';
    for (let i = 0; i < 4; i++) {
      const sparkX = x + Math.sin(time * 2 + i) * 8;
      const sparkY = y - 20 - (time * 3 + i * 5) % 20;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function drawBeeSwarm() {
  if (!beeSwarm.isActive) {
    return;
  }

  const centerX = beeSwarm.x - camera.x;
  const centerY = beeSwarm.y - camera.y;
  const t = Date.now() * 0.015;

  ctx.save();

  ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, beeSwarm.hitRadius - 16, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 14; i++) {
    const angle = beeSwarm.orbitAngle + (i / 14) * Math.PI * 2;
    const wobble = Math.sin(t + i) * 4;
    const r = beeSwarm.orbitRadius + 10 + wobble;
    const bx = centerX + Math.cos(angle) * r;
    const by = centerY + Math.sin(angle) * r * 0.7;

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(bx + 1, by, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 12px Arial';
  ctx.fillText('Essaim', centerX - 20, centerY - 24);

  ctx.restore();
}

function drawNightOverlay() {
  if (!survival.isNight) return;
  
  // Calcul de l'intensité de la nuit
  let nightIntensity = 0.5;
  if (survival.dayTime < 360) {
    // Entre minuit et 6h
    nightIntensity = 0.6 - (survival.dayTime / 360) * 0.2;
  } else {
    // Entre 20h et minuit
    nightIntensity = 0.4 + ((survival.dayTime - 1200) / 240) * 0.2;
  }
  
  // Overlay sombre
  ctx.fillStyle = `rgba(10, 15, 30, ${nightIntensity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Zone éclairée autour des feux de camp
  survivalResources.campfires.forEach(fire => {
    const x = fire.x - camera.x;
    const y = fire.y - camera.y;
    
    const lightGrad = ctx.createRadialGradient(x, y, 0, x, y, 100);
    lightGrad.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
    lightGrad.addColorStop(0.5, 'rgba(251, 146, 60, 0.2)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = lightGrad;
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  });

  // Lumière du foyer médiéval (proportionnelle à l'intensité du feu)
  if (medievalFoyer.woodCount > 0) {
    const fx = medievalFoyer.x - camera.x;
    const fy = medievalFoyer.y - camera.y;
    const stages = medievalFoyer.stages;
    let stage = 0;
    for (let i = stages.length - 1; i >= 0; i--) {
      if (medievalFoyer.woodCount >= stages[i]) { stage = i; break; }
    }
    const flicker = Math.sin(Date.now() * 0.008) * 0.05;
    const lightR = 80 + stage * 40;
    const intensity = 0.18 + stage * 0.10 + flicker;
    const foyerLight = ctx.createRadialGradient(fx, fy, 0, fx, fy, lightR);
    foyerLight.addColorStop(0, `rgba(251, 191, 36, ${(intensity * 2.2).toFixed(2)})`);
    foyerLight.addColorStop(0.35, `rgba(234, 88, 12, ${intensity.toFixed(2)})`);
    foyerLight.addColorStop(0.7, `rgba(120, 40, 0, ${(intensity * 0.4).toFixed(2)})`);
    foyerLight.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = foyerLight;
    ctx.beginPath();
    ctx.arc(fx, fy, lightR, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
  
  // Légère lumière autour du joueur
  const px = player.x + player.width / 2 - camera.x;
  const py = player.y + player.height / 2 - camera.y;
  const playerLight = ctx.createRadialGradient(px, py, 0, px, py, 60);
  playerLight.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  playerLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = playerLight;
  ctx.beginPath();
  ctx.arc(px, py, 60, 0, Math.PI * 2);
  ctx.fill();
}

function checkEnemyCollision() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  // Collision avec l'essaim d'abeilles
  if (beeSwarm.isActive) {
    const now = Date.now();
    const dist = Math.hypot(centerX - beeSwarm.x, centerY - beeSwarm.y);
    if (dist < beeSwarm.hitRadius && now - beeSwarm.lastDamageTime >= beeSwarm.damageCooldownMs) {
      player.health -= beeSwarm.contactDamage;
      beeSwarm.lastDamageTime = now;
    }
  }
  
  // Collision avec les mini-boss
  for (const boss of miniBosses) {
    if (boss.hp <= 0) continue;
    
    const bossCenterX = boss.x + boss.w / 2;
    const bossCenterY = boss.y + boss.h / 2;
    const dist = Math.hypot(centerX - bossCenterX, centerY - bossCenterY);
    
    if (dist < 35) {
      player.health -= 0.5; // Dégâts au contact
      // Repousser le joueur
      const angle = Math.atan2(centerY - bossCenterY, centerX - bossCenterX);
      player.x += Math.cos(angle) * 3;
      player.y += Math.sin(angle) * 3;
    }
  }
  
  // Collision avec le sous-boss (Cerbère)
  if (miniBossSubBoss.isUnlocked && !miniBossSubBoss.isDefeated) {
    const bossCenterX = miniBossSubBoss.x + miniBossSubBoss.w / 2;
    const bossCenterY = miniBossSubBoss.y + miniBossSubBoss.h / 2;
    const dist = Math.hypot(centerX - bossCenterX, centerY - bossCenterY);
    
    if (dist < 50) {
      player.health -= miniBossSubBoss.contactDamage; // Dégâts augmentés
      const angle = Math.atan2(centerY - bossCenterY, centerX - bossCenterX);
      player.x += Math.cos(angle) * 6; // Répulsion plus forte
      player.y += Math.sin(angle) * 6;
    }
  }
  
  // Collision avec le boss final (cooldown-based, knockback fort)
  if (!finalBoss.isDefeated && currentZone === 'Sanctuaire Final') {
    const now = Date.now();
    const fbcx = finalBoss.x + finalBoss.w / 2;
    const fbcy = finalBoss.y + finalBoss.h / 2;
    const fd = Math.hypot(centerX - fbcx, centerY - fbcy);
    if (fd < 44 && now - finalBoss.lastContactTime > finalBoss.contactCooldownMs) {
      player.health -= finalBoss.contactDamage;
      finalBoss.lastContactTime = now;
      const angle = Math.atan2(centerY - fbcy, centerX - fbcx);
      player.x += Math.cos(angle) * 26;
      player.y += Math.sin(angle) * 26;
    }
  }
  
  player.health = clamp(player.health, 0, player.maxHealth);
}

function drawSurvivalInventoryHUD() {
  const hudX = 16;
  const hudY = canvas.height - 60;
  const hudWidth = 380;
  
  ctx.fillStyle = 'rgba(2, 6, 23, 0.8)';
  ctx.fillRect(hudX, hudY, hudWidth, 50);
  ctx.strokeStyle = '#475569';
  ctx.strokeRect(hudX, hudY, hudWidth, 50);
  
  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px Arial';
  ctx.fillText(`🪵 ${survivalInventory.wood}  🪨 ${survivalInventory.stone}  🫐 ${survivalInventory.berries}  🥩 ${survivalInventory.cookedMeat}  🥤 ${survivalInventory.water}`, hudX + 10, hudY + 20);
  ctx.fillText('F: Manger | C: Feu de camp | E: Collecter | B: Inventaire', hudX + 10, hudY + 40);
}

function gameLoop() {
  if (!gameStarted) return;
  
  if (isVictory) {
    draw();
    requestAnimationFrame(gameLoop);
    return;
  }

  if (isGameOver) {
    drawGameOver();
    requestAnimationFrame(gameLoop);
    return;
  }
  
  // Vérifier la mort du joueur
  if (player.health <= 0) {
    isGameOver = true;
    if (survival.hunger <= 0) {
      gameOverReason = 'Tu es mort de faim...';
    } else if (survival.thirst <= 0) {
      gameOverReason = 'Tu es mort de soif...';
    } else if (survival.temperature < 5) {
      gameOverReason = 'Tu es mort de froid...';
    } else if (survival.temperature > 35) {
      gameOverReason = 'Tu es mort de chaleur...';
    } else {
      gameOverReason = 'Tu as été vaincu par les ennemis...';
    }
  }
  
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function drawGameOver() {
  // Fond sombre
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Texte GAME OVER
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 60);
  
  // Raison de la mort
  ctx.fillStyle = '#f8fafc';
  ctx.font = '24px Arial';
  ctx.fillText(gameOverReason, canvas.width / 2, canvas.height / 2 + 10);
  
  // Stats
  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px Arial';
  ctx.fillText(`Jour ${survival.day} - Tu as survécu ${survival.day - 1} jour(s)`, canvas.width / 2, canvas.height / 2 + 60);
  
  // Instructions pour recommencer
  const pulse = (Math.sin(Date.now() * 0.005) + 1) / 2;
  ctx.fillStyle = `rgba(251, 191, 36, ${0.6 + pulse * 0.4})`;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Appuie sur R pour recommencer', canvas.width / 2, canvas.height / 2 + 120);
  
  ctx.textAlign = 'left';
}

function restartGame() {
  isGameOver = false;
  gameOverReason = '';
  isVictory = false;
  gameStarted = false;
  characterScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  initializeIntroMenu();
}

// Écouter la touche R pour recommencer
window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r' && (isGameOver || isVictory)) {
    restartGame();
  }
});
