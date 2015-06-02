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
  var totalJobs = 0;
  var jobCount = 0;
  var messages = [];

  function areWeDoneYet(){
    jobCount++;
    console.log(jobCount + " jobs done.");
    if (jobCount === totalJobs) {
      return callback(null, messages);
    }
  }

  collection.find({formId:options.FORM_ID, formVersion:options.FORM_VERSION}, function(error, data) {
    if (error) {
      return callback(error, null);
    } else {
      messages.push("Found " + data.length + " forms.");
      if (data.length > 0) {
        totalJobs = data.length;
        console.log(totalJobs);
        data.forEach(function(item) {
          saksbehandler(item, function (err, result) {
            if (err) {
              messages.push(err);
              areWeDoneYet();
            } else {
              var filename = options.OUT + '/' + result._id + '.json';
              fs.writeFile(filename, JSON.stringify(result), function (feil) {
                if (feil) {
                  messages.push(feil);
                  areWeDoneYet();
                } else {
                  messages.push("Finished form " + result._id);
                  areWeDoneYet();
                }
              });
            }
          })
        });
      } else {
        return callback(null, messages);
      }
    }
  });
}

module.exports = tfkSaksbehandling;