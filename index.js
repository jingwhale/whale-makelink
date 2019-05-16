#!/usr/bin/env node

const path = require('path');
const makelink = require('./makelink');

const pathName = path.resolve('./');//当前命令运行的目录；__dirname：返回运行文件所在的目录
console.log(pathName);

const srcFile = pathName + '/README.md';

console.log(srcFile);

makelink(srcFile,pathName);