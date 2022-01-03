/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

const fillColors = ['#9D0191', '#120078', '#FD3A69', '#FECD1A'];
const strokeColors = ['#FECD1A', '#FD3A69', '#120078', '#9D0191'];
// ctx.fillStyle = '#FECD1A';
// ctx.strokeStyle = '#FD3A69';

function remToPixels(rem) {  
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
const centerH = Math.floor(canvas.height / 2) + (remToPixels(4) / 2);
const centerW = Math.floor(canvas.width / 2) + (remToPixels(4) / 2);