class Visualizer {
  constructor(x, y, size = 1, fftSize = FFT_SIZE) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fftSize = fftSize;
    this.freqBandArray = Array.from({length: fftSize}, (e, i) => (new FrequencyDrawer(x, y, i, this.size)));
    this.update = this.update.bind(this);
  }

  update(frequencyArray) {
    for (let i = frequencyArray.length - 1; i >= 0; i--) {
      this.freqBandArray[i].update(Math.abs(frequencyArray[i]));      
    }
  }
}

class FrequencyDrawer {
  constructor(x,y, iterator, size = 1) {
    this.scale = (1 ** (iterator)) / 4;
    this.size = size;
    this.x = x;
    this.y = y;
    this.update = this.update.bind(this);
    this.drawEllipse = this.drawEllipse.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
  }

  update(decibel) {
    const db = decibel == Infinity || decibel < 15 ? 0: decibel * 3;
    const rx = (db + this.scale) / this.size;
    const ry = (db + this.scale) / this.size;
    this.colorUpdate(db);
    this.drawEllipse(rx, ry);
  }

  colorUpdate(db) {
    colorPicker = (colorPicker + 1) % fillColors.length;
    ctx.fillStyle = fillColors[colorPicker];
    ctx.strokeStyle = strokeColors[colorPicker];
    // changes based on db value
    ctx.lineWidth = 30 * (1700 / db ** (6/4));
  }

  drawEllipse(rx, ry) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, rx, ry, Math.PI * 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
