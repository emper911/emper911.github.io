/******************************/
/** Canvas and window Globals */
/******************************/
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
/** @type {HTMLCanvasElement} */
const canvas2 = document.getElementById("canvas2");
/** @type {HTMLCanvasElement} */
const canvas3 = document.getElementById("canvas3");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
/** @type {CanvasRenderingContext2D} */
const ctx2 = canvas2.getContext("2d");
/** @type {CanvasRenderingContext2D} */
const ctx3 = canvas3.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
ctx2.canvas.height = window.innerHeight;
ctx2.canvas.width = window.innerWidth;
ctx3.canvas.height = window.innerHeight;
ctx3.canvas.width = window.innerWidth;
let centerH = Math.floor(canvas.height / 2);
let centerW = Math.floor(canvas.width / 2);
ctx.translate(centerW, centerH);
ctx3.globalAlpha = 0.5
if (isMobile()) ctx.rotate(Math.PI/2);
// const fillColors = ['#9D0191', '#ffffff', '#FD3A69', '#FECD1A', '#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'];
// const strokeColors = ['#FECD1A', '#FD3A69','#548CFF', '#93FFD8', '#CFFFDC', '#7900FF', '#120078', '#9D0191'];
// earth tones
const fillColors = ['#876445', '#CA965C', '#EEC373', '#F4DFBA', '#D06224', '#AE431E', '#8A8635', '#E9C891'];
const strokeColors = fillColors.reverse();
// const fillColors = ['#9D0191', '#ffffff', '#FD3A69', '#FECD1A', '#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'];
// const strokeColors = ['#FECD1A', '#FD3A69','#548CFF', '#93FFD8', '#CFFFDC', '#7900FF', '#120078', '#9D0191'];
// const fillColors = ['#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'];
// const strokeColors = ['#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'].reverse();
// const fillColors = ['#120078','#9D0191','#FD3A69','#FECD1A']
// const strokeColors = ['#120078','#9D0191','#FD3A69','#FECD1A'].reverse()



const resizeStartButton = () => {
  const start = document.getElementById("start");
  start.style.top = `${(centerH - (remToPixels(4) / 2)).toString()}px`;
  start.style.left = `${(centerW - (remToPixels(4) / 2)).toString()}px`;
}
resizeStartButton();

/******************************/
/******* Audio Globals ********/
/******************************/
let RUNNING = false;
let Tone;
let fft, player, volume;
const FFT_SIZE = 32;

/******************************/
/******* Event Globals ********/
/******************************/
let mouseDraw = false;
let touchDraw = false;
let colorPicker = 0;