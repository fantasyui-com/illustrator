const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
const spawn = require('child_process').spawn;

module.exports = function (location){
  let dirname = path.dirname(location)
  let basename = path.basename(location)
  let newpath = tmp.fileSync({postfix:path.extname(basename)}).name;
  return new Promise(function (resolve, reject){

    const setup = [
      location,
       "-blur", "5",
       "-scale", "400%",
       //"-median", "8",
       "+dither",
       "-posterize", "16",
       "-emboss", "0x.19",
       "-canny", "0x1+10%+10%",
       "-negate",
       newpath
    ]
    const exec = spawn('convert', setup );
    exec.stdout.on('data', (data) => {});
    exec.stderr.on('data', (data) => {});
    exec.on('close', (code) => {
      resolve(newpath);
    });



  });
}
