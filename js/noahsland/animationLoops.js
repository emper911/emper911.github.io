class MainEqVisualLoop {
  constructor(interval, startTime = 0) {
    const visualizerSize = isMobile() ? 2 : 1;
    // const visualizerSize = 1;
    this.visualizer = new Visualizer(0, 0, visualizerSize);
    this.interval = interval;
    this.startTime = startTime;
    this.loopFunction = this.loopFunction.bind(this);
  }

  loopFunction(time) {
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      ctx.save();
      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Restore the transform
      ctx.restore();
      const frequencies = getFFTValue();
      this.visualizer.update(frequencies);
    }, time);
  }
}

class CanvasColorsLoop {
  constructor(interval, startTime = 0) {
    this.interval = interval;
    this.startTime = startTime;
    this.loopFunction = this.loopFunction.bind(this);
  }

  loopFunction(time) {
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      colorPicker = (colorPicker + 1) % fillColors.length;
      ctx.fillStyle = fillColors[colorPicker];
      ctx2.fillStyle = fillColors[colorPicker];
      ctx.strokeStyle = strokeColors[colorPicker];
      ctx2.strokeStyle = strokeColors[colorPicker];
    }, time);
  }
}