const Eff = require("effects");

const shitassDeathBlaster = extend(Weapon, {
  firstShotDelay: 10,
  shootSound: loadSound("deathLaser"),
  x: 15,
  reload: 15,
  mirror: true,
  alternate: true,
  shootStatus: StatusEffects.unmoving,
  shootStatusDuration: 25
});

const shitassDeathCannon = extend(Weapon, {
  reload: 120,
  x: 10,
  y: 10,
  shots: 3,
  shotDelay: 5,
  spacing: 5,
  mirror: true,
  alternate: true,
  rotate: true,
  shootSound: Sounds.explosion
});

const shitassDeathLauncher = extend(Weapon, {
  reload: 30,
  shots: 6,
  shotDelay: 2,
  spacing:5,
  x: 10,
  y: 0,
  shootSound: Sounds.missile,
  rotate: true,
  mirror: true
});

const shitassHalo = extend(Weapon, {
  shots: 90,
  spacing: 4,
  shotDelay: 0.5,
  reload: 600,
  shootCone: 360,
  x: 0,
  y: 0,
  shootSound: loadSound("deathHalo")
});

// Bullets
const shitassDeathLaser = extend(LaserBulletType, {
  length: 500,
  width: 25,
  lightningSpacing: 15,
  lightningDelay: 0.5,
  lifetime: 15,
  damage: Number.MAX_VALUE - 1,
  lightningColor: Pal.remove,
  colors: [ Pal.remove, Color.white ],
  shootEffect: Eff.deathLaserShoot
});

const shitassDeathHalo = extend(LaserBulletType, {
  length: 500,
  width: 25,
  damage: Number.MAX_VALUE - 2,
  shootEffect: Eff.deathHaloShoot,
  lifetime: 7.5,
  colors: [ Pal.remove, Color.white ]
});

const shitassDeathMissile = extend(MissileBulletType, {
  draw(b){
    Draw.color(Pal.remove);
    Fill.circle(b.x, b.y, 5);
  },
  damage: Number.MAX_VALUE / 2,
  speed: 6,
  homingPower: 0.09,
  lifetime: 120,
  trailEffect: Eff.deathMissileTrail,
  weaveMag: 0.5,
  hitSound: Sounds.explosion,
  homingRange: 640,
  hitEffect: Eff.deathMissileHit
});
const shitassDeathBullet = extend(ArtilleryBulletType, {
  draw(b){
    Draw.color(Color.black);
    Fill.circle(b.x, b.y, 10);
    Draw.color(Pal.remove);
    Fill.circle(b.x, b.y, 8);
  },  
  splashDamage: Number.MAX_VALUE,
  damage: Number.MAX_VALUE - 2,
  splashDamageRadius: 640,
  hitEffect: Eff.destruction,
  speed: 4,
  lifetime: 120,
  hitSound:  Sounds.explosionbig,
  lightning: 15,
  lightningLength: 30,
  lightningColor: Pal.remove,
  trailEffect: Eff.deathBulletTrail
});

shitassDeathBlaster.bullet = shitassDeathLaser;
shitassHalo.bullet = shitassDeathHalo;
shitassDeathCannon.bullet = shitassDeathBullet;
shitassDeathLauncher.bullet = shitassDeathMissile;

// Shitasses
const trueShitass = extendContent(UnitType, "trueShitass", {
  speed: 3,
  health: Number.MAX_VALUE,
  drawCell: false,
  canDrown: false,
  hitSize: 20,
  allowLegStep: true,
  legCount: 6,
  legLength: 45,
  legSpeed: 0.025,
  legTrns: 1
});

trueShitass.constructor = () => extend(LegsUnit, {
  killed(){
    print("no");
    this.dead = false;
    this.health = Number.MAX_VALUE;
  },
  destroy(){
    print("no");
  },
  remove(){
    print("no");
  }
});

const shitass = extendContent(UnitType, "shitass", {
  speed: 0.75,
  health: 420,
  hitSize: 20,
  drawCell: false,
  mechLegColor: Color.valueOf("fed7aeff")
});

shitass.constructor = () => extend(MechUnit, {
  killed(){
    this.super$killed();
    print("shitass is dead");
    trueShitass.spawn(Team.crux, this.x, this.y);
    Eff.shitassDeathEffect.at(this.x, this.y);
  }
});

trueShitass.weapons.add(
  shitassDeathBlaster,
  shitassDeathCannon,
  shitassDeathLauncher,
  shitassHalo
);
