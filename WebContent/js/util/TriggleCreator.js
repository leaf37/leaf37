//交互生产器
function TriggleCreator() {
  this.numFallCount = 0;//掉落的次数
  this.numCoinNum = 0;//金币拥有的个数
  this.numJumpCount = 0;//跳跃次数
  this.numKillCount = 0;//击杀个数
  this.groupCollide = null;//交互组的引用
  this.map = null;//地图的引用

}
TriggleCreator.prototype.constructor = TriggleCreator;


TriggleCreator.prototype.triggle = function(_type) {
  if(_type == ConstData.TRIGGLE_TYPE_DIECOUNT){
    this.numFallCount ++;
  }else if(_type == ConstData.TRIGGLE_TYPE_COINNUM){
    this.numCoinNum ++;
  }else if(_type == ConstData.TRIGGLE_TYPE_KILLNUM){
    this.numKillCount ++;
  }else if(_type == ConstData.TRIGGLE_TYPE_JUMPNUM){
    this.numJumpCount ++;
  }

  for(var i = 0 ; i < createArr.length ; i ++){
    var tempArr = createArr[i];    
    var targetCount = tempArr[0];
    var triggleType = tempArr[3];    
    if(tempArr[0] != 0){
      //如果有数量目标则表示没有触发过
      //不同的触发条件进行触发
      if(
        (this.numFallCount == targetCount &&  triggleType == ConstData.TRIGGLE_TYPE_DIECOUNT) ||
        (this.numCoinNum == targetCount &&  triggleType == ConstData.TRIGGLE_TYPE_COINNUM) ||
        (this.numKillCount == targetCount &&  triggleType == ConstData.TRIGGLE_TYPE_KILLNUM) ||
        (this.numJumpCount == targetCount &&  triggleType == ConstData.TRIGGLE_TYPE_JUMPNUM)
        ){
        //计数置零 下次不再检测
        tempArr[0] = 0;
        this.createBox(tempArr[1],tempArr[2]);
      }
    }
    
  }
};


//创建交互对象
TriggleCreator.prototype.createBox = function(strName,strType){
  for(var i = 0 ; i < this.map.objects.obj.length ; i ++){
    var obj = this.map.objects.obj[i];
    if(obj.name == strName){ 
      var temp = new TileBox(obj.x + ConstData.OBJ_SIZE /2, obj.y + ConstData.OBJ_SIZE / 2,obj.gid - 1,strType);
      temp.name = strName;
      temp.setProperty(obj.properties);
      this.groupCollide.add(temp);
    }
  }
};