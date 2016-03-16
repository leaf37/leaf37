/**
 * StateGame state.
 */
function StateGame() {  
	Phaser.State.call(this);
	this.myTri = null;
	this.myMapCreator = null;
	this.hitGrountSpeed = 0;
	this.p1;//第一个角色
	this.posP1 = null;
	this.txtCoin = null;
	this.tickNum = 0;
	this.groupCollide = null;//进行交互的碰撞组
	this.groupPlayer = null;//放主角的
	this.groupObj = null;//其他道具
	this.groupMonster = null;//敌人组
	this.emitterPlayerDrop = null;
	this.myWeapon = null;

}

/** @type Phaser.State */
StateGame.prototype = Object.create(Phaser.State.prototype);
StateGame.prototype.constructor = StateGame;

StateGame.prototype.preload = function(game) {

};

StateGame.prototype.create = function() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.set(0, 400);
	game.stage.backgroundColor = '#555555';	

	//震动插件
	game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
	game.plugins.screenShake.setup({ //if need to replace default plugin settings
		shakeX: true,
		shakeY: true
	});
	///////////////////////////////    map    ///////////////////////////

	this.myMapCreator = new MapCreator('level1',['tile','bg1']);	
	this.groupCollide = game.add.group();
	this.groupObj = game.add.group();
	this.groupMonster = game.add.group();
	this.groupPlayer = game.add.group();
	
	this.myTri = new TriggleCreator();
	this.myTri.map = this.myMapCreator.map;
	this.myTri.groupCollide = this.groupCollide;
	///////////////////////  player1   ////////////////////////////
	var tempObj = this.myMapCreator.getObjectByName('p1');
	this.posP1 = new Phaser.Point(tempObj.x + 16,tempObj.y);
	this.p1 = new Player1(this.posP1.x,this.posP1.y,'p1');  
	this.p1.events.onOutOfBounds.add(this.killPlayer,this);
	this.p1.myTri = this.myTri;
	this.groupPlayer.add(this.p1);	
	var deadzone = new Phaser.Rectangle(0, 0, 200, 100);
	deadzone.x = (game.width -  deadzone.width) / 2;
	deadzone.y = (game.height -  deadzone.height) / 2;
	//game.camera.deadzone = deadzone;

	this.txtCoin = game.add.text(0,0);

	this.triggleGameEvent(ConstData.TRIGGLE_TYPE_DIECOUNT);

	//角色掉落死亡的emitter
	this.emitterPlayerDrop = game.add.emitter(100,game.height + 16,50);
	this.emitterPlayerDrop.makeParticles('dropStar',[1,2,3,4]);
	this.emitterPlayerDrop.setYSpeed(-200, -300);
	this.emitterPlayerDrop.setXSpeed(-100, 100);
	this.emitterPlayerDrop.setRotation(-720, 720);


	//武器管理
	this.myWeapon = new WeaponManager();
	this.p1.myWeapon = this.myWeapon;
	trace(monsterGroupArr);
};

StateGame.prototype.update = function() {
	//碰撞放到最前面 不知道为什么 不然会出现诡异的问题
	game.physics.arcade.collide(this.p1, this.groupCollide,this.onCollideGroup,this.onBeforeCollideMap,this);
	game.physics.arcade.collide(this.myWeapon.bulletGroup,this.groupCollide,null,this.onBeforeCollideMap,this);
	game.physics.arcade.collide(this.groupMonster, this.groupCollide);
	game.physics.arcade.overlap(this.groupMonster, this.myWeapon.bulletGroup,this.bulletHitMonster,null,this);
//	game.physics.arcade.collide(this.groupMonster, this.groupMonster);	
	game.physics.arcade.collide(this.groupCollide, this.groupCollide);	
	this.p1.update();
	this.myWeapon.update();
	this.tickNum ++;
	this.txtCoin.text = 'Coin:' + this.myTri.numCoinNum;
};


//触发游戏剧情
StateGame.prototype.triggleGameEvent = function(type){
	this.myTri.triggle(type);
};

StateGame.prototype.bulletHitMonster = function(obj1,obj2){
	var canHurt = obj2.onHit();
	if(canHurt){
		obj1.onHit(obj2);
	}
};

//掉出舞台后
StateGame.prototype.killPlayer = function(obj){		
	this.shake();
	this.emitterPlayerDrop.x = this.p1.x;
	this.emitterPlayerDrop.start(true,2000,null,20);

	this.p1.kill();
	this.triggleGameEvent(ConstData.TRIGGLE_TYPE_DIECOUNT);
	//过一会儿重生
	game.time.events.add(Phaser.Timer.SECOND * 1, this.reviveP1 , this);	
};

StateGame.prototype.reviveP1 = function(){
	this.p1.reset(this.posP1.x,this.posP1.y);
};

