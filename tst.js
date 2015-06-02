'use strict';

var tfkSaksbehandler = require('./index');
var options = {
  SAKSBEHANDLER:"tfk-saksbehandling-skoleskyss",
  DB:"mongodb://localhost:27017/tfk",
  COLLECTION:"forms",
  FORM_ID:"tkf-skoleskyss",
  FORM_VERSION:"12.0.2",
  OUT: "files"
};

tfkSaksbehandler(options, function(error, data){
  if (error) {
    console.error(error);
  } else {
    console.log(data.length);
  }
});