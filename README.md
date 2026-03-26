# Game Jam - Temple des Brumes

Ce document explique a quoi sert le code et ou il se trouve.

## 1) Structure du projet

- index.html: structure de l interface (menus, HUD, canvas, inventaire, dialogue).
- style.css: style visuel (layout, animations, boutons, HUD).
- game.js: logique complete du jeu (etat, deplacements, survie, inventaire, boss, rendu).
- main.go: petit serveur local pour lancer le jeu dans le navigateur.
- go.mod: configuration module Go.
- Jeuxcaca/style.css: fichier CSS secondaire (ancien ou alternatif selon usage).

## 2) Comment lancer le projet

1. Ouvrir un terminal dans le dossier du projet.
2. Lancer:

```bash
go run .
```

3. Ouvrir http://localhost:8080 si le navigateur ne s ouvre pas automatiquement.

## 3) Ou se trouve chaque partie importante

## 3.1 Interface (HTML)

Fichier: index.html

- Ecran intro/titre: lignes ~10 a ~27.
- Ecran de preparation (nom, classe, difficulte): lignes ~28 a ~61.
- Ecran de jeu + HUD + canvas: lignes ~64 a ~100.
- Inventaire (panel lateral): lignes ~102 a ~109.
- Dialogue dragon: lignes ~111 a ~122.
- Chargement script principal: ligne ~126.

## 3.2 Style (CSS)

Fichier: style.css

- Base page/app/panel: lignes ~1 a ~24.
- Style intro atmospherique (mist, ember): lignes ~26 a ~100.
- Formulaire setup (choix classe/difficulte): lignes ~120 a ~220.
- Boutons principaux/secondaires: lignes ~171 a ~203.
- Animations CSS (drift, emberRise): lignes ~229 a ~239.

## 3.3 Logique jeu (JavaScript)

Fichier: game.js

A) Initialisation et menus
- initializeIntroMenu: ligne ~962
- showTitleScreen: ligne ~978
- showSetupScreen: ligne ~987
- sanitizePlayerName: ligne ~1001
- applyDifficultyPreset: ligne ~1025
- startGame: ligne ~1138

B) Controle clavier et interactions
- keydown global: ligne ~1057
- keyup global: ligne ~1111
- handleInteract: ligne ~4823
- tryCollectResource: ligne ~5764

C) Boucle principale
- update: ligne ~1237
- draw: ligne ~1360
- gameLoop: ligne ~6103
- drawGameOver: ligne ~6139
- restartGame: ligne ~6169

D) Systeme de survie
- initSurvival: ligne ~5586
- updateSurvival: ligne ~5603
- updateSurvivalHUD: ligne ~5699
- applyForestBerryEffect: ligne ~5726
- isNearCampfire: ligne ~5754

E) Inventaire
- buildInventory: ligne ~5186
- renderInventory: ligne ~5220
- addInventoryItem: ligne ~5320
- removeInventoryItem: ligne ~5349
- syncResourceInventory: ligne ~5368
- useInventoryItem: ligne ~5436

F) Combat et ennemis
- updateMiniBosses: ligne ~2127
- updateFinalBoss: ligne ~2965
- updateFinalBossOrbs: ligne ~3080
- tryHitMiniBoss: ligne ~4962
- tryHitFinalBoss: ligne ~3132
- checkEnemyCollision: ligne ~6034

G) Monde et collisions
- findCurrentZone: ligne ~4680
- isBlockedByWorld: ligne ~4689
- isPlayerInRiver: ligne ~4750
- isCollidingRect: ligne ~5571
- clamp (utilitaire): ligne ~5580

H) Rendu visuel important
- drawMiniMap: ligne ~4268
- drawPlayer: ligne ~4357
- drawSurvivalInventoryHUD: ligne ~6087
- drawVictory: ligne ~3169

## 3.4 Serveur Go

Fichier: main.go

- Creation serveur HTTP local: lignes ~13 a ~34.
- Headers anti-cache: lignes ~17 a ~21.
- Serve index.html a la racine: lignes ~23 a ~26.
- Ouverture auto du navigateur: lignes ~36 a ~39 et fonction openBrowser lignes ~58 a ~66.
- Arret propre (Ctrl+C): lignes ~47 a ~55.

## 4) Resume oral rapide (1 minute)

"Le projet est un jeu web. index.html definit les ecrans, style.css gere le visuel, et game.js contient toute la logique: boucle de jeu, deplacements, survie, inventaire et combats. main.go sert juste a lancer un serveur local et ouvrir le navigateur. Le coeur technique est gameLoop qui execute update puis draw a chaque frame." 

## 5) Ordre d apprentissage conseille

1. startGame -> update -> draw -> gameLoop.
2. Clavier et interactions (E, B, deplacements).
3. Systeme de survie.
4. Inventaire et objets.
5. Boss et collisions.
6. Détails de rendu visuel.
