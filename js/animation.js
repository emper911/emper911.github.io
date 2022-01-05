const rotater = (x, y, r) => {
  const rX = (x * Math.cos(r)) - (y * Math.sin(r));
  const rY = (x * Math.sin(r)) + (y * Math.cos(r));
  return { rX , rY };
}

const startAnimation = () => {
  MainVisual = new Visualizer(centerW, centerH);
  const mainLoop = new Tone.Loop((time) => {
    // use the time argument to schedule a callback with Draw
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const frequencies = getFFTValue();
      // console.log(frequencies)
      MainVisual.update(frequencies);
    }, time);
  }, "0.01");
  

  let angle = 0;
  let a = 100;
  let rotation = 0;
  Tone.Transport.scheduleRepeat(function(time){
    // console.log(0);
    angle = (angle + 0.01) % (Math.PI * 2);
    rotation = (rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleX	=	((a * Math.cos(angle)) /(1 + (Math.sin(angle)) ** 2));  
    const scaleY	=	((a * Math.sin(angle) * Math.cos(angle)) / (1 + (Math.sin(angle)) ** 2));
    const frequencies = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      const freqSorted = frequencies.sort();
      if ( freqSorted[0] > -150 && freqSorted[freqSorted.length - 1] > -20 ) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      else if (freqSorted[0] < -300 && freqSorted[freqSorted.length - 1] < -300) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleX * i);
        const y = centerH + (scaleY * i);
        const rotated = rotater(x, y, rotation);
        const particle = new Particle(rotated.rX, rotated.rY);
        ctx2.globalAlpha = 0.2;
        particle.update();
      }
    }, time);
  }, "0.01", "0:0:0", "8:0:0");

  Tone.Transport.scheduleRepeat(function(time){
    // console.log(1);
    angle = (angle + 0.01) % (Math.PI * 2);
    rotation = (rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleX	=	((a * Math.cos(angle)) /(1 + (Math.sin(angle)) ** 2));  
    const scaleY	=	((a * Math.sin(angle) * Math.cos(angle)) / (1 + (Math.sin(angle)) ** 2));
    const frequencies = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      const freqSorted = frequencies.sort();
      // console.log(freqSorted[freqSorted.length - 1]);
      // console.log(freqSorted[0]);
      if ( freqSorted[0] > -150 && freqSorted[freqSorted.length - 1] > -20 ) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      else if (freqSorted[0] < -300 && freqSorted[freqSorted.length - 1] < -300) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleX * i);
        const y = centerH + (scaleY * i);

        const particle = new Particle(x, y);
        particle.update();
      }
    }, time);
  }, "0.01", "8:0:0", "16:0:0");

  Tone.Transport.scheduleRepeat(function(time){
    // console.log(2);
    angle = (angle + 0.01) % (Math.PI * 2);
    rotation = (rotation + ((Math.PI) / 90)) % (Math.PI * 2);
    const scaleX	=	((a * Math.cos(angle)) /(1 + (Math.sin(angle)) ** 2));  
    const scaleY	=	((a * Math.sin(angle) * Math.cos(angle)) / (1 + (Math.sin(angle)) ** 2));
    const frequencies = getFFTValue();
    
    Tone.Draw.schedule(async () => {
      const freqSorted = frequencies.sort();
      // console.log(freqSorted[freqSorted.length - 1]);
      // console.log(freqSorted[0]);
      if ( freqSorted[0] > -150 && freqSorted[freqSorted.length - 1] > -20 ) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      else if (freqSorted[0] < -300 && freqSorted[freqSorted.length - 1] < -300) ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      for (let i = 0; i < 10; i++){
        await setTimeout(2)
        const x = centerW + (scaleY * i);
        const y = centerH + (scaleX * i);
        const rotated = rotater(x, y, rotation);
        const particle = new Particle(rotated.rX, rotated.rY);
        particle.update();
      }
    }, time);
  }, "0.01", "16:0:0", "39:4:4");

  var canvasColorsLoop = new Tone.Loop((time) => {
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      colorPicker = (colorPicker + 1) % fillColors.length;
      ctx.fillStyle = fillColors[colorPicker];
      ctx.strokeStyle = strokeColors[colorPicker];
    }, time);
  }, "8n");

  canvasColorsLoop.start(0);
  mainLoop.start(0);
}

