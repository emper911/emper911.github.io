let Tone;
let actx, analyser, soundAudioNode;
// let fft, player;

const playSong = () => {
    /** @type {HTMLAudioElement} */
    const sound = document.getElementById('sound1');
    /** @type {AudioNode} */
    soundAudioNode = actx.createMediaElementSource(sound);
    /** @type {AnalyserNode} */
    analyser = new AnalyserNode(actx);
    analyser.fftSize = 32;
    analyser.connect(actx.destination);
    soundAudioNode.connect(analyser);
    
    sound.play();
    
    // player = new Tone.Player("https://github.com/emper911/emper911.github.io/raw/v2/files/beat3.3.mp3");
    // player.auto_start = true;
    // fft = new Tone.FFT({
    //   size: 32
    // });
    // // soundAudioNode.connect(fft);
    // player.connect(fft);
    // fft.connect(Tone.Destination);
};

const getFFTValue = () => {
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray)
  // data = fft.getValue();
  console.log(dataArray);
}



