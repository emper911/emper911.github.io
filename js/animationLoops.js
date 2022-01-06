class MainEqVisualLoop {
  constructor(interval, startTime = 0) {
    this.visualizer = new Visualizer(centerW, centerH);
    this.interval = interval;
    this.startTime = startTime;
    this.loopFunction = this.loopFunction.bind(this);
  }

  loopFunction(time) {
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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