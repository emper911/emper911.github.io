export interface MidiNoteOnType {
  note: number;
  velocity: number;
  channel: number;
  // Add additional properties as needed
}

export interface MidiNoteOffType {
  note: number;
  channel: number;
  // Add additional properties as needed
}