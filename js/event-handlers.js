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

const onClearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvasEventListners = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
}

const buttonEventListners = () => {
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", onClearCanvas);
}

const initEventListners = () => {
  canvasEventListners();
  buttonEventListners();
}

initEventListners();