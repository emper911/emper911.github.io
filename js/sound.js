let Tone;
let fft;

const playSong = () => {
    /** @type {HTMLAudioElement} */
    const sound = document.getElementById('sound1');
    // sound.crossOrigin = "anonymous";
    // /** @type {AudioNode} */
    // const soundAudioNode = Tone.context.createMediaElementSource(sound);
    // fft = new Tone.FFT({
    //   size: 32
    // });
    // soundAudioNode.connect(fft);
    // fft.connect(Tone.destination);
    sound.play();
};

const getFFTValue = () => {
  data = fft.getValue();
  console.log(data);
}



