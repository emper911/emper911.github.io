let draw = false;
let colorPicker = 0;

const onMouseMove = (e) => {
  if (draw) {
    const root = new Root(e.x, e.y);
    root.update();
  }
};

const onMouseDown = () => {
  colorPicker = (colorPicker + 1) % 4;
  console.log(colorPicker)
  ctx.fillStyle = fillColors[colorPicker];
  ctx.strokeStyle = strokeColors[colorPicker];
  draw = true;
};
const onMouseUp = () => {
  draw = false;
};

const onStartToneJs = async () => {
  actx = new AudioContext();
  if (actx.state === 'suspended') {
    actx.resume();
  }
  // Tone = window.Tone;
  // await Tone.start();
  playSong();
  const startButton = document.getElementById("start");
  const clearButton = document.getElementById("clear");
  startButton.style.display = "none";
  clearButton.style.display = "block";
}

const onClearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvasEventListners = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
}

const buttonEventListners = () => {
  const startButton = document.getElementById("start");
  const fftButton = document.getElementById("fft");
  const clearButton = document.getElementById("clear");

  startButton.addEventListener("click", onStartToneJs);
  fftButton.addEventListener("click", () => getFFTValue());
  clearButton.addEventListener("click", onClearCanvas);
};

const initEventListners = () => {
  canvasEventListners();
  buttonEventListners();
};

initEventListners();