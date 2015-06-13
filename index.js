'use strict';

var mongojs = require('mongojs');
var extend = require('extend-object');
var isOnline = require('is-online');

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

  isOnline(function (err, online) {
    if (err) {
      return callback(new Error(err), null);
    } else {
      if (!online) {
        return callback(new Error('We are not online, sir.'), null);
      } else {
        var saksbehandler = require(options.SAKSBEHANDLER);
        var db = mongojs(options.DB);
        var collection = db.collection(options.COLLECTION);

        collection.findOne({formId:options.FORM_ID, formVersion:options.FORM_VERSION}, function(error, data) {
          if (error) {
            return callback(error, null);
          } else {
            if (data) {
              if (options.SAKSBEHANDLER_OPTIONS) {
                extend(data, options.SAKSBEHANDLER_OPTIONS);
              }
              saksbehandler(data, function(err, result){
                if (err) {
                  return callback(err, null);
                } else {
                  return callback(null, result);
                }
              });
            } else {
              return callback(null, "None found");
            }
          }
        });
      }
    }
  });
}

module.exports = tfkSaksbehandling;