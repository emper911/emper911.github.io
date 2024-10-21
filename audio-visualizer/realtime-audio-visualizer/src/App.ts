// src/App.ts
import AudioManager from './features/audio/AudioManager';
import SceneManager from './features/scenes/SceneManager';
import MidiManager from './features/midi/MidiManager';

export class App {
  private audioManager: AudioManager;
  private sceneManager: SceneManager;
  private midiManager: MidiManager;
  private isPlaying: boolean;

  constructor() {
    this.audioManager = new AudioManager();
    this.sceneManager = new SceneManager();
    this.midiManager = new MidiManager();
    this.isPlaying = false;

    // Bind event listeners
    this.bindUIActions();
  }

  async setup(): Promise<void> {
    await this.audioManager.setup();
    await this.midiManager.setup();
    await this.sceneManager.setup();

    // Populate settings modal with available inputs

    // Listen for settings updates
    window.addEventListener('settingsUpdated', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      this.audioManager.setInputSource(detail.audioInput);
      this.midiManager.setInputSource(detail.midiInput);
    });

    this.animate();
  }

  private bindUIActions(): void {
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    const settingsButton = document.getElementById('settingsButton') as HTMLButtonElement;

    startButton.addEventListener('click', () => this.playPause());
    settingsButton.addEventListener('click', () => this.settingsModal.open());
  }

  private async playPause(): Promise<void> {
    if (this.isPlaying) {
      this.audioManager.stop();
      this.isPlaying = false;
      (document.getElementById('startButton') as HTMLButtonElement).innerText = 'Start';
    } else {
      await Tone.start(); // Necessary for some browsers to start audio
      this.audioManager.start();
      this.isPlaying = true;
      (document.getElementById('startButton') as HTMLButtonElement).innerText = 'Pause';
    }
  }

  private switchScene(sceneName: string): void {
    this.sceneManager.switchScene(sceneName);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    if (this.isPlaying) {
      const audioData = this.audioManager.getAudioData();
      const midiData = this.midiManager.getMidiData();
      this.sceneManager.update(audioData, midiData, currentTime);
    }
  }
}