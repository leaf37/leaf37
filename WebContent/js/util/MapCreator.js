//地图构建器
function MapCreator(_mapName,_tileName){
  this.map = null;
  this.layer = null;
  this.create(_mapName,_tileName);
}

MapCreator.prototype.constructor = MapCreator;


//创建地图
MapCreator.prototype.create = function(_mapName,_tileNames){
  this.map = game.add.tilemap(_mapName);
  for(var i = 0 ; i < _tileNames.length ; i ++){
	  this.map.addTilesetImage(_tileNames[i]);
  }
  
  for(var i = 0 ; i < this.map.layers.length ; i ++){    
    if(this.map.layers[i].name == 'level'){
      this.layer = this.map.createLayer(this.map.layers[i].name);
      this.layer.resizeWorld();
    }else{
      //this.map.createLayer(this.map.layers[i].name);
    }
  }
  this.layer.debug = true;
  this.map.setCollisionBetween(2, 200 , true, this.layer);

  for(var i = 0 ; i < this.map.images.length ; i ++){
    //this.map.createLayer(this.map.images[i].name);
    var obj = this.map.images[i];
    var tempImg = game.add.image(obj.x,obj.y,obj.properties.key);
    tempImg;
  }
};

//在地图obj数组中找个对象
MapCreator.prototype.getObjectByName = function(name){
  return Tool.getObjectByName(this.map.objects.obj,name);
};