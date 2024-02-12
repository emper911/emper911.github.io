function drawBackground(phase) {
  background(0, 3);
  let vol = audioInput.getLevel() * 4;
  spectrum = fft.analyze();
  let lowFreq = fft.getEnergy("bass");
  let midFreq = fft.getEnergy("mid");
  let highFreq = fft.getEnergy("treble");

  drawSky(vol, lowFreq, midFreq, highFreq);
  drawFloor();
}

function drawSky(vol, lowFreq, midFreq, highFreq) {
  drawStars(vol);
}

function drawStars(vol) {
  let diam = map(vol, 0, 0.3, 10, 80);
  fill(random(10, 255), random(10, 255), random(10, 255), random(10, 100));
  noStroke();
  let x = random(width);
  let y = random(height);
  ellipse(x, y, diam, diam);
}

function drawFloor() {
  const floorHeight = percentToPixels(2); // 2% of canvas height
  const floorY = windowHeight - floorHeight; // Y position of the floor

  fill(0); // Set color of floor. Change as needed.
  strokeWeight(1); // Set the stroke weight to 1 pixel
  line(0, floorY, windowWidth, floorY);

  // Reset stroke settings
  noStroke();

  rect(0, floorY, windowWidth, floorHeight);
}