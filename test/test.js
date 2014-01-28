
if (typeof require === 'function') {
  var fc = require('../fc.js');
} else {

}

var ok = function(a) {
  if (!a) {
    throw new Error('not ok');
  }
};

describe('fc', function() {
  it('should create a canvas element on the body', function() {
    var ctx = fc(null, false);
    ok(document.body.lastChild.tagName.toLowerCase() === 'canvas');
  });

  it('should hang the canvas off of ctx', function() {
    var ctx = fc(null, false);
    ok(document.body.lastChild === ctx.canvas);
  });

  it('should callback with 0 delta time immediately when autorun is false', function(t) {
    var ctx = fc(function(delta) {
      delta = parseFloat(delta);
      ok(!isNaN(delta));
      ok(delta === 0);
      t();
    }, false);
  });

  it('should callback with delta time when dirtied', function(t) {
    var expect = 0;
    var ctx = fc(function(delta) {
      delta = parseFloat(delta);
      ok(!isNaN(delta));
      ok(delta >= expect);
      t();
    }, false);

    setTimeout(function() {
      expect = 29;
      ctx.dirty();
    }, 30)

  });

  describe('autorun', function() {
    it('should add a stop method to the ctx', function(t) {
      var val = 0

      var ctx = fc(function() {
        val++;
        ctx.stop(); 
        setTimeout(function() {
          ok(val === 1);
          t();
        }, 30);
      });
    });

    it('should add a start method to the ctx', function(t) {
      var val = 0

      var ctx = fc(function() {
        console.log('here?')
        val++;
        ctx.stop(); 
        setTimeout(function() {
          ok(val === 2);
          t();
        }, 30);
      }, false);

      setTimeout(function() {
        ok(val === 1);
        ctx.start();
      }, 30);
    });
  });

  describe('render when dirty', function(t) {
    it('should only request one frame per cycle', function(t) {
      var val = 0

      var ctx = fc(function() {
        val++;
      }, false);

      ctx.dirty();
      ctx.dirty();
      ctx.dirty();
      ctx.dirty();
      setTimeout(function() {
        ok(val === 2);
        t();
      }, 40);
    });
  });
});
