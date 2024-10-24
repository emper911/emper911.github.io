// src/scenes/SceneBase.ts
import * as THREE from 'three';
import { AnalyzedDataType } from '../types/audio';
import { MidiNoteOnType, MidiNoteOffType } from '../types/midi';

export abstract class SceneBase {
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;
    this.initialize();
  }

  protected abstract initialize(): void;

  public abstract updateAudio(data: AnalyzedDataType): void;
  public abstract updateMidiNoteOn(data: MidiNoteOnType): void;
  public abstract updateMidiNoteOff(data: MidiNoteOffType): void;

  public abstract render(): void;

  public abstract dispose(): void;
}