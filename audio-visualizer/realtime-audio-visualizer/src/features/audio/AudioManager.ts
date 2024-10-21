import * as Tone from 'tone';

class AudioManager {
    private userMedia: Tone.UserMedia;
    private analyser: Tone.Analyser;
    private channels: Float32Array[];

    constructor() {
        this.userMedia = new Tone.UserMedia();
        this.analyser = new Tone.Analyser('fft', 1024);
        this.channels = [];
    }

    async setup(): Promise<void> {
        try {
            await this.userMedia.open(); // Prompt user for microphone access
            this.userMedia.connect(this.analyser);
        } catch (e) {
            console.error('Microphone access denied:', e);
        }
    }

    start(): void {
        Tone.getTransport().start();
        // this.userMedia.start();
    }

    stop(): void {
        Tone.getTransport().stop();
    }

    reset(): void {
        this.stop();
        this.init();
    }

    getAudioData(): Float32Array[] {
        this.channels = this.analyser.getValue() as Float32Array[];
        return this.channels;
    }
}

export default AudioManager;