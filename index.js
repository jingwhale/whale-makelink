#!/usr/bin/env node

const Path = require('path');
const fs = require('fs');
const validator = require('validator');
const program = require('commander');

var host = "";
var dataHead = "###项目原型\r\r";
var designDataHead = "设计要素\n\n";

var dataBody = "";
var designDataBody = "";
var itmDesign = "/design/";
//定义参数,以及参数内容的描述
program
    .version('0.0.1')
    .option('-h, --host <url>', 'a string of type url argument','http://whalexplorer.coding.me/prototype/')
    .option('-m, --mode <notanumber>', 'a string of type url argument',1);

//添加额外的文档描述
program.on('help', function() {
    console.log('   Examples:');
    console.log('');
    console.log('       # a string of type url argument, eg: https://www.jingwhale.cc/');
});


//解析commandline arguments
program.parse(process.argv);


if(program.host){
    if(validator.isURL(program.host)){
        host = program.host;
    }else{
        console.log("The --host url format is incorrect，please re-enter the host.");
        return;
    }
}else{
    host = "http://whalexplorer.coding.me/prototype/";
}

//输出结果
console.info('--host:'+program.host);
console.info('--mode:'+program.mode);

const pathName = Path.resolve('./');//当前命令运行的目录；__dirname：返回运行文件所在的目录
console.log(pathName);

const srcFile = pathName + '/README.md';

console.log(srcFile);

makelink(srcFile,pathName,host);

function writeFile(src,data,pathName) {
    fs.exists(src, function (exists){
        if(exists){
            fs.unlink(src,function(err){//删除README
                if (err) {
                    throw err;
                }else{
                    fs.writeFile(src, data, { flag: 'a' }, function(err) {//创建README
                        if (err) {
                            throw err;
                        }else{
                            console.log('Done!');
                        }
                    });
                }
            });
        }else{
            fs.writeFile(src, data, { flag: 'a' }, function(err) {//创建README
                if (err) {
                    throw err;
                }else{
                    console.log('Done!');
                }
            });
        }
    });
};

function readDesignList(preUrl,designFiles,newPath,project) {
    designFiles.forEach(function (itm, index) {
        if(itm.indexOf(".html")!=-1){
            var item ='['+itm+']('+ preUrl+itm+')\r\r';
            designDataBody = designDataBody + item;
            console.log(item);
        }
    });

    if(designDataBody){
        var designData = '###《'+project+'》'+designDataHead+designDataBody;

        var newPathReadme = newPath+'/README.md';

        writeFile(newPathReadme,designData);

        designDataBody = "";
    }
}

function writeSingleReadme(pathName,fileName,host,itmDesignFalg) {
    var singleDataHead = '###《'+fileName+'》\n\n';

    var singleDataBody1 = '['+fileName+']('+host+fileName+'/'+fileName+')\n\n';
    var singleDataBody2 = '';
    var singleDataBody3 = '';
    if(!!itmDesignFalg){
        singleDataBody2 = '[设计要素]('+'https://dev.tencent.com/u/whalexplorer/p/'+fileName+'/git/blob/master/design/README.md'+')\n\n';
    }

    var itemPath = pathName+'/'+fileName;
    var files = fs.readdirSync(itemPath);
    files.forEach(function (itm, index) {
        var itmPath = itemPath+'/'+itm;
        if(Path.extname(itmPath)=='.pdf'){
            singleDataBody3 = '['+itm+']('+host+fileName+'/'+itm+')\n\n';
        }
    });
    var singleData = singleDataHead + singleDataBody1 + singleDataBody2 + singleDataBody3;

    var newSinglePathReadme = pathName+'/'+fileName+'/README.md';

    writeFile(newSinglePathReadme,singleData);
};

function readFileList(path,host) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        if((itm.substr(0, 1) != '.') && (itm!="node_modules")){
            var stat = fs.statSync(path + '/'+itm);
            if(stat.isDirectory()){
                var item = '['+itm+']('+host+itm+'/'+itm+')\r\r';
                dataBody = dataBody + item;
                // console.log(item);

                var newPath = path+'/'+itm+'/design';
                var itmDesignFalg = false;
                fs.exists(newPath, function (exists) {
                    if(exists){
                        console.log(newPath);
                        var designFiles = fs.readdirSync(newPath);
                        if(designFiles && designFiles.length>0){
                            var preUrl = host+itm+itmDesign;
                            readDesignList(preUrl,designFiles,newPath,itm)
                            console.log(designFiles.length);
                            itmDesignFalg = true;
                            writeSingleReadme(path,itm,host,itmDesignFalg);
                        }
                    }
                })
            }
        }
    });
    return (dataHead+dataBody);
}

function makelink(src,pathName,host){
    var data = readFileList(pathName,host);
    if(program.mode==1){
        // 写入文件内容（如果文件不存在会创建一个文件）
        writeFile(src,data,pathName);
    }
}