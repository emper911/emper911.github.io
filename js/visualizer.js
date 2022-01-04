class Visualizer {
  constructor(x, y, fftSize = FFT_SIZE) {
    this.x = x;
    this.y = y;
    this.fftSize = fftSize;
    this.freqBandArray = Array.from({length: fftSize}, (e, i) => (new frequencyDrawer(x, y, i)));
    this.update = this.update.bind(this);
  }

  update(frequencyArray) {
    for (let i = frequencyArray.length - 1; i >= 0; i--) {
      this.freqBandArray[i].update(Math.abs(frequencyArray[i]));      
    }
  }
}

class frequencyDrawer {
  constructor(x,y, iterator) {
    this.scale = (1 ** (iterator)) / 4
    // this.scale = 1 * (iterator + 1)
    this.x = x;
    this.y = y;
    this.update = this.update.bind(this);
    this.drawEllipse = this.drawEllipse.bind(this);
    this.drawSquare = this.drawSquare.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
  }

  update(decibel) {
    const db = decibel == Infinity ? 0: decibel * 3;
    const rx = db + this.scale;
    const ry = db + this.scale;
    this.colorUpdate(db);
    this.drawEllipse(rx, ry, db);
    // this.drawSquare(freq);
  }

  colorUpdate(db) {
    colorPicker = (colorPicker + 1) % fillColors.length;
    ctx.fillStyle = fillColors[colorPicker];
    ctx.strokeStyle = strokeColors[colorPicker];
    // changes based on db value
    ctx.lineWidth = 30 * (1700 / db ** (2));
  }

  drawEllipse(rx, ry, freq) {
    ctx.beginPath();
    ctx.ellipse(centerW, centerH, rx, ry, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  drawSquare(freq) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, freq * 2, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}


// function drawTriangle(x,y, scale) {
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x, 75);
//   ctx.lineTo(100, 25);
//   ctx.fill();
// }
// MainVisual = new Visualizer(centerH, centerW);