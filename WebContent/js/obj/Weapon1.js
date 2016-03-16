//武器1
function Weapon1(x,y,key){
  BaseWeapon.call(this,x,y,'bullet1');
  this.allowGravity(false);
  this.body.mass = 0.15;
  this.damage = 1;
}

Weapon1.shotCold = 20;
Weapon1.speedX = 200;
Weapon1.speedY = 0;

Weapon1.prototype = Object.create(BaseWeapon.prototype);
Weapon1.prototype.constructor = Weapon1;

