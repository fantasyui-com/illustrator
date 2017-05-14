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
