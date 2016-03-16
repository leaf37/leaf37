function Player2(){
  this.isOnFloor = false;
  this.isFalling = false;
  this.player = null;
  var speedP2X = 40;
var speedP2Y = 100;

var isP2Flying = false;
  this.create();
}

Player2.prototype.constructor = Player2;


Player2.prototype.create = funciton(){
  this.player = game.add.sprite(30, 180,'p2');
  game.physics.arcade.enable(this.player);
  this.player.body.gravity.y = -200;
  this.player.body.drag.setTo(0,50);
  this.player.body.setSize(16,16,0,2);
  this.player.animations.add('fly',Phaser.Animation.generateFrameNames('fly', 1, 5, '.png', 1),10,false);
  this.player.animations.add('rest',['fly3.png']);
  this.player.animations.add('die',['die.png'],10,false);
  this.player.x = this.myMapCreator.getObjectByName('p2').x;
  this.player.y = this.myMapCreator.getObjectByName('p2').y;
  this.player.anchor.setTo(0.5,0.5);
  this.player.body.collideWorldBounds = true;
  this.player.visible = false;
}

isP2Flying = false;
  if(this.cursor.down.isDown){
    p2.body.velocity.y = speedP2X;
  }else if(this.cursor.up.isDown){
    isP2Flying = true;    
    p2.body.velocity.y = -speedP2Y;
  }else if(this.cursor.left.isDown){
    p2.scale.x = -1;
    p2.body.velocity.x = -speedP2X;
  }else if(this.cursor.right.isDown){
    p2.scale.x = 1;
    p2.body.velocity.x = speedP2X;
  }else{
    p2.body.velocity.x = 0;
  }

  if(isP2Flying){
    p2.animations.play('fly');
  }else{
    p2.animations.play('rest');
  }