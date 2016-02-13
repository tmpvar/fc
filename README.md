## fc

AKA: fullscreen canvas

### Install

`npm install fc` or use the `fc.min.js` file.

### Use

```javascript

var ctx = fc(function(deltaTime) {
  
  // render stuff into ctx
  // `this` is also ctx for ease of use

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

// only render when dirtied

var ctx = fc(function(deltaTime) {}, false);

// get the current 3x3 transformation matrix (2d only)

var ctx = fc(function() {
    ctx.translate(10, 100)
    console.log(ctx.getTransform())
})

// transform a point from screen to world space

var ctx = fc(function() {
    ctx.translate(10, 100)
    var incoming = [10, 10] // could be a the mouse pos or similar
    var result = [0, 0]
    ctx.pointToWorld(result, incoming) // project the point into the world
    console.log(result)
})

```

__note__: fc will render one time even if `autorun` is set false.  During this initial render `deltaTime` will be 0

## License

MIT (see license.txt)
