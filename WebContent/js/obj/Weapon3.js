//武器3
function Weapon3(x,y,key){
  BaseWeapon.call(this,x,y,'bullet3');
  this.allowGravity(true);
  this.body.mass = 0.15;
  this.damage = 0.2;
  this.body.bounce.set(1,1);
  this.body.angularVelocity = 720;
  this.hitNum = 4;//可攻击次数
}

Weapon3.shotCold = 10;
Weapon3.speedX = 80;
Weapon3.speedY = -100;

Weapon3.prototype = Object.create(BaseWeapon.prototype);
Weapon3.prototype.constructor = Weapon3;

