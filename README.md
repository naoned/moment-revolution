# moment-revolution

`moment-revolution` is a [moment](http://momentjs.com) plugin to display a date in the [French Republican Calendar](http://en.wikipedia.org/wiki/French_Republican_Calendar) format and to get Gregorian date from a Republican one.

```js
moment(new Date(1988, 2, 29).revolution().format(); // Nonidi 9 Germinal 196
moment('Nonidi 9 Germinal 196').gregorian().format(); // 29/3/1988
```

## Installation

`moment-revolution` is designed to work both using [node](http://nodejs.org) or in the browser.

### In the browser

```html
<script src="moment.js"></script>
<script src="moment-revolution.js"></script>
<script>
  ...
</script>
```

### With node
`moment-revolution`requires moment, but does not include it in its own dependencies, so you have to add it to your `package.json`file. However, you do not have to require it.

`npm install moment-revolution`

```js
var moment = require('moment-revolution');
...
```

## Usage
```js
var start = moment(new Date(1792, 8, 22));
var rev = start.revolution().format();
console.log(rev); // Primidi 1 Vendémiaire 1

start = 'Primidi 1 Vendémiaire 1';
var greg = moment().gregorian(start).format();
console.log(greg); // 22/9/1792

start = 'Jour de la Vertu An II';
greg = moment().gregorian(start).format();
console.log(greg); // 17/9/1794

// If a date is not valid in Republican, it'll returns NaN/NaN/NaN

```

## Dedication

This work is dedicated to Maximilien Marie Isidore de Robespierre.

## License

This program is in the public domain.
