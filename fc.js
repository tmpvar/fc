var parseCssColor = require('csscolorparser');

// Fullscreen canvas
function fc(fn, autorun, dimensions) {
  document.body.style.margin = "0px";
  document.body.style.padding = "0px";

  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  var ctx;
  dimensions = dimensions || 2;

  if (dimensions === 2) {
    ctx = canvas.getContext('2d');
  } else if (dimensions === 3) {
    ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  }

  if (!ctx) {
    return;
  }

  var last = 0, dirty = false, request;

  function tick(time) {
    time = time || 0;
    var delta = time-last;
    last = time;
    canvas.width = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dimensions === 2 && ctx.save();
    fn && fn(delta);
    dimensions === 2 && ctx.restore();
    if (autorun !== false) {
      requestAnimationFrame(tick);
    }
    dirty = false;
  }

  if (dimensions === 2) {

    ctx.clear = function(color) {
      var orig = ctx.fillStyle;
      ctx.fillStyle = color || "#223";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = orig;
    };
  } else {
    ctx.clear = function(color) {
      var r = parseCssColor(color).map(function(c) {
        if (c > 1) {
          return c/255;
        }
      });

      ctx.clearColor(r[0], r[1], r[2], r[3]);
    };
  }


  setTimeout(tick, 0);

  ctx.dirty = function() {
    if (!dirty) {
      request = requestAnimationFrame(tick);
      dirty = true;
    }
  };

  ctx.stop = function() {
    autorun = false;
    dirty = false;
    request && cancelAnimcationFrame(request);
  };

  ctx.start = function() {
    autorun = true;
    requestAnimationFrame(tick);
  };

  (window.attachEvent || window.addEventListener)('resize', ctx.dirty);

  ctx.canvas = canvas;
  return ctx;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = fc;
}

if (typeof window !== 'undefined') {
  window.fc = window.fc || fc;
}
