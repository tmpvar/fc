// Fullscreen canvas
function fc(fn, autorun) {
  document.body.style.margin = "0px";
  document.body.style.padding = "0px";

  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var last = 0, dirty = false, request;
  
  function tick(time) {
    var delta = time-last;
    last = time;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#223";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    fn && fn(delta);
    ctx.restore();
    if (autorun !== false) {
      requestAnimationFrame(tick);
    }
    dirty = false;
  }

  autorun !== false && requestAnimationFrame(tick);

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

  ctx.canvas = canvas;
  return ctx;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = fc;
}

if (typeof window !== 'undefined') {
  window.fc = window.fc || fc;
}