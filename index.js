#!/usr/bin/env node

const path = require('path');
const makelink = require('./makelink');
const validator = require('validator');
const program = require('commander');

var host = "";
//定义参数,以及参数内容的描述
program
    .version('0.0.1')
    .option('-h, --host <url>', 'a string of type url argument','http://whalexplorer.coding.me/prototype/');

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
console.info('--host:');
console.log(program.host);

const pathName = path.resolve('./');//当前命令运行的目录；__dirname：返回运行文件所在的目录
console.log(pathName);

const srcFile = pathName + '/README.md';

console.log(srcFile);

makelink(srcFile,pathName,host);