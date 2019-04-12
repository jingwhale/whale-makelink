const fs = require('fs');
const path = require("path");

var host = 'http://whalexplorer.coding.me/prototype/';

var dataHead = "项目工程<br/><br/>";

var dataBody = "";


function readFileList(path) { 
	var files = fs.readdirSync(path); 
	files.forEach(function (itm, index) {
		if((itm.substr(0, 1) != '.') && (itm!="node_modules")){
			var stat = fs.statSync(path + '/'+itm);
			if(stat.isDirectory()){
				var item = '['+itm+']('+host+itm+'/'+itm+')<br/>';
		        dataBody = dataBody + item;
				console.log(item);
			} 	
		}
	}) 
	return (dataHead+dataBody);
}

function writeFile(src,data,pathName) {
	fs.unlink(src,function(err){//删除README
		if (err) {
	        throw err;
	    }
	});

	fs.writeFile(src, data, { flag: 'a' }, function(err) {//创建README
	    if (err) {
	        throw err;
	    }
	 
	    console.log('Done!');
	});
};

module.exports=function (src,pathName){
	var data = readFileList(pathName);
    // 写入文件内容（如果文件不存在会创建一个文件）
	writeFile(src,data,pathName);
};
 

