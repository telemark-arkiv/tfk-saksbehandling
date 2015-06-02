#!/usr/bin/env node
'use strict';
var fs = require('fs');
var options = JSON.parse(fs.readFileSync(process.argv[2]));
var tfkSaksbehandler = require('./index');

tfkSaksbehandler(options, function(error, data){
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    process.exit(0);
  }
});