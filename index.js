#!/usr/bin/env node

const path = require('path');
const makelink = require('./makelink');


const pathName = path.resolve(__dirname, '../..');
console.log(pathName)

const srcFile = pathName + '/README.md';

console.log(srcFile)

makelink(srcFile,pathName);