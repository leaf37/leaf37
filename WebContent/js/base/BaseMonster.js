//怪物基类
function BaseMonster(x,y,key){
	Phaser.Sprite.call(this,game,x,y,key);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;    
	this.anchor.set(0.5);
	game.physics.arcade.enable(this);
	this.events.onKilled.add(this.onKill,this);
	this.wishSpeedX = 0;
	this.actTime = 0;//当前的行动时间点
	this.nextActTime = 0;//下次转换行动的时间点
	this.hp = 0;
}

BaseMonster.prototype = Object.create(Phaser.Sprite.prototype);
BaseMonster.prototype.constructor = BaseMonster;

BaseMonster.prototype.onKill = function (){
	this.destroy();
};

BaseMonster.prototype.update = function(){
	if(this.wishSpeedX > 0){
		this.scale.x = 1;
		this.animations.play('move');
	}else if(this.wishSpeedX < 0){
		this.scale.x = -1;
		this.animations.play('move');
	}else{
		this.animations.play('stay');
	}
	this.act();
	
	//如果死亡则播放动画
	if(this.hp <= 0){
		var explo = game.add.sprite(this.x,this.y,'explo2');
		explo.animations.add('explo',[0,1,2,3],10);
		explo.anchor.set(0.5);
		explo.play('explo');
		explo.events.onAnimationComplete.add(
				function(){
					explo.destroy();
					explo = null;
				},
				this);
		this.kill();
		this.destroy();
		
	}
	
};

BaseMonster.prototype.act = function(){
	if(this.actTime < this.nextActTime){
		this.actTime ++;
	}else{
		this.actTime = 0;
		this.changeAct();
	}
};

//到了转换动作的时间了
BaseMonster.prototype.changeAct = function(){
	this.body.velocity.x = this.body.velocity.y = 0;
};

//被子弹击中
BaseMonster.prototype.onHit = function(obj){
//	var vx = obj.body.velocity.x;
//	var vy = obj.body.velocity.y;
	//this.body.acceleration.x = vx;
	//this.body.velocity.x = vx;
	
	//this.body.velocity.y = -50;
	
	this.body.velocity.x = obj.body.velocity.x / 2;
	var txtHurt = game.add.bitmapText(100,100,'nokia16');
	txtHurt.scale.set(0.5);
	txtHurt.anchor.set(0.5);
	txtHurt.setText(obj.damage);
	txtHurt.x = this.x;
	txtHurt.y = this.y - 10;
	this.hp -= obj.damage;

	//伤害文字
	var tween = game.add.tween(txtHurt);
	tween.to({y:txtHurt.y - 30 , alpha:0},1000).start();
	var onCompleteFunc = function(){
		txtHurt.destroy();
	};
	tween.onComplete.add(onCompleteFunc,this);

};







