// Weapons
const shitassDeathBlaster = new Weapon();
const shitassDeathCannon = new Weapon();
const shitassDeathLauncher = new Weapon();
const shitassHalo = new Weapon();

// Bullets
const shitassDeathLaser = extend(LaserBulletType, {});
const shitassDeathHalo = extend(LaserBulletType, {});
const shitassDeathMissile = extend(MissileBulletType, {
  draw(b){
    Draw.color(Pal.remove);
    Fill.circle(b.x, b.y, 5);
  }
});
const shitassDeathBullet = extend(ArtilleryBulletType, {
  draw(b){
     Draw.color(Color.black);
     Fill.circle(b.x, b.y, 10);
     Draw.color(Pal.remove);
     Fill.circle(b.x, b.y, 8);
   }
});

// Effects
const destruction = new Effect(60, e => {
  Draw.color(Pal.remove);
  Draw.alpha(e.fout());
  Lines.stroke(25 * e.fout());
  Lines.circle(e.x, e.y, e.fin()*300);
  Draw.alpha(1);
  Lines.stroke(50 * e.fout());
  Lines.circle(e.x, e.y, e.fin()*100);

  Angles.randLenVectors(e.id, 50, e.fin()*200, ( x, y ) => {
    Draw.color(Pal.remove, Color.black, e.finpow());
    Fill.circle(e.x + x, e.y + y, 25 * e.fout());
  });
  Angles.randLenVectors(e.id, 50, 200 * e.fin(), e.rotation, 360,(x, y) => {
    Draw.color(Pal.remove);
    Lines.stroke(1);
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 20);
  });
});

const shitassDeathEffect = new Effect(60, e => {
  Draw.color(Pal.remove);
  Lines.stroke(4 - (4 * e.finpow()));
  Lines.poly(e.x, e.y, 3, e.finpow() * 100, e.finpow() * 360);
  Lines.poly(e.x, e.y, 3, e.finpow() * 100, (0 - e.finpow()) * 360);
});

const deathBulletTrail = new Effect(20, e => {
  Draw.color(Pal.remove);
  Angles.randLenVectors(e.id, 4, 4, (x, y) => {
     Fill.circle(e.x + x, e.y + y, e.fout() * 2);
  });
});

const deathMissileTrail = new Effect(20, e => {
  Draw.color(Pal.remove, Color.black, e.fin()):
  Fill.circle(e.x, e.y, e.fout() * 5);
});

const deathMissileHit = new Effect(30, e =>{ 
  Angles.randLenVectors(e.id, 20, 50 * e.finpow(), 
  e.rotation, 200, (x, y) => {
    Draw.color(Pal.remove, Color.black, e.fin());
    Fill.circle(e.x + x, e.y + y, e.fout() * 5);
    Lines.lineAngle(e.x + x * 2, e.y + y * 2, Mathf.angle(x, y), e.fout() * 10 );
  });

  Lines.stroke(5 - e.finpow() * 5);
  Lines.circle(e.x, e.y, e.finpow() * 100);
})

const deathLaserShoot = new Effect(20, e => {
  Draw.color(Color.black);
  Fill.circle(e.x, e.y, 10 * e.fslope());

  Angles.randLenVectors(e.id, 10, 30 - (e.finpow() * 30), (x, y) => {
    Draw.color(Color.black, Pal.remove, e.finpow());
    Fill.circle(e.x + x, e.y + y, e.fin() * 8);
  });
  Draw.color(Pal.remove);
  Fill.circle(e.x, e.y, 8 * e.fslope());
})

const deathHaloShoot = new Effect(45, e => {
  Draw.color(Pal.remove)
  Lines.stroke(e.fout()*2)
  Lines.poly(e.x, e.y, 3, e.fin() * 100, e.fin() * 360)
  Lines.poly(e.x, e.y, 3, e.fin() * 100, e.fout() * 360)

  Draw.alpha(1)
  Fill.poly(e.x, e.y, 3, e.fslope() * 20, e.fout() * 720)
  Fill.poly(e.x, e.y, 3, e.fslope() * 20, e.fin() * 360)
});

// Properties

shitassDeathLaser.length = 500;
shitassDeathLaser.width = 25;
shitassDeathLaser.lightningSpacing = 15;
shitassDeathLaser.lightningDelay = 0.5;
shitassDeathLaser.lifetime = 15;
shitassDeathLaser.damage = Number.MAX_VALUE - 1;
shitassDeathLaser.lightningColor = Pal.remove;
shitassDeathLaser.colors = [ Pal.remove, Color.white ];
shitassDeathLaser.shootEffect = deathLaserShoot;

