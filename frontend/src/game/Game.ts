import * as THREE from 'three';
import { GAME, boundedScore, clamp, overlaps, type Enemy, type EnemyKind, type GameSnapshot, type GameState, type Projectile } from './rules.js';
import { disposeGroup, enemyModel, explosionModel, playerModel, projectileModel } from '../assets/models.js';

interface Effect { group: THREE.Group; life: number; duration: number; }
interface Star { mesh: THREE.Mesh; speed: number; layer: number; }

export class Game {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(-GAME.width / 2, GAME.width / 2, GAME.height / 2, -GAME.height / 2, 0.1, 120);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly world = new THREE.Group();
  private readonly player = playerModel();
  private readonly stars: Star[] = [];
  private readonly keyDown = new Set<string>();
  private enemies: Enemy[] = [];
  private projectiles: Projectile[] = [];
  private readonly enemyModels = new Map<number, THREE.Group>();
  private readonly projectileModels = new Map<number, THREE.Group>();
  private readonly effects: Effect[] = [];
  private readonly enemyGroups: THREE.Group[] = [];
  private readonly playerShot = projectileModel(true);
  private readonly enemyShot = projectileModel(false);
  private readonly ambientGlow = new THREE.PointLight(0x59eaff, 1.6, 16);
  private readonly clock = new THREE.Clock();
  private readonly listeners = new Set<(snapshot: GameSnapshot) => void>();
  private readonly audioContext: AudioContext | null;
  private readonly audioBus: GainNode | null;
  private state: GameState = 'menu';
  private score = 0;
  private health = GAME.maxHealth;
  private wave = 0;
  private waveCount = 0;
  private bossHealth = 0;
  private readonly bossMaxHealth = GAME.bossHealth;
  private playerX = -10;
  private playerY = 0;
  private playerAge = 0;
  private cooldown = 0;
  private invulnerable = 0;
  private enemySpawn = 0;
  private waveWait = 0;
  private entityId = 0;
  private bossModel: THREE.Group | null = null;
  private disposed = false;

  public constructor(private readonly mount: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(mount.clientWidth || 900, mount.clientHeight || 550);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    mount.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(0, 0, 0);
    this.scene.background = new THREE.Color(0x101b2c);
    this.scene.fog = new THREE.Fog(0x101b2c, 24, 95);
    this.scene.add(this.world);
    this.buildEnvironment();
    const hemisphere = new THREE.HemisphereLight(0xb7e2f1, 0x23303a, 2.15);
    const keyLight = new THREE.DirectionalLight(0xffe9cf, 2.4); keyLight.position.set(-7, 8, 18);
    const rimLight = new THREE.DirectionalLight(0x61dfff, 2.8); rimLight.position.set(12, -8, 12);
    this.scene.add(hemisphere, keyLight, rimLight, this.ambientGlow);
    this.player.position.set(this.playerX, this.playerY, 0.5); this.scene.add(this.player);
    this.createEntityModels();
    this.audioContext = typeof window.AudioContext !== 'undefined' ? new AudioContext() : null;
    this.audioBus = this.audioContext?.createGain() ?? null;
    if (this.audioContext && this.audioBus) { this.audioBus.gain.value = 0.16; this.audioBus.connect(this.audioContext.destination); }
    this.resize();
    this.frame = this.frame.bind(this);
    window.addEventListener('resize', this.resize);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.renderer.setAnimationLoop(this.frame);
  }

  public subscribe(listener: (snapshot: GameSnapshot) => void): () => void {
    this.listeners.add(listener); listener(this.snapshot());
    return () => this.listeners.delete(listener);
  }

  public start(): void {
    if (this.audioContext?.state === 'suspended') void this.audioContext.resume();
    this.clearSession();
    this.state = 'playing'; this.beginWave(1); this.emit();
  }

  public togglePause(): void {
    if (this.state === 'playing') this.state = 'paused';
    else if (this.state === 'paused') this.state = 'playing';
    this.emit();
  }

