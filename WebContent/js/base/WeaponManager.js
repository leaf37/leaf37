//武器管理器
function WeaponManager(){
	this.bulletGroup = game.add.group();
	this.currentWeapon = null;
	this.shotNow = 0;
}

//换武器
WeaponManager.prototype.changeWeapon = function(weapon) {
	this.currentWeapon = weapon;
	//第一次让能秒射- -
	this.shotNow = this.currentWeapon.shotCold;
};

WeaponManager.prototype.update = function(){
	if(!this.currentWeapon){
		//没有装备武器
		return;
	}
	if(this.shotNow < this.currentWeapon.shotCold){
		this.shotNow ++;
	}
};

//发射
WeaponManager.prototype.shot = function(x,y,dir) {
	if(!this.currentWeapon){
		//没有装备武器
		return;
	}
		
	if(this.shotNow >= this.currentWeapon.shotCold){
		this.shotNow = 0;
		var tempBullet = new this.currentWeapon(x,y);
		this.bulletGroup.add(tempBullet);
		if(dir > 0){
			tempBullet.body.velocity.x = this.currentWeapon.speedX;
		}else{
			tempBullet.body.velocity.x = -this.currentWeapon.speedX;
		}
		tempBullet.body.velocity.y = this.currentWeapon.speedY;
	}
};
