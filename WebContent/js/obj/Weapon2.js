//武器1
function Weapon2(x,y,key){
  BaseWeapon.call(this,x,y,'bullet2');
  this.allowGravity(false);
  this.body.mass = 0.15;
  this.damage = 0.2;
  this.body.angularVelocity = 720;
  this.moreHit = true;
}

Weapon2.shotCold = 10;
Weapon2.speedX = 10;
Weapon2.speedY = 0;

Weapon2.prototype = Object.create(BaseWeapon.prototype);
Weapon2.prototype.constructor = Weapon2;

