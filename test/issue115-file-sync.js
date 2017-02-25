var
  fs    = require('fs'),
  join  = require('path').join,
  tmp   = require('../lib/tmp'),
  spawn = require('./spawn');

spawn.tmpFunction({ unsafeCleanup: true }, function (err, name) {
  if (err) {
    spawn.err(err, spawn.exit);
    return;
  }

  try {
    // creates a tmp file and then deletes it as per issue 115
    // https://github.com/raszi/node-tmp/issues/115

    tmpobj = tmp.fileSync();
    fs.closeSync(tmpobj.fd);
    fs.unlinkSync(tmpobj.name);
    spawn.out(tmpobj.name, spawn.exit);
  } catch (e) {
    spawn.err(e.toString(), spawn.exit);
  }
});

