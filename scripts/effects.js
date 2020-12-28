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
  Draw.color(Pal.remove, Color.black, e.fin());
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


module.exports = {
  destruction: destruction,
  shitassDeathEffect: shitassDeathEffect,
  deathBulletTrail: deathBulletTrail,
  deathMissileTrail: deathMissileTrail,
  deathMissileHit: deathMissileHit,
  deathLaserShoot: deathLaserShoot,
  deathHaloShoot: deathHaloShoot
}
