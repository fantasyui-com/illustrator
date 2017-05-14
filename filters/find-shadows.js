const fs = require('fs');
const gm = require('gm');
const path = require('path');

module.exports = function (location){
  let dirname = path.dirname(location)
  let basename = path.basename(location)
  let newpath = path.join(dirname, path.basename(__filename, '.js') + '.' + basename );
  return new Promise(function (resolve, reject){
    gm(location)
      .noProfile()

      .median(1)

      .normalize().modulate("150%")
      .level('5%',0.3,'90%')
      .level('5%',0.3,'90%')



      .fill("white").colorize("50%")



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
