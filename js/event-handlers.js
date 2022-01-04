let draw = false;
let colorPicker = 0;

const onResize = () => {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  centerH = Math.floor(canvas.height / 2) + (remToPixels(4) / 2);
  centerW = Math.floor(canvas.width / 2) + (remToPixels(4) / 2);
};

const canvasEventListners = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
};

const buttonEventListners = () => {
  const startButton = document.getElementById("start");
  const playPauseButton = document.getElementById("play-pause");
  // const fftButton = document.getElementById("fft");
  const clearButton = document.getElementById("clear");

  startButton.addEventListener("click", onStartToneJs);
  playPauseButton.addEventListener("click", onPlayPause);
  // fftButton.addEventListener("click", () => getFFTValue());
  clearButton.addEventListener("click", onClearCanvas);
};

const initEventListners = () => {
  canvasEventListners();
  buttonEventListners();
  window.addEventListener('keyup', event => {
    if (event.code === 'Space' && !RUNNING) onStartToneJs();
    else if (event.code === 'Space') onPlayPause();
  })
  window.addEventListener("resize", onResize);
};

initEventListners();
