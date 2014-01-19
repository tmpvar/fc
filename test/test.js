
if (typeof require === 'function') {
  var fc = require('../fc.js');
} else {

}

var ok = function(a) {
  if (!a) {
    throw new Error('not ok')
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

  it('should callback with deltatime', function(t) {
    var ctx = fc(function(delta) {
      delta = parseFloat(delta);
      ok(!isNaN(delta));
      ok(delta>0);
      t();
    }, false);
    ctx.dirty();
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
          ok(val === 1);
          t();
        }, 30);
      }, false);

      setTimeout(function() {
        ok(val === 0);
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
        ok(val === 1);
        t();
      }, 40);
    });
  });
});
