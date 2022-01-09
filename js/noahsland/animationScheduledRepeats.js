class BgScene1 {
  constructor(interval, startTime, endTime, context, angle = 0, a = 100, rotation = 0, rotation2 = Math.PI * 2) {
    this.interval = interval;
    this.startTime = startTime;
    this.endTime = endTime;
    this.ctx = context;
    this.started = false;

    this.angle = angle;
    this.a = a;
    this.rotation = rotation;
    this.rotation2 = rotation2;

    this.scheduleRepeatFunction = this.scheduleRepeatFunction.bind(this);
  }

  scheduleRepeatFunction(time) {
    if(!this.started) {
      console.log('bg-1');
      this.started = true;
    }
    this.angle = (this.angle + 0.01) % (Math.PI * 2);
    this.rotation = (this.rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    this.rotation2 = (this.rotation2 - ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleY	=	((this.a * Math.sin(this.angle) * Math.cos(this.angle)) / (1 + (Math.sin(this.angle)) ** 2));
    const scaleX	=	((this.a * Math.cos(this.angle)) /(1 + (Math.sin(this.angle)) ** 2));  
    const frequencies = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      const freqSorted = frequencies.sort();
      if ( freqSorted[0] > -140 && freqSorted[freqSorted.length - 1] > -19.5 ) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      } else if (freqSorted[0] < -300 && freqSorted[freqSorted.length - 1] < -300) this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleX * i);
        const y = centerH + (scaleY * i);
        const {rX, rY} = rotater(x, y, this.rotation);
        // const rotated2 = rotater(x, y, rotation);
        this.ctx.globalAlpha = 0.2;
        this.ctx.lineWidth = 1;
        const particle = new Particle(rX, rY, this.ctx);
        // const particle = new Lines(rX, rY, ctx2);
        // const particle2 = new Lines(rotated2.rX, rotated2.rY, ctx2, true);
        this.ctx.strokeStyle = "#ffffff";
        particle.update();
        // particle2.update();
      }
    }, time);
  }
}


class BgScene2 {
  constructor(interval, startTime, endTime, context, angle = 0, a = 200, rotation = 0, rotation2 = Math.PI * 2) {
    this.interval = interval;
    this.startTime = startTime;
    this.endTime = endTime;
    this.ctx = context;

    this.angle = angle;
    this.a = a;
    this.n = 10;
    this.rotation = rotation;
    this.rotation2 = rotation2;
    this.started = false;

    this.scheduleRepeatFunction = this.scheduleRepeatFunction.bind(this);
  }
  
  scheduleRepeatFunction(time) {
    if (!this.started) {
      console.log('bg-2');
      this.started = true;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    this.angle = (this.angle + 0.01) % (Math.PI * 2);
    this.rotation = (this.rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    this.rotation2 = (this.rotation2 + ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleX = this.a * Math.cos(this.angle * this.n);
    const scaleY = this.a * Math.cos(this.angle * this.n);
    const freq = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleX * i);
        const y = centerH + (scaleY * i);
        const rotated1 = rotater(x, y, this.rotation);
        const rotated2 = rotater(x, y, this.rotation2);

        this.ctx.globalAlpha = 0.2;
        this.ctx.lineWidth = 1;
        const linesScaled = new Lines(rotated1.rX, rotated1.rY, this.ctx);
        linesScaled.update();
        const linesScaled2 = new Lines(rotated1.rX, rotated1.rY, this.ctx, true);
        linesScaled2.update();
        const linesScaled3 = new QuadLine(rotated2.rX, rotated2.rY, this.ctx);
        linesScaled3.update();
        const linesScaled4 = new QuadLine(rotated2.rX, rotated2.rY, this.ctx, true);
        linesScaled4.update();
      }
    }, time);
  }
}


class BgScene3 {
  constructor(interval, startTime, endTime, context, angle = 0, a = 100, rotation = 0, rotation2 = Math.PI * 2) {
    this.interval = interval;
    this.startTime = startTime;
    this.endTime = endTime;
    this.ctx = context;
    this.started = false;

    this.angle = angle;
    this.a = a;
    this.rotation = rotation;
    this.rotation2 = rotation2;
    this.scheduleRepeatFunction = this.scheduleRepeatFunction.bind(this);
  }
  
  scheduleRepeatFunction(time) {
    if (!this.started) {
      console.log('bg-3');
      this.started = true;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    this.angle = (this.angle + 0.01) % (Math.PI * 2);
    this.rotation = (this.rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleX	=	((this.a * Math.cos(this.angle)) /(1 + (Math.sin(this.angle)) ** 2));  
    const scaleY	=	((this.a * Math.sin(this.angle) * Math.cos(this.angle)) / (1 + (Math.sin(this.angle)) ** 2));
    const frequencies = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      const freqSorted = frequencies.sort();
      if ( freqSorted[0] > -140 && freqSorted[freqSorted.length - 1] > -19.5 ) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      } else if (freqSorted[0] < -300 && freqSorted[freqSorted.length - 1] < -300) this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleY * i);
        const y = centerH + (scaleX * i);
        const {rX, rY} = rotater(x, y, this.rotation);
        this.ctx.globalAlpha = 0.2;
        this.ctx.lineWidth = 1;
        const particle = new Particle(rX, rY, this.ctx);
        particle.update();
        const particle2 = new Particle(rY, rX, this.ctx);
        particle2.update();
      }
    }, time);
  }
}