shitassDeathHalo.length = 500;
shitassDeathHalo.width = 25;
shitassDeathHalo.damage = Number.MAX_VALUE - 2;
shitassDeathHalo.shootEffect = deathHaloShoot;
shitassDeathHalo.lifetime = 7.5;
shitassDeathHalo.colors = [ Pal.remove, Color.white ];

shitassDeathMissile.damage = Number.MAX_VALUE / 2;
shitassDeathMissile.speed = 6;
shitassDeathMissile.homingPower = 0.09;
shitassDeathMissile.lifetime = 120;
shitassDeathMissile.trailEffect = deathMissileTrail
shitassDeathMissile.weaveMag = 0.5;
shitassDeathMissile.hitSound = Sounds.explosion;
shitassDeathMissile.homingRange = 640;
shitassDeathMissile.hitEffect = deathMissileHit;

shitassDeathBullet.splashDamage = shitassDeathBullet.damage = Number.MAX_VALUE - 2;
shitassDeathBullet.splashDamageRadius = 640;
shitassDeathBullet.hitEffect = destruction;
shitassDeathBullet.speed = 4;
shitassDeathBullet.lifetime = 120;
shitassDeathBullet.hitSound = Sounds.explosionbig;
shitassDeathBullet.lightning = 15;
shitassDeathBullet.lightningLength = 30;
shitassDeathBullet.lightningColor = Pal.remove;
shitassDeathBullet.trailEffect = deathBulletTrail;

shitassDeathBlaster.bullet = shitassDeathLaser;
shitassDeathBlaster.firstShotDelay = 10;
shitassDeathBlaster.shootSound = loadSound("deathLaser");
shitassDeathBlaster.x = 15;
shitassDeathBlaster.reload = 15;
shitassDeathBlaster.mirror = shitassDeathBlaster.alternate = true;
shitassDeathBlaster.shootStatus = StatusEffects.unmoving;
shitassDeathBlaster.shootStatusDuration = 25;

shitassHalo.bullet = shitassDeathHalo;
shitassHalo.shots = 90;
shitassHalo.spacing = 4;
shitassHalo.shotDelay = 0.5;
shitassHalo.reload = 600;
shitassHalo.shootCone = 360;
shitassHalo.x = shitassHalo.y = 0;
shitassHalo.shootSound = loadSound("deathHalo");

shitassDeathCannon.bullet = shitassDeathBullet;
shitassDeathCannon.reload = 120;
shitassDeathCannon.x = shitassDeathCannon.y = 10;
shitassDeathCannon.shots = 3;
shitassDeathCannon.shotDelay = 5;
shitassDeathCannon.spacing = 5;
shitassDeathCannon.mirror = shitassDeathCannon.alternate = shitassDeathCannon.rotate = true;
shitassDeathCannon.shootSound = Sounds.explosion;

shitassDeathLauncher.rotate = shitassDeathLauncher.mirror = true;
shitassDeathLauncher.bullet = shitassDeathMissile;
shitassDeathLauncher.reload = 30;
shitassDeathLauncher.shots = 6;
shitassDeathLauncher.shotDelay = 2;
shitassDeathLauncher.spacing = 5;
shitassDeathLauncher.x = 10; 
shitassDeathLauncher.y = 0;
shitassDeathLauncher.shootSound = Sounds.missile;

// The shitasses

const trueShitass = extendContent(UnitType, "trueShitass", {});
trueShitass.constructor = () => extend(LegsUnit, {
  killed(){
    print("no");
    this.dead = false;
    this.health = Number.MAX_VALUE;
  }/*,
  update(){
    this.super$update();
    this.health = Number.MAX_VALUE;
    this.health = Number.MAX_VALUE;
  }*/
});

const shitass = extendContent(UnitType, "shitass", {});
shitass.constructor = () => extend(MechUnit, {
  killed(){
    this.super$killed();
    print("shitass is dead");
    trueShitass.spawn(Team.crux, this.x, this.y);
    shitassDeathEffect.at(this.x, this.y);
  }
});

// General shit
trueShitass.speed = 3;
trueShitass.health = Number.MAX_VALUE;
trueShitass.drawCell = trueShitass.canDrown = false;
trueShitass.hitSize = 20;
trueShitass.weapons.add(
  shitassDeathBlaster,
  shitassDeathCannon,
  shitassDeathLauncher,
  shitassHalo
);
trueShitass.allowLegStep = true;

trueShitass.legCount = 6;
trueShitass.legLength = 45;
trueShitass.legSpeed = 0.025;
trueShitass.legTrns = 1;

shitass.speed = 0.75;
shitass.health = 420;
shitass.hitSize = 20;
shitass.drawCell = false;
shitass.mechLegColor = Color.valueOf("fed7aeff")

/*
//Your one and only friend, shitass.
Events.on(WorldLoadEvent, e => {
var user = Vars.player
shitass.spawn( Team.sharded, user.x, user.y )
});
*/
