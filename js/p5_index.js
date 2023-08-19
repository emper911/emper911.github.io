// Constants
const DEFAULT_SOURCE = "BlackHole 2ch (Virtual)";
const WALKING_SPEED = (Math.PI * 2) / 180;
const FLOOR_HEIGHT = 2; // 2% is the height
// Global Variables
let audioInput; // declare audioInput variable
let spectrum;
let cnv;
let startButton;
let audioStarted = false;
let audioSourceId;
let phase = 0;


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  setupAudio();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (audioStarted) drawFrame();
}

function drawFrame() {
  drawBackground(phase);
  drawForeground(phase);
  
  phase += WALKING_SPEED; // Adjust this for speed of walking
}