//和碰撞组的碰撞
StateGame.prototype.onCollideGroup = function(obj1,obj2){
	var normalFloor = true;//是否正常的地面  弹跳性的不算 要置为false
	if(obj2.boxType == ConstData.TYPE_COINBOX && obj2.body.touching.down){
		//如果是顶金币
		obj1.body.velocity.y = 100;		
		obj2.upShake();
		var tempCoin = new Coin(obj2.x,obj2.y - 15);
		this.groupObj.add(tempCoin);		
		this.triggleGameEvent(ConstData.TRIGGLE_TYPE_COINNUM);
	}else if(obj2.boxType == ConstData.TYPE_MONSTERBOX && obj2.body.touching.down){
		//如果是顶怪物盒子
		obj2.upShake();
		
		var arrTempGroup = monsterGroupArr[0];
		for(var i = 0 ; i < arrTempGroup.length ; i ++){
			var type1 = objectMap.get(arrTempGroup[i][0]);
			var num1 = arrTempGroup[i][1];
			var pos1;
			for(var j = 0 ; j < num1 ; j ++){
				pos1 = Tool.getObjectByName(this.myMapCreator.map.objects.obj,arrTempGroup[i][2]);
				if(!pos1){
					pos1 = new Phaser.Point(game.rnd.realInRange(0,game.width),game.rnd.realInRange(0,game.height));
				}
				tempM = new type1(pos1.x,pos1.y -20);
				tempM.body.velocity.y = -100;
				this.groupMonster.add(tempM);
				pos1 = null;
			}
		}
		
		return;
		//下面是老的出怪方式 暂时先不用
		//如果有指明出口
		var outObj = Tool.getObjectByName(this.myMapCreator.map.objects.obj,obj2.properties.monsterOut);
		var outType = objectMap.get(obj2.properties.monsterType);
		var tempMonster;
		if(outObj){
			obj3 = outObj;
		}

		if(outType){
			tempMonster = new outType(obj3.x,obj3.y -20);
		}else{
			tempMonster = new Monster1(obj3.x,obj3.y -20);
		}		
		tempMonster.body.velocity.y = -100;
		this.groupMonster.add(tempMonster);
	}else if(obj2.boxType == ConstData.TYPE_JUMPBOX && obj2.body.touching.up){
		//如果踩的是跳跃盒子
		normalFloor = false;
		obj2.downShake();
		obj1.extroHeight = 100;
		obj1.body.velocity.y = -230;		
	}else if(obj2.boxType == ConstData.TYPE_PORTALBOX && (obj2.body.touching.up||obj2.body.touching.down)){
		//如果踩的或者顶的是传送门
		obj2.sizeShake();
		var otherPortal = Tool.getObjectByName(this.groupCollide.children,obj2.otherPortalName);
		otherPortal.sizeShake();
		this.p1.throwTo(otherPortal.x,otherPortal.y);
	}else if(obj2.boxType == ConstData.TYPE_HURTBOX){
		//如果碰到致命盒子
		obj2.sizeShake();
		this.killPlayer();
	}else if(obj2.boxType == ConstData.TYPE_CREATORBOX  && obj2.body.touching.down){
		//如果顶到构造方块的盒子
		obj2.upShake();
		if(obj2.properties.create){
			this.myTri.createBox(obj2.properties.create,ConstData.TYPE_NORMAL);
		}
		//obj2.destroy();
		obj2.properties.create = null;
	}else if(obj2.boxType == ConstData.TYPE_SHOPBOX  && obj2.body.touching.down){
		//如果顶到商店盒子
		obj2.upShake();
		var item = objectMap.get(obj2.properties.item);
		if(obj2.properties.type == 'weapon'){
			this.myWeapon.changeWeapon(item);
		}
		
	}


	if(normalFloor){
		this.checkNormalFloor();
	}
};

//和地图的碰撞
StateGame.prototype.onCollideMap = function(obj1,obj2){
	if(isFalling && this.p1.body.onFloor() && this.hitGrountSpeed > 250){
		//高速掉落到地面则震动
		this.shake();
		this.hitGrountSpeed = 0;
	}
	this.checkNormalFloor();
};

//检测正常地面的碰撞
StateGame.prototype.checkNormalFloor = function(){
	if(this.p1.body.touching.down){
		//碰撞正常地面时重置额外跳跃高度
		this.p1.extroHeight = 0;

		//走路扬起的灰尘
		if(this.p1.body.velocity.x != 0 && this.tickNum % 8 == 0){
			this.p1.makeDush();
		}
	}
};



//在碰撞前一瞬间的处理
StateGame.prototype.onBeforeCollideMap = function(obj1,obj2){
	if(obj2.boxType == ConstData.TYPE_MONSTERBLOCKBOX){
		return false;//如果是阻挡怪物的盒子 则不对玩家造成阻碍
	}
	this.hitGrountSpeed = this.p1.body.velocity.y;
	return true;
};

//屏幕震动
StateGame.prototype.shake = function(){
	var num = arguments[0]?arguments[0]:10; 
	game.plugins.screenShake.shake(num); //pass shake count value
};



StateGame.prototype.render = function() {
//	game.debug.body(this.p1);
};


