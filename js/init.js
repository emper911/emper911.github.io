// Canvas and window Globals
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

const fillColors = ['#9D0191', '#ffffff', '#FD3A69', '#FECD1A', '#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'];
const strokeColors = ['#FECD1A', '#FD3A69','#548CFF', '#93FFD8', '#CFFFDC', '#7900FF', '#120078', '#9D0191'];
// const fillColors = ['#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'];
// const strokeColors = ['#7900FF', '#548CFF', '#93FFD8', '#CFFFDC'].reverse();
// const fillColors = ['#120078','#9D0191','#FD3A69','#FECD1A']
// const strokeColors = ['#120078','#9D0191','#FD3A69','#FECD1A'].reverse()

function remToPixels(rem) {  
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
let centerH = Math.floor(canvas.height / 2) + (remToPixels(4) / 2);
let centerW = Math.floor(canvas.width / 2) + (remToPixels(4) / 2);

// Visual
let MainVisual;

// Audio Globals
let RUNNING = false;
let Tone;
let fft, player;
const FFT_SIZE = 2048;