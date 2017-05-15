const fs = require('fs');
const gm = require('gm');
const path = require('path');

const tmp = require('tmp');

module.exports = function (location){

  let dirname = path.dirname(location)
  let basename = path.basename(location)
  let newpath = tmp.fileSync({postfix:path.extname(basename)}).name;

  return new Promise(function (resolve, reject){
    gm(location)
      .noProfile()


      .normalize()
      .blur(2)
      .median(3)
      .contrast(-10)
      .fill("white").colorize("46%")

      .font("Helvetica.ttf") .fontSize(14) .stroke("#000", 2) .fill("#000") .drawText(10, 24, path.basename(__filename, path.extname(__filename)).replace(/-/g,' ').toUpperCase() )
      .write(newpath, function (err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(newpath)
      });
  });
}
