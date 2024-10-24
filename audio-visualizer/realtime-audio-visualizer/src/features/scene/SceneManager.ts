// src/managers/SceneManager.ts
import * as THREE from 'three';
import emitter from '../../shared/utils/EventBus';
import { AnalyzedDataType } from '../audio/Audio';
import { MidiNoteOnType, MidiNoteOffType } from '../midi/Midi';
import { SceneBase } from './SceneBase';
import { ParticleScene } from './scenes/ParticleScene';

export class SceneManager {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private currentScene: SceneBase;
  private animationId: number | null = null;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('app')?.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.scene = new THREE.Scene();

    // Initialize with ParticleScene
    this.currentScene = new ParticleScene(this.scene, this.camera);
  }

  public setup() {
    // Subscribe to audio and MIDI events
    emitter.on('audioAnalyzed', this.handleAudioData);
    emitter.on('midiNoteOn', this.handleMidiNoteOn);
    emitter.on('midiNoteOff', this.handleMidiNoteOff);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize);

    // Start rendering loop
    this.render();
  }

  private handleAudioData = (data: AnalyzedDataType) => {
    this.currentScene.updateAudio(data);
  };

  private handleMidiNoteOn = (data: MidiNoteOnType) => {
    this.currentScene.updateMidiNoteOn(data);
  };

  private handleMidiNoteOff = (data: MidiNoteOffType) => {
    this.currentScene.updateMidiNoteOff(data);
  };

  private render = () => {
    this.animationId = requestAnimationFrame(this.render);
    this.currentScene.render();
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    emitter.off('audioAnalyzed', this.handleAudioData);
    emitter.off('midiNoteOn', this.handleMidiNoteOn);
    emitter.off('midiNoteOff', this.handleMidiNoteOff);
    window.removeEventListener('resize', this.onWindowResize);
    this.renderer.dispose();
    this.currentScene.dispose();
  }
}

export default SceneManager;