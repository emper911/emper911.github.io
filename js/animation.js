const startAnimation = () => {
  MainVisual = new Visualizer(centerH, centerW);
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
  
  let a = 2;
  let t = 0;
  var particleLoop = new Tone.Loop((time) => {
    t = (t + 100) % 2000;
    // const x	=	Math.abs((a * Math.cos(t)) /(1 + (Math.sin(t)) ** 2))
    // const y	=	Math.abs((a * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t)))
    const x = Math.abs(Math.sin(t) * a);
    const y = Math.abs(Math.cos(t) * a);
    console.log(x, y);
    // const particle = new Particle(centerW * x, centerH * y);
    // particle.update();
    // for (let i = 0; i < 10; i++){
    //   const root = new Root(x + centerW + i, y + centerH + i);
    //   root.update();
      // const particle = new Particle(centerW + x + i, centerH + y + i);
      // particle.update();
    // }
  }, "8n");

  var canvasColorsLoop = new Tone.Loop((time) => {
    Tone.Draw.schedule(() => {
      // do drawing or DOM manipulation here
      colorPicker = (colorPicker + 1) % fillColors.length;
      ctx.fillStyle = fillColors[colorPicker];
      ctx.strokeStyle = strokeColors[colorPicker];
    }, time);
  }, "8n");
  
  mainLoop.start(0);
  particleLoop.start(0)
  canvasColorsLoop.start(0);
}

