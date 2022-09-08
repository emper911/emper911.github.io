const setupSong = () => {
  player = new Tone.Player("../../files/1_Noah'sLand_Master.mp3");
  player.autostart = true;
  player.sync();
  // audio analysis
  fft = new Tone.FFT({
    size: FFT_SIZE
  });
  vol = new Tone.Volume(-1.0);
  player.connect(fft);
  fft.connect(vol);
  vol.connect(Tone.Destination);
};

const getFFTValue = () => {
  let data = null;
  if (fft) data = fft.getValue();
  return data;
};


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

const toggleMute = () => {
  vol.mute = !vol.mute;
  muteButton = document.getElementById("mute");
  if (vol.mute) muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
  else muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
};

const onStartToneJs = async () => {
  RUNNING = true;
  Tone = window.Tone;
  await Tone.start();
  setupSong();
  Tone.Transport.start();
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "75:0:0";
  const startButton = document.getElementById("start");
  const muteButton = document.getElementById("mute");
  const playPauseButton = document.getElementById("play-pause");
  startButton.style.display = "none";
  playPauseButton.style.display = "block";
  muteButton.style.display = "block";
  startAnimation();
};

