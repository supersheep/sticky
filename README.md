# sticky [![NPM version](https://badge.fury.io/js/sticky.svg)](http://badge.fury.io/js/sticky) [![Build Status](https://travis-ci.org/supersheep/sticky.svg?branch=master)](https://travis-ci.org/supersheep/sticky) [![Dependency Status](https://gemnasium.com/supersheep/sticky.svg)](https://gemnasium.com/supersheep/sticky)

<!-- description -->

## Install

```bash
$ npm install sticky --save
```

## Usage

```js
var sticky = require('sticky');
sticky(element, offset);
sticky.on('fix',function(elem){
  ...
});
sticky.on('unfix',function(elem){
  ...
});
```

### sticky(elem, offset)
- elem: <String>|<DOMElement>
- offset
  - top <Number>
  - bottom <Number>

### Events
- fix
- unfix

## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->

