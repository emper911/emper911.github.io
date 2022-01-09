const onResize = () => {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  ctx2.canvas.width = window.innerWidth;
  centerH = Math.floor(canvas.height / 2);
  centerW = Math.floor(canvas.width / 2);
  resizeStartButton();
};

const canvasEventListners = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
};

const buttonEventListners = () => {
  const startButton = document.getElementById("start");
  const muteButton = document.getElementById("mute");
  const playPauseButton = document.getElementById("play-pause");

  startButton.addEventListener("click", onStartToneJs);
  muteButton.addEventListener("click", toggleMute);
  playPauseButton.addEventListener("click", onPlayPause);
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
