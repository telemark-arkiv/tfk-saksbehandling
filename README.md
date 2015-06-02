# tfk-saksbehandling
Node modul som henter data fra forms-databasen, kjører gjennom saksbehandling og lagrer resultatet i en fil

## Installasjon

## Bruk - Modul

```javascript
'use strict';

var tfkSaksbehandler = require('tfk-saksbehandler');
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
```

## Bruk - cli

```sh
$ node cli.js <path-to-options-file>
```

Alternativt om den er installert globalt

```sh
$ tfk-saksbehandler <path-to-options-file>
```

### Optionsfil

.json-fil på dette formatet

**SAKSBEHANDLER** Node-modulen for saksbehandling
**DB** Databasekoblingen
**COLLECTION** MongoDB-collection
**FORM_ID** ID for skjemaet som skal hentes ut
**FORM_VERSION** Versjonsnummer for skjemaet
**OUT** Bane til katalogen hvor resultatet skal lagres

```javascript
{
  "SAKSBEHANDLER":"tfk-saksbehandling-skoleskyss",
  "DB":"mongodb://localhost:27017/tfk",
  "COLLECTION":"forms",
  "FORM_ID":"tkf-skoleskyss",
  "FORM_VERSION":"12.0.2",
  "OUT": "files"
}
```