function Tool(){
	//工具类
}

Tool.prototype.constructor = Tool;


//在数组中根据名字获取对象 这个要唯一性的
Tool.getObjectByName = function(arr,name){
	if(!name)return null;
	for(var i = 0 ; i < arr.length ; i ++){
		if(arr[i].name == name){
			return arr[i];
		}
	}
};