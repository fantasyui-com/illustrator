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
      .negative()
      .median(4)
      .charcoal(3)
      .normalize()
      .contrast(-4)

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
