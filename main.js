//TRUE SHITASS
const trueShitass = extendContent(UnitType, "trueShitass", {});
trueShitass.constructor = () => extend(LegsUnit, {
killed(){
  print("no");
  Core.app.exit();
}
});


const shitassDeathBlaster = new Weapon();
const shitassDeathCannon = new Weapon();
const shitassDeathLaser = extend(LaserBulletType, {});
const shitassDeathBullet = extend(ArtilleryBulletType, {
  draw(b){
    Draw.color(Pal.remove);
    Fill.circle(b.x, b.y, 7);
    Draw.color(Color.black);
    Fill.circle(b.x, b.y, 3);
  }
});

const destruction = new Effect(60, e => {
  Draw.color(Pal.remove)
  Draw.alpha( e.fout())
  Lines.stroke(25 * e.fout())
  Lines.circle(e.x, e.y, e.fin()*300)
  Draw.alpha(1)

  Lines.stroke(50 * e.fout())
  Lines.circle(e.x, e.y, e.fin()*100)

  Angles.randLenVectors(e.id, 50, e.fin()*200, ( x, y ) => {
    Draw.color(Pal.remove, Color.black, e.finpow())
    Fill.circle(e.x + x, e.y + y, 25 * e.fout())
  });

  Angles.randLenVectors(e.id, 50, 200* e.fin(), e.rotation, 360,(x, y) => {
    Draw.color(Pal.remove)
    Lines.stroke(1)
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout()*20);
});
})

shitassDeathLaser.length = 500;
shitassDeathLaser.width = 25;
shitassDeathLaser.lightningSpacing = 15;
shitassDeathLaser.lightningDelay = 0.5;
shitassDeathLaser.lifetime = 15;
shitassDeathLaser.damage = Number.MAX_VALUE - 1;
shitassDeathLaser.lightningColor = Pal.remove;
shitassDeathLaser.colors = [ Pal.remove, Color.white ];

shitassDeathBullet.splashDamage = shitassDeathBullet.damage = Number.MAX_VALUE - 2;
shitassDeathBullet.splashDamageRadius = 640;
shitassDeathBullet.hitEffect = destruction;
shitassDeathBullet.speed = 4;
shitassDeathBullet.lifetime = 120;
shitassDeathBullet.hitSound = Sounds.explosionbig;
shitassDeathBullet.lightning = 15;
shitassDeathBullet.lightningLength = 30;
shitassDeathBullet.lightningColor = Pal.remove;

shitassDeathLaser.shootEffect = new Effect(20, e => {
  Draw.color(Pal.remove)
  Fill.circle(e.x, e.y, e.fslope() * 10)
  Draw.color(Color.white)
  Fill.circle(e.x, e.y, e.fslope() * 2.5)
})

shitassDeathBlaster.bullet = shitassDeathLaser;
shitassDeathBlaster.firstShotDelay = 10;
shitassDeathBlaster.shootSound = Sounds.laserblast;
shitassDeathBlaster.x = 15;
shitassDeathBlaster.reload = 15;
shitassDeathBlaster.mirror = shitassDeathBlaster.alternate = true;
shitassDeathBlaster.shootStatus = StatusEffects.unmoving;
shitassDeathBlaster.shootStatusDuration = 25;

shitassDeathCannon.bullet = shitassDeathBullet;
shitassDeathCannon.reload = 120;
shitassDeathCannon.x = 10;
shitassDeathCannon.y = 10;
shitassDeathCannon.shots = 3;
shitassDeathCannon.shotDelay = 5;
shitassDeathCannon.spacing = 5;
shitassDeathCannon.mirror = shitassDeathCannon.alternate = shitassDeathCannon.rotate = true;
shitassDeathCannon.shootSound = Sounds.explosion;

//general shit
trueShitass.speed = 3;
trueShitass.health = Number.MAX_VALUE;
trueShitass.drawCell = false;
trueShitass.hitSize = 20;
trueShitass.weapons.add(shitassDeathBlaster);
trueShitass.weapons.add(shitassDeathCannon);
trueShitass.allowLegStep = true;

//legs
trueShitass.legCount = 6;
trueShitass.legLength = 45;
trueShitass.legSpeed = 0.025;
trueShitass.legTrns = 1;


//shitass
const shitassDeathEffect = new Effect (30, e => {
Draw.color(Pal.remove)
Lines.stroke( 4 - (4*e.finpow()))
Lines.poly(e.x, e.y, 3, e.finpow()*100, e.finpow()*360)
Lines.poly(e.x, e.y, 3, e.finpow()*100, ( 0 - e.finpow())*360)
});

const shitass = extendContent(UnitType, "shitass", {});
shitass.constructor = () => extend(MechUnit, {
  killed(){
    this.super$killed();
    print("shitass is dead");
    trueShitass.spawn(this.team, this.x, this.y);
    shitassDeathEffect.at(this.x, this.y)
  }
});


shitass.speed = 0.75
shitass.health = 240;
shitass.hitSize = 20;
shitass.drawCell = false;
shitass.mechLegColor = Color.valueOf("fed7aeff")