const fs = require('fs');

var dataHead = "项目原型<br/><br/>";

var dataBody = "";

function readFileList(path,host) {
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

module.exports=function (src,pathName,host){
    var data = readFileList(pathName,host);
    // 写入文件内容（如果文件不存在会创建一个文件）
    writeFile(src,data,pathName);
};
 

