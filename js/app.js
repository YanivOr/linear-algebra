const canvasWidth = window.innerWidth - 100;
const canvasHeight = window.innerHeight - 100;

let c, ctx;
let vectors = {};
let vectorCounter = 0;

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

/*****************************************************/
/*
const v = (x, y) => {
  const vectorName = `v${vectorCounter}`;
  vectors[vectorName] = new Vector(x, y, vectorName);
  vectorCounter++;
}

const remove = (v) => {
  delete vectors[v];
}

const add = (v0, v1) => {
  const x = v0.x + v1.x;
  const y = v0.y + v1.y;
  v(x, y);
}

const sub = (v0, v1) => {
  const x = v0.x - v1.x;
  const y = v0.y - v1.y;
  v(x, y);
}
*/