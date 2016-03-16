//金币
function Coin(x,y){
	Phaser.Sprite.call(this,game,x,y,'coin');
	this.anchor.set(0.5);
	this.animations.add('coin1',Phaser.Animation.generateFrameNames('coin1_', 1, 6, '.png', 1),20,true);
	this.animations.add('coin2',Phaser.Animation.generateFrameNames('coin2_', 1, 6, '.png', 1),20,true);

	this.animations.play('coin1');
	game.physics.arcade.enable(this);
	this.body.velocity.y = -100;
//	this.checkWorldBounds = true;
//	this.outOfBoundsKill = true;    
//	this.events.onKilled.add(this.onKill,this);
	var tween = game.add.tween(this);
	tween.to({alpha:0},500).start();
}

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;


Coin.prototype.onKill = function (){
	this.destroy();
	
};