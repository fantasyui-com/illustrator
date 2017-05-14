#!/usr/bin/env node

const path = require('path');

const fs = require('fs');
const gm = require('gm');

const filter = function(name){return require(path.join( __dirname, "filters", name+".js"))}

const sketchOutline = filter("sketch-outline");
const findShadows = filter("find-shadows");
const showSteps = filter("show-steps");

async function main(files){

  let chain = Promise.resolve();

  files.forEach(function (file) {
    const fullPath = path.resolve(file);
    chain = chain.then(()=>sketchOutline(fullPath))
    chain = chain.then(()=>findShadows(fullPath))
    chain = chain.then(()=>showSteps(fullPath))
  });

  await chain;

}




var program = require('commander');

program
  .version('0.0.1')
  .command('sketch <dir> [files...]')

  .action(function (dir, files) {
    files.unshift(dir);
    if (files) {
      main(files)
    }
  });

program.parse(process.argv);
