// src/App.ts
import AudioManager from './features/audio/AudioManager';
import MidiManager from './features/midi/MidiManager';
import SceneManager from './features/scene/SceneManager';
import SettingsManager from './features/settings/SettingsManager';

export class App {
  private audioManager: AudioManager;
  private midiManager: MidiManager;
  private settingsManager: SettingsManager;
  private sceneManager: SceneManager;

  constructor() {
    this.settingsManager = SettingsManager.getInstance();
    this.audioManager = new AudioManager(this.settingsManager);
    this.midiManager = new MidiManager(this.settingsManager);
    this.sceneManager = new SceneManager(this.audioManager, this.midiManager);
  }

  public init() {
    // Handle Start button click
    const startButton = document.getElementById('startButton');
    const configModal = document.getElementById('configModal')!;
    const settingsForm = document.getElementById('settingsForm') as HTMLFormElement;

    if (startButton) {
      startButton.addEventListener('click', async () => {
        startButton.style.display = 'none';
        await this.startApplication();
      });
    }

    // Show configuration modal if needed
    // For simplicity, always show the modal after clicking start
    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.saveSettingsFromForm(settingsForm);
      configModal.style.display = 'none';
      await this.startApplication();
    });

    // Populate audio and MIDI input options
    this.populateAudioInputs();
    this.populateMidiInputs();
  }

  private async startApplication() {
    try {
      await this.settingsManager.loadSettings();
      await this.audioManager.setup();
      await this.midiManager.setup();
      this.sceneManager.setup();
      // Additional initialization as needed
    } catch (error) {
      console.error('Error initializing application:', error);
      // Handle errors and possibly show user notifications
    }
  }

  private async saveSettingsFromForm(form: HTMLFormElement) {
    const midiEnabled = (form.querySelector('#midiEnabled') as HTMLInputElement).checked;
    const audioInput = (form.querySelector('#audioInput') as HTMLSelectElement).value;
    const midiInput = (form.querySelector('#midiInput') as HTMLSelectElement).value;
    const midiChannelsElements = form.querySelectorAll('#midiChannels input[type="checkbox"]');
    const midiChannels: number[] = [];
    midiChannelsElements.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        midiChannels.push(parseInt((checkbox as HTMLInputElement).value));
      }
    });

    const newSettings = {
      midiEnabled,
      audioInput,
      midiInput,
      midiChannels
    };

    await this.settingsManager.saveSettings(newSettings);
  }

  private populateAudioInputs() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioSelect = document.getElementById('audioInput') as HTMLSelectElement;
      devices.forEach((device) => {
        if (device.kind === 'audioinput') {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.text = device.label || `Microphone ${audioSelect.length + 1}`;
          audioSelect.appendChild(option);
        }
      });
    }).catch((error) => {
      console.error('Error enumerating audio devices:', error);
    });
  }

  private populateMidiInputs() {
    // Assuming MidiVal can list available MIDI devices
    // You may need to adjust based on midival's API
    // For demonstration, we'll leave it static
    const midiSelect = document.getElementById('midiInput') as HTMLSelectElement;
    // Example static devices; replace with dynamic listing
    const devices = ['Digitakt', 'Syntakt']; // Replace with dynamic detection
    devices.forEach((device) => {
      const option = document.createElement('option');
      option.value = device;
      option.text = device;
      midiSelect.appendChild(option);
    });
  }
}