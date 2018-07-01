# Kukki

[![Build status](https://travis-ci.org/vanruesc/kukki.svg?branch=master)](https://travis-ci.org/vanruesc/kukki) 
[![npm version](https://badge.fury.io/js/kukki.svg)](http://badge.fury.io/js/kukki) 
[![Dependencies](https://david-dm.org/vanruesc/kukki.svg?branch=master)](https://david-dm.org/vanruesc/kukki)

A static cookie manager that behaves like a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

*[API Reference](https://vanruesc.github.io/kukki/docs)*


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

Please refer to the [contribution guidelines](https://github.com/vanruesc/kukki/blob/master/.github/CONTRIBUTING.md) for details.
