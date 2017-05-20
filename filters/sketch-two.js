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
    .autoOrient().resize(2000, 1000) // fit the image into these

      .noProfile()
      .type('Grayscale')

      .fill("white").colorize("30%")
      .blur(1) .median(1) .blur(1)

      .negative().edge(1).negative().level('1%',0.05,'99%').level('2%',0.2,'98%').contrast(3)

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
