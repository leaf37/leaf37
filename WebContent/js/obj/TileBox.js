//交互方块
function TileBox(x,y,frame,strType){
	Phaser.Sprite.call(this,game,x,y,'box');

	this.properties = null;
	this.name = '';
	game.physics.arcade.enable(this);
	this.body.immovable = true;
	this.body.allowGravity = false;  
	this.anchor.setTo(0.5,0.5);
	this.boxType = strType;
	this.oriP = new Phaser.Point(x,y);
	game.add.tween(this).from({y: game.height + 16}, 500, Phaser.Easing.Bounce.Out, true, 
			game.rnd.integerInRange(1,5) * 60, 0 );

	this.frame = frame;    
	
}

TileBox.prototype = Object.create(Phaser.Sprite.prototype);
TileBox.prototype.constructor = TileBox;

//向上抖
TileBox.prototype.upShake = function(){
	tempBack = game.add.tween(this).to({y: this.oriP.y}, 30, Phaser.Easing.Bounce.Out);
	game.add.tween(this).to({y: this.oriP.y - 5}, 30, Phaser.Easing.Bounce.Out, true,0,1).chain(tempBack);  
	tempBack2 = game.add.tween(this.scale).to({y: 1}, 30, Phaser.Easing.Bounce.Out);
	game.add.tween(this.scale).to({y: 0.7}, 30, Phaser.Easing.Bounce.Out, true,0,1).chain(tempBack2);  
};


//向下抖
TileBox.prototype.downShake = function(){
	tempBack = game.add.tween(this).to({y: this.oriP.y}, 30, Phaser.Easing.Bounce.Out);
	game.add.tween(this).to({y: this.oriP.y + 5}, 30, Phaser.Easing.Bounce.Out, true,0,1).chain(tempBack);  
	tempBack2 = game.add.tween(this.scale).to({y: 1}, 30, Phaser.Easing.Bounce.Out);
	game.add.tween(this.scale).to({y: 0.7}, 30, Phaser.Easing.Bounce.Out, true,0,1).chain(tempBack2);  
};

//大小抖动
TileBox.prototype.sizeShake = function(){
	tempBack2 = game.add.tween(this.scale).to({y: 1,x: 1}, 100, Phaser.Easing.Bounce.Out);
	game.add.tween(this.scale).to({y: 1.3,x:1.3}, 100, Phaser.Easing.Bounce.Out, true,0,1).chain(tempBack2);  
};

TileBox.prototype.onKill = function (){
	this.destroy();

};



//设置附加属性
TileBox.prototype.setProperty = function(p){
	this.properties = p;

	if(this.boxType == ConstData.TYPE_MONSTERBLOCKBOX){
		this.alpha = 0;
	}
	//自定义了动画  animFrame
	if(p.animFrame != undefined){
		var tempArr = p.animFrame.split(',');
		var animArr = [];
		for(var i = 0 ; i < tempArr.length ; i ++){
			animArr.push(parseInt(tempArr[i]));
		}
		this.animations.add('anim',animArr,10,true);
		this.animations.play('anim',true);
	}

	//允许穿行的面  checkCollision
	if(p.checkCollision != undefined){
		this.body.checkCollision.left = p.checkCollision.indexOf('left') >= 0;
		this.body.checkCollision.right = p.checkCollision.indexOf('right') >= 0;
		this.body.checkCollision.down = p.checkCollision.indexOf('down') >= 0;
		this.body.checkCollision.up = p.checkCollision.indexOf('up') >= 0;
		//如果值是no 则不检测碰撞
		if(p.checkCollision == 'no'){
			this.body.checkCollision.left = this.body.checkCollision.right = 
				this.body.checkCollision.down = this.body.checkCollision.up = false;
		}
	}


	//撞击使用所需求的金币个数
	if(p.coinNum != undefined){
		var txt = game.add.text(this.oriP.x,this.oriP.y - 16,p.coinNum,ConstData.TEXT_TYPE1);
		txt.anchor.set(0.5);
		txt.addColor('#ffffff',0);
	}
};


//如果是传送门 可以获取另外一个出口
Object.defineProperty(TileBox.prototype, 'otherPortalName', {
	get: function() {
		if(this.boxType == ConstData.TYPE_PORTALBOX){
			if(this.name.charAt(this.name.length - 1) == 'A'){
				return this.name.slice(0,this.name.length - 1) + 'B';
			}else{
				return this.name.slice(0,this.name.length - 1) + 'A';
			}
		}
	}    
});