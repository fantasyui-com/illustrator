#!/usr/bin/env node
const program = require('commander');
const makeDir = require('make-dir');

const path = require('path');

const fs = require('fs');
const gm = require('gm');

const spawn = require('child_process').spawn;

const filter = function(name){return require(path.join( __dirname, "filters", name+".js"))}

const normalizeImage = filter("normalize-image");
const charcoalDrawing = filter("charcoal-drawing");
const sketchOutline = filter("sketch-outline");
const findShadows = filter("find-shadows");
const showSteps = filter("show-steps");

async function main(files){

  const album = {data:[]};

  let chain = Promise.resolve();
  files.forEach(function (file) {
    const fullPath = path.resolve(file);
    chain = chain.then(()=>normalizeImage(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>charcoalDrawing(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>sketchOutline(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>showSteps(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>findShadows(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
  });
  await chain;

  if(program.album){
    if(program.unpdf){
      const albumPath = path.join('.', program.album);
      await makeDir(albumPath);
      album.data.forEach(function (file, index) {
      fs.renameSync( file.source, path.join(albumPath, file.name +'.'+ index + path.extname(file.source)) );
      });
    }else{
      const convert = spawn('convert', album.data.map(i=>i.source).concat([`./${program.album}.pdf`]));
      convert.stdout.on('data', (data) => {});
      convert.stderr.on('data', (data) => {});
      convert.on('close', (code) => {});
    }
  }
}


program
  .version('0.0.1')
  .option('--album [name]', 'Album name [my-album]', 'my-album')
  .option('--unpdf', 'Disable pdf mode and use a simple directory.')
  .command('sketch <dir> [files...]')
  .action(function (dir, files) {
    files.unshift(dir);
    if (files) {
      main(files)
    }
  });

program.parse(process.argv);
