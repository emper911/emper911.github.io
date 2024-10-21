import { MIDIVal, MIDIValInput } from "@midival/core";

class MidiManager {
  inputDevice: MIDIValInput | null;
  inputController: MIDIValInput | null;

  constructor() {
    this.inputDevice = null;
    this.inputController = null;
  }

  setup() {
    MIDIVal.connect()
    .then(access => {
      console.log("Input Devices", access.inputs);
      this.inputDevice = new MIDIValInput(access.inputs[0]);
      this.inputController = new MIDIValInput(access.inputs[0]);
    });
  }
}

export default MidiManager;