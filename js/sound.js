const setupSong = () => {  
  player = new Tone.Player("files/beat3.3.mp3");
  player.autostart = true;
  player.sync();
  // allows for play pause
  // player.sync().start(0);
  // audio analysis
  fft = new Tone.FFT({
    size: FFT_SIZE
  });
  player.connect(fft);
  fft.connect(Tone.Destination);
};

const getFFTValue = () => {
  let data = null;
  if (fft) data = fft.getValue();
  return data;
}


// EVENTS
const onPlayPause = () => {
  const playPauseButton = document.getElementById("play-pause");
  if (player.state == "stopped" && player.loaded) {
    Tone.Transport.start();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'
  } else if (player.state == "started" && player.loaded) {
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'
    Tone.Transport.pause();
  }
};

const onStartToneJs = async () => {
  RUNNING = true;
  Tone = window.Tone;
  await Tone.start();
  setupSong();
  Tone.Transport.start();
  const startButton = document.getElementById("start");
  const playPauseButton = document.getElementById("play-pause");
  startButton.style.display = "none";
  playPauseButton.style.display = "block";
  startAnimation();
};

