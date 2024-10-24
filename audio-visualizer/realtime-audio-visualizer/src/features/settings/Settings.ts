export interface SettingsType {
  midiEnabled: boolean;
  audioInput: string;
  midiInput: string; // "all" or specific device name
  midiChannels: number[];
  // Add additional settings as needed
}