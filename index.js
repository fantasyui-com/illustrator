#!/usr/bin/env node
const program = require('commander');
const makeDir = require('make-dir');

const path = require('path');

const fs = require('fs');
const gm = require('gm');

const spawn = require('child_process').spawn;

const filter = function(name){return require(path.join( __dirname, "filters", name+".js"))}


async function main(files){

  const album = {data:[]};

  let chain = Promise.resolve();
  files.forEach(function (file) {
    const fullPath = path.resolve(file);

    chain = chain.then(()=>{if(program.verbose) console.log(`Processing: ${fullPath}`)} )

    chain = chain.then(()=>filter("original-image")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("charcoal-drawing")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))

    chain = chain.then(()=>filter("sketch-one")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("sketch-two")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("sketch-three")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))

    chain = chain.then(()=>filter("three-shades")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("five-shades")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("seven-shades")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))

    chain = chain.then(()=>filter("base-shadows")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("dark-shadows")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))
    chain = chain.then(()=>filter("light-shadows")(fullPath)).then(source => album.data.push({name:path.basename(file,path.extname(file)), source}))


  });
  await chain;

  if(program.album){

    const albumPath = path.resolve(program.album); // resolves using CWD

    if(program.unpdf){

      // store raw files in a directory
      await makeDir(albumPath);
      if(program.verbose) console.log(`Album directory path: ${albumPath}`)
      album.data.forEach(function (file, index) {
        const extName = path.extname(file.source);
        const fileName = `${file.name}.${index}${extName}`;
        const dest = path.join(albumPath, fileName)
        fs.renameSync( file.source, dest );
      });

    }else{

      // store pdf
      const dest = albumPath + '.pdf'; // we add .ext to convert /home/bob/my-album to /home/bob/my-album.pdf
      if(program.verbose) console.log(`Album PDF path: ${dest}`)
      const exec = spawn('convert', album.data.map(i=>i.source).concat([dest]));
      exec.stdout.on('data', (data) => {});
      exec.stderr.on('data', (data) => {});
      exec.on('close', (code) => {});

    }
  }
}


program
  .version('0.0.1')
  .option('-v, --verbose')
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
