import { switchScene } from './app.js';

let analyser;

export async function setupAudio() {
  await Tone.start();
  new Tone.ToneAudioBuffer('../media/audio/shitsKindaNuts.3.m4a', async (audioBuffer) => {
    const player = new Tone.Player(audioBuffer)
      .toDestination();
    player.loop = true;
    player.autostart = false;

    analyser = new Tone.Analyser('fft', 512); // Fast Fourier Transform analyser
    player.connect(analyser); // Connect the player to the analyser

    const loopEnd = 167; // Length of the audio (in seconds)
    Tone.Transport.loopEnd = `${loopEnd}`; // Loop at the end of the track
    Tone.Transport.loop = true; // Enable transport looping
    
    // Schedule scene transitions
    Tone.Transport.schedule(() => switchScene('transition1', 'abrupt'), '32');
    Tone.Transport.schedule(() => switchScene('transition2', 'abrupt'), '39');
    Tone.Transport.schedule(() => switchScene('intro2', 'smooth'), '61');
    Tone.Transport.schedule(() => switchScene('mainSection', 'smooth'), '79');
    Tone.Transport.schedule(() => switchScene('transition3', 'smooth'), '115');
    Tone.Transport.schedule(() => switchScene('outro', 'smooth'), '124');
    player.start(0);
    Tone.Transport.start();
    
  });
};

export function getLowFrequency() {
  const frequencyData = analyser.getValue(); // Get audio frequency data
  const lowEnd = frequencyData.slice(0, frequencyData.length / 3); // Take lower third
  const sum = lowEnd.reduce((acc, val) => acc + Math.abs(val), 0);
  return sum / lowEnd.length;
}

export function getHighFrequency() {

}

export function getMidFrequency() {
  
}