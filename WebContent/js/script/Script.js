//剧情脚本
var createArr = [//创建交互的内容
                 [1,'boxFirst',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死1次触发第一个平台
                 [1,'boxRight1',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死3次触发右边的平台
                 [1,'boxCoin',ConstData.TYPE_COINBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],//死5次触发了金币盒子

                 [1,'boxMonster1',ConstData.TYPE_MONSTERBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],//得到10个金币触发第一个怪物盒子

                 [1,'boxRight2',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死8次触发右边第二个平台



                 [1,'boxUpFloor1',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],
                 [1,'boxShop1',ConstData.TYPE_SHOPBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
                 [1,'boxBlockEnemy1',ConstData.TYPE_MONSTERBLOCKBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
                 //收集一定的金币 开启怪物方块 
                 //收集一定的金币 开启商店平台
                 //怪物方块产生的怪物根据当前设定的怪物等级出现
                 //商店内购买武器可以消灭怪物
                 //消灭怪物有几率获得需求的道具
                 //消灭怪物一定数量开启下一个新区域                 
                 //需求道具满足条件后 可以打开新区域的锁
                 //下一个区域可以升级商店以及提升怪物等级

                 //解锁完所有区域后打最终boss boss有几种属性变化 需要碰对应属性的武器方块 切换武器才能进攻

                 //new
                 //碰撞到武器盒子随机获得一个武器
                 //碰到怪物盒子随机产生一组敌人


//               [1,'boxFirst',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死1次触发第一个平台
//               [3,'boxRight1',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死3次触发右边的平台
//               [5,'boxCoin',ConstData.TYPE_COINBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],//死5次触发了金币盒子

//               [10,'boxMonster1',ConstData.TYPE_MONSTERBOX,ConstData.TRIGGLE_TYPE_COINNUM],//得到10个金币触发第一个怪物盒子

//               [8,'boxRight2',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],//死8次触发右边第二个平台


                 ];



var monsterGroupArr = [
                       [['Monster1',3,'boxQuestion1'],['Monster1',1,'']],
                       [['Monster1',20,'boxQuestion2'],['Monster1',20,'boxQuestion2']]
                       ];

[[11,'boxTop',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_JUMPNUM],
 [10,'boxLeft1',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_COINNUM],
 [3,'boxMonsterBase',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [2,'boxPlayerBase',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [2,'boxRight2',ConstData.TYPE_NORMAL,ConstData.TRIGGLE_TYPE_COINNUM],
 [1,'boxMonster1',ConstData.TYPE_MONSTERBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxJump1',ConstData.TYPE_JUMPBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxQuestion1',ConstData.TYPE_MONSTERBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxPortal1A',ConstData.TYPE_PORTALBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxPortal1B',ConstData.TYPE_PORTALBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxHurt1',ConstData.TYPE_HURTBOX,ConstData.TRIGGLE_TYPE_DIECOUNT],
 [1,'boxCreate1',ConstData.TYPE_CREATORBOX,ConstData.TRIGGLE_TYPE_DIECOUNT]]