
function ConstData(){
	//放置一些常量的类
}

//游戏方块的大小
ConstData.OBJ_SIZE = 16;


//交互对象的类型
ConstData.TYPE_NORMAL = 1;//普通型 只是碰撞
ConstData.TYPE_COINBOX = 2;//金币盒子
ConstData.TYPE_MONSTERBOX = 3;//怪物盒子
ConstData.TYPE_JUMPBOX = 4;//用来跳的盒子
ConstData.TYPE_PORTALBOX = 5;//传送门盒子
ConstData.TYPE_HURTBOX = 6;//致命盒子
ConstData.TYPE_CREATORBOX = 7;//交互后可以创造地形的盒子
ConstData.TYPE_SHOPBOX = 8;//商店盒子
ConstData.TYPE_MONSTERBLOCKBOX = 9;//只阻拦怪物的盒子


//触发类型
ConstData.TRIGGLE_TYPE_DIECOUNT = 1;//触发类型 死亡次数
ConstData.TRIGGLE_TYPE_COINNUM = 2;//触发类型 金币数量
ConstData.TRIGGLE_TYPE_KILLNUM = 3;//触发类型 击杀敌人数量
ConstData.TRIGGLE_TYPE_JUMPNUM = 4;//触发类型 跳跃次数。。3


//文字样式
ConstData.TEXT_TYPE1 = {
  font: '12pt Arial'
}