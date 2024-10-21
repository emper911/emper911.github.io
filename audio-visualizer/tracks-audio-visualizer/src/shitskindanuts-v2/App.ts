import SceneManager from './scene/SceneManager';
import AudioManager from './audio/AudioManager';
import sceneList from './scene/SceneList';

class App {
  audioManager: AudioManager;
  sceneManager: SceneManager;
  isPlaying: boolean;
  isRunning: boolean;
  constructor() {
    this.audioManager = new AudioManager('/audio/ShitsKindaNuts_MSTR.wav'); // AudioManager for audio handling
    this.sceneManager = new SceneManager(sceneList); // SceneManager to handle all scenes
    this.isPlaying = false; // State to track play/pause
    this.isRunning = false;
  }

  // Setup function to initialize the app
  async setup() {
    this.audioManager.setup(); // Set up the audio and scheduling
    this.sceneManager.setup();
  }

  // Start the audio and animation
  async start() {
    if (!this.isRunning) await this.setup();
    else this.audioManager.startAudio(); // Start audio playback
    this.isPlaying = true;
    this.animate(); // Start the animation loop
  }

  // Stop the audio and animation
  stop() {
    this.isPlaying = false;
    this.audioManager.stopAudio(); // Pause the audio transport
  }

  // Reset the app
  reset() {
    this.stop();
    this.sceneManager.resetScenes(); // Reset all scenes (you can implement specific logic)
    this.audioManager.resetAudio();  // Reset the audio playback state (if needed)
  }

  // Animation loop
  animate() {
    if (!this.isPlaying) return; // Stop if the app is paused

    requestAnimationFrame(() => this.animate());

    const deltaTime = this.sceneManager.getDeltaTime();
    const audioData = this.audioManager.getFrequencyData();
    // Update the current active scene
    this.sceneManager.update(deltaTime, audioData);
  }
}

let app: App | null = null;
const playButton: HTMLElement | null = document.getElementById('play-button')
const resetButton: HTMLElement | null = document.getElementById('reset-button')

playButton?.addEventListener('click', async () => {
  if (!app) {
    app = new App(); // Instantiate the app
    await app.start(); // Set up the app (scenes and audio)
    playButton.innerText = 'Pause'; // Change to pause
  } else if (!app.isPlaying) {
    playButton.innerText = 'Pause'; // Change to pause
    app.start(); // Start the audio and animation
  } else {
    playButton.innerText = 'Play'; // Change to play
    app.stop(); // Pause the audio and animation
  }
});

resetButton?.addEventListener('click', async () => {
  if (app) {
    if (playButton) playButton.innerText = 'Play'; // Change to play
    app.reset();
  }
});

window.addEventListener('resize', () => {
  if (app) {
    app.sceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
    app.sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
    app.sceneManager.camera.updateProjectionMatrix();
  }
});