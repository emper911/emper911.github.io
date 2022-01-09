/******************************/
/** Canvas and window Globals */
/******************************/
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

const remToPixels = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
let centerH = Math.floor(canvas.height / 2);
let centerW = Math.floor(canvas.width / 2);