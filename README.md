# Kukki

[![CI](https://badgen.net/github/checks/vanruesc/kukki/main)](https://github.com/vanruesc/kukki/actions)
[![Version](https://badgen.net/npm/v/kukki?color=green)](https://www.npmjs.com/package/kukki)
[![Dependencies](https://badgen.net/david/dep/vanruesc/kukki)](https://david-dm.org/vanruesc/kukki)

A static cookie manager that behaves like a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

*[Documentation](https://vanruesc.github.io/kukki)*


## Installation

```sh
npm install kukki
``` 


## Usage

```javascript
import { Kukki } from "kukki";

// Create a new cookie.
Kukki.set("key", "value");
Kukki.get("key"); // => "value"

// Create a persistent cookie.
const date = new Date();
date.setFullYear(date.getFullYear() + 2);
Kukki.set("persistentCookie", "persistentValue", { expires: date });
```


## Contributing

Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
