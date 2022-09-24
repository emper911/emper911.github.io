/******************************/
/** Canvas and window Globals */
/******************************/
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
let centerH = Math.floor(ctx.canvas.height / 2);
let centerW = Math.floor(ctx.canvas.width / 2);
const mouse = {
  x: null,
  y: null,
  radius: 150,
};
window.addEventListener('mouseover', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
const particleArray = [];
const numParticles = 5000;


let img = new Image();
// img.src = '../files/P1000043.JPG';
// img.src = '../files/P1000831.JPG';
img.src = '../files/Noah\'s Land_Album_Art.png';
const drawScaledImage = () => {
  img.width = (isMobile()) ? img.naturalWidth * 0.75 : img.naturalWidth * 0.5;
  img.height = (isMobile()) ? img.naturalHeight * 0.75 : img.naturalHeight * 0.5;;
  const imgX = centerW - (img.width / 2);
  const imgY = centerH - (img.height / 2);
  ctx.drawImage(img, imgX, imgY, img.width, img.height );
}

img.addEventListener('load', () => {
  drawScaledImage();
  const init = () => {
    for (let y = 0; y < numParticles; y++) {
      particleArray.push(new Particle);
    }
  }
  init();
  const animate = () => {
  };


});

const grayScaleImage = (ctx) => {
  const scannedImage = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const scannedData = scannedImage.data;
  
  for (let i = 0; i < scannedData.length; i+=4) {
    const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
    const averageColorValue = total/3;
    scannedData[i] = averageColorValue;
    scannedData[i + 1] = averageColorValue;
    scannedData[i + 2] = averageColorValue;
  }
  scannedImage.data = scannedData;
  ctx.putImageData(scannedImage, canvas.width / 3, canvas.height / 4, remToPixels(40), remToPixels(30));
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.Width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
  }
  
  update() {
    this.y+= this.velocity;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


const onResizeCanvas = () => {
  ctx.save();
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.restore();
  centerH = Math.floor(ctx.canvas.height / 2);
  centerW = Math.floor(ctx.canvas.width / 2);
  drawScaledImage();
}
window.addEventListener("resize", () => {
  onResizeCanvas();
});

window.addEventListener("load", () => {
  onResizeCanvas();
});