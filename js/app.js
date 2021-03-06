const canvasWidth = window.innerWidth - 100;
const canvasHeight = window.innerHeight - 100;

let c, ctx, input, output;
let vectors = {};

const createCanvas = () => {
  c = document.createElement('canvas');
  c.setAttribute('width', `${canvasWidth}px`);
  c.setAttribute('height', `${canvasHeight}px`);
  ctx = c.getContext('2d');
  document.getElementById('container').appendChild(c);
}

clearCanvas = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Loop
const loop = () => {
  clearCanvas();
  new Grid();
  new InfoLayout();

  for (const v in vectors) {
    if (vectors.hasOwnProperty(v)) {
      vectors[v].draw();
    }
  }
}

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  createCanvas();
  loop();
  setInterval(loop, 500);
})
