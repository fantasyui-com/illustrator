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
      .type('Grayscale')
      .normalize()
      .fill("white").colorize("30%")

      .colors(16)
      .blur(3)
      .median(2)
      .blur(2)
      .negative().edge(1).negative()
      .level('1%',0.05,'99%')

      .level('2%',0.2,'98%')

 .contrast(4)

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
