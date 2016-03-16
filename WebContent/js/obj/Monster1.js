//怪物1
function Monster1(x,y,key){
	BaseMonster.call(this,x,y,'monster1');	
	this.animations.add('stay',['walk1.png'],10,true);
	this.animations.add('move',Phaser.Animation.generateFrameNames('walk', 1, 7, '.png', 1),10,true);
	this.animations.add('die',['die.png'],20,true);
	this.body.maxVelocity.set(50,200);
	this.body.bounce.set(0.1,0.3);
	this.body.velocity.y = -100;
	this.body.velocity.x = game.rnd.realInRange(-1,1) * 100;
	this.nextActTime = 100;
	this.hp = 5;
}

Monster1.prototype = Object.create(BaseMonster.prototype);
Monster1.prototype.constructor = Monster1;

Monster1.prototype.changeAct = function(){
	BaseMonster.prototype.changeAct.call(this);
	this.nextActTime = game.rnd.realInRange(1,2) * 100;
	this.wishSpeedX = game.rnd.realInRange(-1,1) * 50;
	this.body.acceleration.x = this.wishSpeedX;
};