  public setMuted(muted: boolean): void { if (this.audioBus) this.audioBus.gain.value = muted ? 0 : 0.16; }
  public getState(): GameState { return this.state; }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true; this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this.resize); window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp); window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.clearSession();
    for (const group of this.enemyGroups) disposeGroup(group);
    this.enemyGroups.length = 0;
    disposeGroup(this.player); disposeGroup(this.playerShot); disposeGroup(this.enemyShot);
    for (const star of this.stars) { star.mesh.geometry.dispose(); (star.mesh.material as THREE.Material).dispose(); }
    for (const object of this.scene.children) {
      if (object instanceof THREE.Mesh) { object.geometry.dispose(); if (Array.isArray(object.material)) object.material.forEach((mat) => mat.dispose()); else object.material.dispose(); }
    }
    this.renderer.dispose(); this.mount.replaceChildren();
    void this.audioContext?.close(); this.listeners.clear();
  }

  private snapshot(): GameSnapshot {
    return { state: this.state, score: this.score, health: this.health, wave: this.wave, waveCount: this.waveCount,
      bossHealth: this.bossHealth, bossMaxHealth: this.bossMaxHealth, player: { x: this.playerX, y: this.playerY },
      enemies: this.enemies, projectiles: this.projectiles };
  }

  private emit(): void { const snapshot = this.snapshot(); for (const listener of this.listeners) listener(snapshot); }

  private buildEnvironment(): void {
    const planet = new THREE.Mesh(new THREE.SphereGeometry(3.5, 24, 18), new THREE.MeshStandardMaterial({ color: 0x233a48, roughness: 0.88, metalness: 0.1, flatShading: true }));
    planet.position.set(12, 12, -22); planet.scale.y = 0.82; this.world.add(planet);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(3.62, 24, 18), new THREE.MeshBasicMaterial({ color: 0xff8a58, transparent: true, opacity: 0.16, side: THREE.BackSide }));
    atmosphere.position.copy(planet.position); atmosphere.scale.y = planet.scale.y; this.world.add(atmosphere);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.75, 0.018, 4, 80), new THREE.MeshBasicMaterial({ color: 0x83cee3, transparent: true, opacity: 0.18 }));
    ring.position.copy(planet.position); ring.rotation.set(1.1, -0.2, 0.3); this.world.add(ring);
    for (let i = 0; i < 115; i++) {
      const size = 0.025 + Math.random() * 0.08;
      const material = new THREE.MeshBasicMaterial({ color: i % 9 === 0 ? 0x8edce3 : 0xe1e4d8, transparent: true, opacity: 0.34 + Math.random() * 0.62 });
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0), material);
      star.position.set((Math.random() - 0.5) * GAME.width * 1.65, (Math.random() - 0.5) * GAME.height * 1.55, -30 - Math.random() * 20);
      this.world.add(star); this.stars.push({ mesh: star, speed: 0.7 + Math.random() * 2.1, layer: Math.random() });
    }
    for (let i = 0; i < 8; i++) {
      const radius = 0.48 + Math.random() * 0.9;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), new THREE.MeshStandardMaterial({ color: i % 2 ? 0x43515a : 0x56473f, flatShading: true, metalness: 0.35, roughness: 0.87 }));
      rock.position.set(18 + Math.random() * 15, -7 + Math.random() * 15, -18 - Math.random() * 7);
      rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3); this.world.add(rock);
    }
  }

  private createEntityModels(): void {
    for (const kind of ['scout', 'gunship', 'bomber'] as const) this.enemyGroups.push(enemyModel(kind));
  }

  private readonly resize = (): void => {
    if (!this.mount || !this.renderer) return;
    const width = this.mount.clientWidth || 900; const height = this.mount.clientHeight || 550;
    this.renderer.setSize(width, height);
    const aspect = width / height; const baseHeight = GAME.height;
    this.camera.left = -baseHeight * aspect / 2; this.camera.right = baseHeight * aspect / 2;
    this.camera.top = baseHeight / 2; this.camera.bottom = -baseHeight / 2; this.camera.updateProjectionMatrix();
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) event.preventDefault();
    this.keyDown.add(key);
    if (key === 'escape' && !event.repeat && (this.state === 'playing' || this.state === 'paused')) this.togglePause();
    if (key === ' ' && this.state === 'menu') document.getElementById('start-button')?.click();
  };
  private readonly onKeyUp = (event: KeyboardEvent): void => { this.keyDown.delete(event.key.toLowerCase()); };
  private readonly onBlur = (): void => { this.keyDown.clear(); if (this.state === 'playing') this.togglePause(); };
  private readonly onVisibility = (): void => { if (document.hidden && this.state === 'playing') this.togglePause(); };

  private readonly frame = (): void => {
    if (this.disposed) return;
    const dt = Math.min(this.clock.getDelta(), 0.04);
    this.playerAge += dt;
    for (const star of this.stars) {
      star.mesh.position.x -= (star.speed + star.layer * 1.7) * dt;
      if (star.mesh.position.x < -GAME.width) star.mesh.position.x = GAME.width + Math.random() * 6;
      star.mesh.rotation.z += dt * star.speed * 0.25;
    }
    if (this.state === 'playing') this.updateGame(dt);
    else if (this.state === 'menu' || this.state === 'paused') this.player.position.y = Math.sin(this.playerAge * 1.6) * 0.11;
    this.updateDecorations(dt);
    this.renderer.render(this.scene, this.camera);
  };

  private updateGame(dt: number): void {
    this.cooldown -= dt; this.invulnerable = Math.max(0, this.invulnerable - dt);
    const dx = Number(this.keyDown.has('d') || this.keyDown.has('arrowright')) - Number(this.keyDown.has('a') || this.keyDown.has('arrowleft'));
    const dy = Number(this.keyDown.has('w') || this.keyDown.has('arrowup')) - Number(this.keyDown.has('s') || this.keyDown.has('arrowdown'));
    const length = Math.hypot(dx, dy) || 1;
    this.playerX = clamp(this.playerX + dx / length * GAME.playerSpeed * dt, -GAME.width / 2 + 1.4, GAME.width / 2 - 2.6);
    this.playerY = clamp(this.playerY + dy / length * GAME.playerSpeed * dt, -GAME.height / 2 + 1.3, GAME.height / 2 - 1.3);
    this.player.position.set(this.playerX, this.playerY, 0.5);
    this.player.rotation.z = -dx * 0.12;
    this.player.scale.setScalar(this.invulnerable > 0 && Math.floor(this.playerAge * 19) % 2 === 0 ? 0.86 : 1);
    this.player.traverse((object) => { if (object instanceof THREE.Mesh && object.userData.pulse) object.scale.y = 0.85 + Math.sin(this.playerAge * 34) * 0.2; });
    if (this.keyDown.has(' ') && this.cooldown <= 0) this.firePlayer();
    if (this.wave < 4) this.updateWaves(dt); else this.updateBoss(dt);
    this.updateProjectiles(dt); this.resolveCollisions(); this.updateEntities(dt);
  }

  private clearSession(): void {
    for (const group of this.enemyModels.values()) { this.scene.remove(group); disposeGroup(group); }
    this.enemyModels.clear();
    for (const group of this.projectileModels.values()) { this.scene.remove(group); disposeGroup(group); }
    this.projectileModels.clear();
    for (const effect of this.effects) { this.scene.remove(effect.group); disposeGroup(effect.group); }
    this.effects.length = 0;
    if (this.bossModel) { this.scene.remove(this.bossModel); disposeGroup(this.bossModel); }
    this.enemies = []; this.projectiles = []; this.bossModel = null;
    this.score = 0; this.health = GAME.maxHealth; this.wave = 0; this.waveCount = 0; this.bossHealth = 0;
    this.playerX = -10; this.playerY = 0; this.player.position.set(this.playerX, this.playerY, 0.5);
    this.cooldown = 0; this.invulnerable = 0; this.enemySpawn = 0; this.waveWait = 0;
    this.keyDown.clear();
  }

  private beginWave(wave: number): void {
    this.wave = wave; this.waveCount = GAME.waveSizes[wave - 1] ?? GAME.waveSizes[GAME.waveSizes.length - 1]!;
    this.enemySpawn = 0.55; this.waveWait = 0;
    if (wave === 1) this.sound(440, 0.14, 'sine', 0.1);
    this.emit();
  }

  private updateWaves(dt: number): void {
    if (this.enemies.length === 0 && this.waveCount === 0) {
      if (this.wave < 3) { this.waveWait += dt; if (this.waveWait >= GAME.waveBreak) this.beginWave(this.wave + 1); }
      else { this.beginBoss(); }
      return;
    }
    this.enemySpawn -= dt;
    if (this.enemySpawn <= 0 && this.waveCount > 0) {
      const remaining = this.waveSizesRemaining();
      const kind: EnemyKind = remaining % 7 === 0 ? 'bomber' : remaining % 3 === 0 ? 'gunship' : 'scout';
      this.spawnEnemy(kind);
      this.waveCount -= 1; this.enemySpawn = GAME.enemySpawnInterval * (this.wave === 3 ? 0.7 : 1);
      this.emit();
    }
  }

  private waveSizesRemaining(): number { return this.waveCount + this.enemies.length; }

  private spawnEnemy(kind: Exclude<EnemyKind, 'boss'>): void {
    const template = this.enemyGroups[kind === 'scout' ? 0 : kind === 'gunship' ? 1 : 2]!;
    const model = template.clone(true);
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry = object.geometry.clone();
        object.material = Array.isArray(object.material) ? object.material.map((material) => material.clone()) : object.material.clone();
      }
    });
    model.position.set(GAME.width / 2 + 2, (Math.random() - 0.5) * (GAME.height - 4), -0.1 + Math.random() * 0.12);
    this.scene.add(model);
    const size = kind === 'scout' ? 0.8 : kind === 'gunship' ? 1 : 1.1;
    const enemy: Enemy = { id: ++this.entityId, kind, x: model.position.x, y: model.position.y, radius: kind === 'scout' ? 0.72 : kind === 'gunship' ? 1 : 1.18, health: kind === 'scout' ? 1 : kind === 'gunship' ? 4 : 7, maxHealth: kind === 'scout' ? 1 : kind === 'gunship' ? 4 : 7, age: 0, speed: (kind === 'scout' ? 8.5 : kind === 'gunship' ? 4.5 : 3) * (1 + (this.wave - 1) * 0.13), phase: Math.random() * Math.PI * 2, shootAt: 1.5 + Math.random() * 2.1 };
    model.scale.set(size, size, size); this.enemies.push(enemy); this.enemyModels.set(enemy.id, model);
  }

  private beginBoss(): void {
    this.wave = 4; this.bossHealth = GAME.bossHealth;
    this.bossModel = enemyModel('bomber');
    this.bossModel.clear();
    const bossHull = new THREE.Group();
    const core = new THREE.Mesh(new THREE.DodecahedronGeometry(2.1, 1), new THREE.MeshStandardMaterial({ color: 0x44566b, metalness: 0.82, roughness: 0.27, flatShading: true }));
    core.scale.set(1.25, 0.82, 0.55); bossHull.add(core);
    const armorMaterial = new THREE.MeshStandardMaterial({ color: 0x172a3e, metalness: 0.92, roughness: 0.24, flatShading: true });
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 1), armorMaterial); wing.position.set(side * 2.45, -0.1, 0); wing.scale.set(1.4, 0.65, 0.45); bossHull.add(wing);
      const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 2.1, 10), new THREE.MeshStandardMaterial({ color: 0xc38b51, metalness: 0.85, roughness: 0.25 }));
      gun.rotation.z = Math.PI / 2; gun.position.set(side * 2.9, -0.68, 0.48); bossHull.add(gun);
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff684f })); light.position.set(side * 2.15, 0.28, 0.5); bossHull.add(light);
    }
    const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.72, 16, 12), new THREE.MeshStandardMaterial({ color: 0x73e9ea, emissive: 0x176c88, emissiveIntensity: 0.95, metalness: 0.65, roughness: 0.18 }));
    cockpit.position.set(0, 0.68, 0.88); cockpit.scale.y = 0.72; bossHull.add(cockpit);
    const plates = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), new THREE.MeshStandardMaterial({ color: 0xe1a568, metalness: 0.84, roughness: 0.29 }));
    for (let i = -2; i <= 2; i++) { const plate = plates.clone(); plate.position.set(i * 0.78, -0.9, 0.65); bossHull.add(plate); }
    this.bossModel.add(bossHull); this.bossModel.userData.boss = true;
    this.bossModel.position.set(GAME.width / 2 + 5.5, 0, -0.25); this.scene.add(this.bossModel);
    this.sound(145, 0.5, 'sawtooth', 0.2); this.emit();
  }

  private updateBoss(dt: number): void {
    if (!this.bossModel) return;
    const boss = this.bossModel;
    if (boss.position.x > 9.5) boss.position.x -= Math.min((boss.position.x - 9.5) * 0.7, 3.7 * dt);
    boss.position.y = Math.sin(this.playerAge * 0.92) * 5.4;
    boss.rotation.z = Math.sin(this.playerAge * 0.7) * 0.035;
    const bossAge = boss.userData.age as number | undefined ?? 0; boss.userData.age = bossAge + dt;
    if (bossAge > 0.85) { boss.userData.age = 0; this.fireEnemy(boss.position.x - 2.2, boss.position.y - 0.7, -12, (this.playerY - boss.position.y) * 0.34); if (Math.floor(this.playerAge * 0.3) % 2 === 0) this.fireEnemy(boss.position.x - 2.4, boss.position.y + 0.2, -12, 0); }
  }

  private firePlayer(): void {
    this.cooldown = GAME.playerShotCooldown;
    this.spawnProjectile(this.playerX + 1.2, this.playerY, 25, 0, true, 1);
    if (this.wave >= 4 && this.score >= 1500) this.spawnProjectile(this.playerX + 0.6, this.playerY + 0.25, 23, 0.5, true, 1);
    this.sound(850, 0.052, 'square', 0.045);
  }

  private fireEnemy(x: number, y: number, vx: number, vy: number): void {
    this.spawnProjectile(x - 0.8, y, vx, vy, false, 1);
    this.sound(175, 0.08, 'triangle', 0.055);
  }

  private spawnProjectile(x: number, y: number, vx: number, vy: number, friendly: boolean, damage: number): void {
    const projectile: Projectile = { id: ++this.entityId, x, y, velocityX: vx, velocityY: vy, radius: friendly ? 0.25 : 0.34, friendly, damage };
    const model = (friendly ? this.playerShot : this.enemyShot).clone(true);
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry = object.geometry.clone();
        object.material = Array.isArray(object.material) ? object.material.map((material) => material.clone()) : object.material.clone();
      }
    });
    model.position.set(x, y, friendly ? 0.7 : -0.32); model.rotation.z = Math.atan2(vy, vx) - Math.PI / 2;
    this.scene.add(model); this.projectiles.push(projectile); this.projectileModels.set(projectile.id, model);
  }

  private updateProjectiles(dt: number): void {
    this.projectiles = this.projectiles.filter((projectile) => {
      projectile.x += projectile.velocityX * dt; projectile.y += projectile.velocityY * dt;
      const model = this.projectileModels.get(projectile.id);
      if (model) { model.position.set(projectile.x, projectile.y, projectile.friendly ? 0.7 : -0.32); if (projectile.friendly) { const scale = 0.88 + Math.sin(this.playerAge * 34 + projectile.id) * 0.12; model.scale.set(scale, 1.2, scale); } }
      if (projectile.x < -GAME.width / 2 - 2 || projectile.x > GAME.width / 2 + 4 || Math.abs(projectile.y) > GAME.height) { this.removeProjectile(projectile); return false; }
      return true;
    });
  }

  private resolveCollisions(): void {
    for (const projectile of [...this.projectiles]) {
      if (!projectile.friendly) {
        if (this.invulnerable <= 0 && overlaps(projectile, { x: this.playerX, y: this.playerY, radius: GAME.playerRadius })) {
          this.removeProjectile(projectile); this.takeDamage();
        }
        continue;
      }
      if (this.bossModel && this.wave >= 4) {
        const boss: Enemy = { id: -1, kind: 'boss', x: this.bossModel.position.x, y: this.bossModel.position.y, radius: 3.25, health: this.bossHealth, maxHealth: this.bossMaxHealth, age: 0, speed: 0, phase: 0, shootAt: 0 };
        if (overlaps(projectile, boss)) {
          this.removeProjectile(projectile); this.bossHealth = Math.max(0, this.bossHealth - GAME.playerShotDamage);
          this.bossModel.scale.set(1.02, 0.98, 1.02); this.emit();
          if (Math.random() < 0.26) this.spawnEffect(projectile.x, projectile.y, 0xff9855, 0.4);
          if (this.bossHealth === 0) this.finish('won');
          continue;
        }
      }
      const hit = this.enemies.find((enemy) => overlaps(projectile, enemy));
      if (hit) {
        this.removeProjectile(projectile); hit.health -= projectile.damage;
        const group = this.enemyModels.get(hit.id);
        if (group) { group.scale.multiplyScalar(0.94); group.rotation.z += 0.08; }
        if (hit.health <= 0) {
          this.enemies = this.enemies.filter((enemy) => enemy.id !== hit.id);
          if (group) { this.enemyModels.delete(hit.id); this.scene.remove(group); disposeGroup(group); }
          const points = hit.kind === 'scout' ? 100 : hit.kind === 'gunship' ? 240 : 400;
          this.score = boundedScore(this.score, points); this.spawnEffect(hit.x, hit.y, hit.kind === 'scout' ? 0xff9c63 : 0x90e8df, 0.76); this.sound(280, 0.15, 'sawtooth', 0.12); this.emit();
        }
      }
    }
    for (const enemy of [...this.enemies]) {
      if (overlaps(enemy, { x: this.playerX, y: this.playerY, radius: GAME.playerRadius })) {
        this.enemies = this.enemies.filter((candidate) => candidate.id !== enemy.id);
        const group = this.enemyModels.get(enemy.id);
        if (group) { this.enemyModels.delete(enemy.id); this.scene.remove(group); disposeGroup(group); }
        this.spawnEffect(enemy.x, enemy.y, 0xff9061, 0.6);
        this.takeDamage();
      }
    }
  }

  private updateEntities(dt: number): void {
    for (const enemy of [...this.enemies]) {
      enemy.age += dt; enemy.x -= enemy.speed * dt;
      if (enemy.kind === 'scout') enemy.y += Math.sin(enemy.age * 3.4 + enemy.phase) * dt * 4.1;
      else if (enemy.kind === 'gunship') enemy.y += Math.cos(enemy.age * 1.8 + enemy.phase) * dt * 2.1;
      else enemy.y += Math.sin(enemy.age * 1.35 + enemy.phase) * dt * 1.35;
      const model = this.enemyModels.get(enemy.id);
      if (model) { model.position.set(enemy.x, enemy.y, -0.1); model.rotation.z = enemy.kind === 'scout' ? Math.sin(enemy.age * 3.4 + enemy.phase) * 0.11 : Math.sin(enemy.age * 1.5 + enemy.phase) * 0.035; if (enemy.kind === 'bomber') model.rotation.y = Math.sin(enemy.age) * 0.06; }
      enemy.shootAt -= dt;
      if (enemy.shootAt <= 0 && enemy.kind !== 'scout' && enemy.x < GAME.width / 2 - 5) { this.fireEnemy(enemy.x, enemy.y, -GAME.enemyProjectileSpeed, (this.playerY - enemy.y) * 0.4); enemy.shootAt = enemy.kind === 'gunship' ? 2.2 : 2.8; }
      if (enemy.x < -GAME.width / 2 - 3) this.removeEnemy(enemy);
    }
    for (const effect of [...this.effects]) {
      effect.life += dt; const progress = effect.life / effect.duration;
      effect.group.scale.setScalar(0.35 + progress * 1.8);
      effect.group.children.forEach((child) => { const velocity = child.userData.velocity as number[] | undefined; if (velocity) { child.position.x += velocity[0]! * dt * 2.7; child.position.y += velocity[1]! * dt * 2.7; } });
      if (progress >= 1) { this.effects.splice(this.effects.indexOf(effect), 1); this.scene.remove(effect.group); disposeGroup(effect.group); }
    }
    if (this.bossModel) this.bossModel.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
  }

  private takeDamage(): void {
    if (this.invulnerable > 0 || this.state !== 'playing') return;
    this.health -= 1; this.invulnerable = GAME.playerInvulnerability;
    this.spawnEffect(this.playerX, this.playerY, 0xff625c, 0.72); this.sound(115, 0.3, 'sawtooth', 0.21); this.emit();
    if (this.health <= 0) this.finish('lost');
  }

  private removeEnemy(enemy: Enemy): void {
    this.enemies = this.enemies.filter((candidate) => candidate.id !== enemy.id);
    const group = this.enemyModels.get(enemy.id);
    if (group) { this.enemyModels.delete(enemy.id); this.scene.remove(group); disposeGroup(group); }
  }

  private removeProjectile(projectile: Projectile): void {
    this.projectiles = this.projectiles.filter((candidate) => candidate.id !== projectile.id);
    const group = this.projectileModels.get(projectile.id);
    if (group) { this.projectileModels.delete(projectile.id); this.scene.remove(group); disposeGroup(group); }
  }

  private spawnEffect(x: number, y: number, color: number, duration: number): void {
    const group = explosionModel(color); group.position.set(x, y, 0.9); this.scene.add(group); this.effects.push({ group, life: 0, duration });
  }

  private finish(result: 'won' | 'lost'): void {
    this.state = result;
    if (result === 'won') { this.score = boundedScore(this.score, 3000); this.sound(660, 0.7, 'triangle', 0.17); this.spawnEffect(this.bossModel?.position.x ?? 10, this.bossModel?.position.y ?? 0, 0xffcc72, 1.4); }
    else this.sound(90, 0.8, 'sawtooth', 0.18);
    this.emit();
  }

  private updateDecorations(dt: number): void {
    this.ambientGlow.position.set(this.playerX + 1, this.playerY, 4);
    this.ambientGlow.intensity = 1.1 + Math.sin(this.playerAge * 5) * 0.24;
    if (this.bossModel && this.state !== 'playing') this.bossModel.position.y += Math.sin(this.playerAge * 0.9) * dt * 0.3;
  }

  private sound(frequency: number, duration: number, wave: OscillatorType, volume: number): void {
    if (!this.audioContext || !this.audioBus || this.audioBus.gain.value === 0) return;
    const oscillator = this.audioContext.createOscillator(); const gain = this.audioContext.createGain();
    oscillator.type = wave; oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(frequency * 0.45, 36), this.audioContext.currentTime + duration);
    gain.gain.setValueAtTime(volume, this.audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    oscillator.connect(gain); gain.connect(this.audioBus); oscillator.start(); oscillator.stop(this.audioContext.currentTime + duration);
  }
}
