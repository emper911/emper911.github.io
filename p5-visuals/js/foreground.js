function drawForeground(phase) {
  drawPerson(phase);
}

function drawPerson(phase) {
  translate(6 * width / 7, height - percentToPixels(2));  // Position the figure at the center bottom of the
  strokeWeight(2); // set line thickness
  stroke(255, 255, 0); // set line color to black

  let bounce = sin(phase) * 3; // add a slight bounce to the figure's motion

  // Draw body (line from shoulder to hip)
  line(0, -50 + bounce, 0, -100 + bounce);
  
  // Draw neck (small line above shoulders)
  line(0, -100 + bounce, 0, -120 + bounce);

  // Draw head (circle above neck)
  fill(0);
  ellipse(0, -150 + bounce, 50, 50);
  
  // Draw arms with elbows
  drawLimb(0, -100 + bounce, phase + PI, PI / 10, true); // right arm
  drawLimb(0, -100 + bounce, phase, PI / 10, true); // left arm

  // Draw legs with knees
  drawLimb(0, -50 + bounce, phase + PI, PI / 12, false); // right leg
  drawLimb(0, -50 + bounce, phase, PI / 12, false); // left leg
}

function drawLimb(x, y, phase, amplitude, isArm) {
  push(); // start new drawing state
  translate(x, y); // translate to joint point
  rotate(sin(phase) * amplitude); // rotate limb
  line(0, 0, 0, 25); // draw first segment of limb
  translate(0, 25); // move to end of first segment

  if(isArm) {
    // For arms, only bend at the elbow when swinging forward
    rotate(max(sin(phase) * amplitude, radians(-3))); // rotate for "elbow"
  } else {
    // For legs, limit the rotation to 170 degrees
    rotate(min(sin(phase) * amplitude, radians(-2))); // rotate for "knee"
  }

  line(0, 0, 0, 25); // draw second segment of limb
  pop(); // discard drawing state
}
