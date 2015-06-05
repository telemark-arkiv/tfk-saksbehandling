'use strict';

var fs = require('fs');
var mongojs = require('mongojs');

function tfkSaksbehandling(options, callback){
  if (!options) {
    return callback(new Error('Missing required input: options'), null);
  }

  if (!options.SAKSBEHANDLER) {
    return callback(new Error('Missing required input: options.SAKSBEHANDLER'), null);
  }

  if (!options.DB) {
    return callback(new Error('Missing required input: options.DB'), null);
  }

  if (!options.COLLECTION) {
    return callback(new Error('Missing required input: options.COLLECTION'), null);
  }

  if (!options.FORM_ID) {
    return callback(new Error('Missing required input: options.FORM_ID'), null);
  }

  if (!options.FORM_VERSION) {
    return callback(new Error('Missing required input: options.FORM_VERSION'), null);
  }

  if (!options.OUT) {
    return callback(new Error('Missing required input: options.OUT'), null);
  }

  var saksbehandler = require(options.SAKSBEHANDLER);
  var db = mongojs(options.DB);
  var collection = db.collection(options.COLLECTION);

  collection.findOne({formId:options.FORM_ID, formVersion:options.FORM_VERSION}, function(error, data) {
    if (error) {
      return callback(error, null);
    } else {
      saksbehandler(data, function(err, result){
        if (err) {
          return callback(err, null);
        } else {
          var filename = options.OUT + '/' + result._id + '.json';
          fs.writeFile(filename, JSON.stringify(result), function (feil) {
            if (feil) {
              return callback(feil, null);
            } else {
              return callback(null, "Finished form " + result._id);
            }
          });
        }
      });
    }
  });
}

module.exports = tfkSaksbehandling;