
//mouse events
const onMouseMove = (e) => {
  if (mouseDraw) {
    const root = new Root(centerW - e.x, centerH - e.y, ctx);
    root.update();
  }
};
const onMouseDown = () => {
  colorPicker = (colorPicker + 1) % 4;
  ctx3.fillStyle = fillColors[colorPicker];
  ctx3.strokeStyle = strokeColors[colorPicker];
  mouseDraw = true;
};
const onMouseUp = () => {
  mouseDraw = false;
};
// touch based events
const onTouchStart = (e) => {
  const touches = e.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    colorPicker = (colorPicker + 1) % 4;
    ctx3.fillStyle = fillColors[colorPicker];
    ctx3.strokeStyle = strokeColors[colorPicker];
  }
  touchDraw = true;
};
const onTouchMove = (e) => {
  e.preventDefault();
  
  const touches = e.changedTouches;
  if (touchDraw) {
    for (let i = 0; i < touches.length; i++) {
      const root = new Root(touches[i].pageX - centerW, centerH - touches[i].pageY, ctx);
      root.update();
    }
  }
};
const onTouchEnd = (e) => {
  e.preventDefault();
  touchDraw = false;
};


const onClearCanvas = () => {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

const onResizeCanvas = () => {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  ctx2.canvas.width = window.innerWidth;
  centerH = Math.floor(canvas.height / 2);
  centerW = Math.floor(canvas.width / 2);
  ctx.translate(centerW, centerH);
}

const onResize = () => {
  onResizeCanvas();
  resizeStartButton();
};

const canvasEventListners = () => {
  canvas3.addEventListener("mousemove", onMouseMove);
  canvas3.addEventListener("mousedown", onMouseDown);
  canvas3.addEventListener("mouseup", onMouseUp);
  canvas3.addEventListener("touchmove", onTouchMove);
  canvas3.addEventListener("touchstart", onTouchStart);
  canvas3.addEventListener("touchend", onTouchEnd);
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
