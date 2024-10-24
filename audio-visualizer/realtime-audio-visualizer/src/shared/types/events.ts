// src/types/events.ts
import { AnalyzedDataType } from '../../features/audio/Audio';
import { MidiNoteOnType, MidiNoteOffType } from '../../features/midi/Midi';
import { SettingsType } from '../../features/settings/Settings';

export type Events = {
  audioAnalyzed: AnalyzedDataType;
  midiNoteOn: MidiNoteOnType;
  midiNoteOff: MidiNoteOffType;
  settingsUpdated: SettingsType;
  // Add other events as needed
};