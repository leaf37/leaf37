//主角
function Player1(x,y,key){
	this.isOnFloor = false;
	this.isFalling = false;
	this.myTri = null;
	this.dir = 'none';
	this.speedP1 = 100;
	this.jumpHeight = 170;

	this.jumpCold = 0;//可以跳跃的冷却时间
	this.extroHeight = 0;//额外的跳跃高度
	Phaser.Sprite.call(this,game,x,y,key);
	game.physics.arcade.enable(this);
	this.body.setSize(16,16,0,2);
	this.body.bounce.y = 0.1;
	this.anchor.setTo(0.5,0.5);
	this.checkWorldBounds = true;
	//武器管理
	this.myWeapon = null;
	this.init();
}
Player1.prototype = Object.create(Phaser.Sprite.prototype);
Player1.prototype.constructor = Player1;


Player1.prototype.init = function() {
	this.animRun = this.animations.add('run',Phaser.Animation.generateFrameNames('run', 1, 5, '.png', 1),10,true);
	this.animStay = this.animations.add('stay',['run3.png'],10,true);
	this.animJump = this.animations.add('jump',['jump.png'],10,true);
	this.animFall = this.animations.add('fall',Phaser.Animation.generateFrameNames('fall', 2, 2, '.png', 1),10,false);
	this.animRun.enableUpdate = true;
	this.animRun.onUpdate.add(this.onRunAnimUpdate,this);
};

Player1.prototype.onRunAnimUpdate = function(e) {
	//trace(e.currentFrame.name);
};

Player1.prototype.update = function(){
	this.isOnFloor = this.body.onFloor() || this.body.touching.down;
	this.isFalling = this.body.velocity.y > 0;
	if(this.jumpCold > 0){
		this.jumpCold --;
	}
	//trace(this.parent)
	if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.dir = 'left';
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.dir = 'right';
	}else{
		this.dir = 'none';
	}

	//左右走和空中的逻辑
	if(this.dir == 'left'){
		this.scale.x = -1;
		this.body.velocity.x = -this.speedP1;
		if(this.isOnFloor){
			this.animations.play('run');
		}else{
			if(this.isFalling){
				this.animations.play('fall',null,false);
			}else{
				this.animations.play('jump');
			}
		}
	}else if(this.dir == 'right'){
		this.scale.x = 1;
		this.body.velocity.x = this.speedP1;
		if(this.isOnFloor){
			this.animations.play('run');
		}else{
			if(this.isFalling){
				this.animations.play('fall',null,false);
			}else{
				this.animations.play('jump');
			}
		}
	}else{
		this.body.velocity.x = 0;
		if(this.isOnFloor){
			this.animations.play('stay');
		}else{
			if(this.isFalling){
				this.animations.play('fall',null,false);
			}else{
				if(this.body.velocity.y < 0){
					this.animations.play('jump');
				}
			}
		}
	}

	//按w跳跃
	if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
		if(this.isOnFloor && !this.jumpCold){   
			this.makeDush();  
			this.jumpCold = 30;
			this.myTri.triggle(ConstData.TRIGGLE_TYPE_JUMPNUM);
			this.animations.play('jump');
			this.body.velocity.y = -(this.jumpHeight + this.extroHeight); 
			this.extroHeight = 0;     
		}
	}

	//使用武器
	if(game.input.keyboard.isDown(Phaser.Keyboard.J)){
		this.myWeapon.shot(this.x,this.y,this.scale.x);
		
	}
};


Player1.prototype.throwTo = function(x,y){
	this.reset(x,y);
	this.body.velocity.y = -200;
};

//跑步的灰尘
Player1.prototype.makeDush = function(){
	var dushSp = game.add.sprite(this.x,this.y,'dush1');
	dushSp.anchor.set(0.5,0);
	dushSp.scale.x = this.body.velocity.x > 0 ? 1: -1;
	var tempAnim = dushSp.animations.add('dush',[0,1,2,3,4,3,2,1,0],20);
	tempAnim.play('dush');
	tempAnim.onComplete.add(
			function(){
				dushSp.kill();
				dushSp.destroy();
			}
	);
};