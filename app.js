let canvas = { cellRes: 10, size: 800, dom: null };

let grid, next, sum;
let rows = canvas.size / canvas.cellRes;
let cols = canvas.size / canvas.cellRes;

const create2DArray = (rows, cols) => {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
};

const loopThroughGrid = (rows, cols, callback) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      callback(i, j);
    }
  }
};

const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.querySelector('body').append(canvas);
  return canvas;
};

const drawCell = (grid, i, j) => {
  const ctx = canvas.dom.getContext('2d');

  if (grid[i][j] === 0) return;

  ctx.fillStyle = '#000000';
  ctx.fillRect(
    canvas.cellRes * j,
    canvas.cellRes * i,
    canvas.cellRes,
    canvas.cellRes
  );
};

const drawGrid = (grid) => {
  const ctx = canvas.dom.getContext('2d');
  ctx.clearRect(0, 0, canvas.size, canvas.size);

  loopThroughGrid(rows, cols, (i, j) => {
    drawCell(grid, i, j);
  });
};

const generate = () => {
  next = create2DArray(rows, cols);
  sum = create2DArray(rows, cols);

  loopThroughGrid(rows, cols, (i, j) => {
    let neighbors = 0;

    if (grid[i - 1]) neighbors += grid[i - 1][j]; // Top
    if (grid[i - 1] && grid[i - 1][j + 1]) neighbors += grid[i - 1][j + 1]; // Top Right
    if (grid[i][j + 1]) neighbors += grid[i][j + 1]; // Right
    if (grid[i + 1] && grid[i + 1][j + 1]) neighbors += grid[i + 1][j + 1]; // Bottom Right
    if (grid[i + 1]) neighbors += grid[i + 1][j]; // Bottom
    if (grid[i + 1] && grid[i + 1][j - 1]) neighbors += grid[i + 1][j - 1]; // Bottom Left
    if (grid[i][j - 1]) neighbors += grid[i][j - 1]; // Left
    if (grid[i - 1] && grid[i - 1][j - 1]) neighbors += grid[i - 1][j - 1]; // Top Left

    let state = grid[i][j];

    if (state === 0 && neighbors === 3) {
      state = 1;
    } else if (state === 1 && (neighbors === 2 || neighbors === 3)) {
      state = 1;
    } else {
      state = 0;
    }

    sum[i][j] = neighbors;
    next[i][j] = state;
  });

  drawGrid(next);

  grid = next;

  setTimeout(generate, 500);
};

const init = () => {
  canvas.dom = createCanvas(canvas.size, canvas.size);
  grid = create2DArray(rows, cols);

  loopThroughGrid(rows, cols, (i, j) => {
    grid[i][j] = Math.floor(Math.random() * 2);
  });

  drawGrid(grid);

  setTimeout(generate, 500);
};

init();
