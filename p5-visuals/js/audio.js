function setupAudio() {
  getAudioContext().suspend();
  audioInput = new p5.AudioIn(); // create a new AudioIn object
  fft = new p5.FFT();
  startButton = createButton('Start');
  startButton.mousePressed(startAudio); // when button is clicked, startAudio is called
  startButton.position(windowWidth / 2 - startButton.width / 2, windowHeight / 2 - startButton.height / 2); // position button at the center
  
  audioInput.getSources().then(gotSources);
}


function startAudio() {
  userStartAudio();
  audioInput.start(() => {
    audioInput.setSource(audioSourceId);
    fft.setInput(audioInput);
    audioStarted = true;
  }); // start capturing audio
  startButton.remove(); // remove the start button
}

function gotSources(deviceList) {
  if (deviceList.length > 0) {
    //set the source to the first item in the deviceList array
    audioSourceId = deviceList.findIndex(x => x.label === DEFAULT_SOURCE)
  }
}