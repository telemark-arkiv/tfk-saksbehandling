# tfk-saksbehandling

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-saksbehandling.svg)](https://greenkeeper.io/)
Node modul som henter data fra forms-databasen og kjører gjennom en saksbehandlingsmodul

## Installasjon
Fra GitHub

```sh
$ git clone git@github.com:telemark/tfk-saksbehandling.git
```

cd inn i katalogen og kjør setupscriptet.

```sh
$ npm run setup
```

## Bruk - Modul

```javascript
'use strict';

var tfkSaksbehandler = require('tfk-saksbehandler');
var options = {
  {
    "SAKSBEHANDLER":"tfk-saksbehandling-skoleskyss",
    "DB":"mongodb://localhost:27017/tfk",
    "COLLECTION":"forms",
    "FORM_ID":"tkf-skoleskyss",
    "FORM_VERSION":"13.0.3",
    "SAKSBEHANDLER_OPTIONS": {
      "saveFileToPath": "files",
      "dsfConnectionConfig": {
        "url": "http://ws-test.infotorg.no/xml/ErgoGroup/DetSentraleFolkeregister1_4/2011-09-26/DetSentraleFolkeregister1_4.wsdl",
        "namespaceBrukersesjon": "http://ws.infotorg.no/xml/Admin/Brukersesjon/2006-07-07/Brukersesjon.xsd",
        "distribusjonskanal": "PTP",
        "systemnavn": "Systemnavn",
        "brukernavn": "brukernavn",
        "passord": "passord"
      }
    }
  }
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

**SAKSBEHANDLER_OPTIONS** Ekstra options for ulike saksbehandlingsmoduler

```javascript
{
  "SAKSBEHANDLER":"tfk-saksbehandling-skoleskyss",
  "DB":"mongodb://localhost:27017/tfk",
  "COLLECTION":"forms",
  "FORM_ID":"tkf-skoleskyss",
  "FORM_VERSION":"13.0.3",
  "SAKSBEHANDLER_OPTIONS": {
    "saveFileToPath": "files",
    "dsfConnectionConfig": {
      "url": "http://ws-test.infotorg.no/xml/ErgoGroup/DetSentraleFolkeregister1_4/2011-09-26/DetSentraleFolkeregister1_4.wsdl",
      "namespaceBrukersesjon": "http://ws.infotorg.no/xml/Admin/Brukersesjon/2006-07-07/Brukersesjon.xsd",
      "distribusjonskanal": "PTP",
      "systemnavn": "Systemnavn",
      "brukernavn": "brukernavn",
      "passord": "passord"
    }
  }
}
```