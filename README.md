## fc

AKA: fullscreen canvas

### Install

`npm install fc` or use the `fc.min.js` file.

### Use

```javascript

var ctx = fc(function() {
  
  // render stuff into ctx

});

// put the canvas into a "render only when dirty" mode

ctx.stop();

// to schedule a new frame

ctx.dirty();

// subsequent calls to dirty in the same tick will have no effect

ctx.dirty();

// to restart the auto-render mode

ctx.start();

// to fill the entire canvas with a color

ctx.clear('red');

// last but not least, to access the canvas

ctx.canvas

```

## License

MIT (see license.txt)