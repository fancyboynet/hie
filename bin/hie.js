#!/usr/bin/env node
// vi foo/bin/foo.js
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  name: 'hie', // 命令名字
  processTitle: 'hie',
  moduleName: 'hie',
  configName: 'fis-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }
  fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/hie'));
  fis.set('system.globalNPMFolder', path.dirname(__dirname));
  fis.cli.run(argv, env);
});