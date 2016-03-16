//武器基类
function BaseWeapon(x,y,key){
	Phaser.Sprite.call(this,game,x,y,key);
	this.anchor.set(0.5);
	game.physics.arcade.enable(this);
	this.checkWorldBounds = true;
	//this.body.collideWorldBounds = true;
	//this.body.bounce.set(1);
	this.events.onOutOfBounds.add(this.weaponCollideWorldBounds,this);
	this.att = 0;
	this.gravity = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.damage = 0;
	this.hitNum = 1;//可攻击次数
	this.moreHit = false;//是否可以造成多段伤害
	this.nextHurtTime = 0;//下次能受伤的计时
}

BaseWeapon.prototype = Object.create(Phaser.Sprite.prototype);
BaseWeapon.prototype.constructor = BaseWeapon;

BaseWeapon.prototype.update = function() {
	this.nextHurtTime --;
	if(!this.alive){
		this.destroy();
	}
};

BaseWeapon.prototype.allowGravity = function(flag) {
	this.body.allowGravity = flag;
};

BaseWeapon.prototype.weaponCollideWorldBounds = function(){
	this.kill();
	this.destroy();
};

//击中目标
BaseWeapon.prototype.onHit = function(){
	var canHurt = true;
	if(this.nextHurtTime > 0){
		canHurt = false;
		return canHurt;
	}
	this.nextHurtTime = 20;
	
	if(this.moreHit){
		return canHurt;
	}
	if(this.hitNum > 0){
		this.hitNum --;
	}else{
		canHurt = false;
	}
	
	if(this.hitNum <= 0){
		this.kill();
	}
	trace(canHurt);
	return canHurt;
};