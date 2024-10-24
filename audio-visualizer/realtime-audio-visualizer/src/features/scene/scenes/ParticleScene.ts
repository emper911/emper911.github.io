// src/scenes/ParticleScene.ts
import * as THREE from 'three';
import { SceneBase } from './SceneBase';
import { AnalyzedDataType } from '../types/audio';
import { MidiNoteOnType, MidiNoteOffType } from '../types/midi';

export class ParticleScene extends SceneBase {
  private particles: THREE.InstancedMesh;
  private particleCount: number = 1000;
  private dummy = new THREE.Object3D();

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    super(scene, camera);
  }

  protected initialize(): void {
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.particles = new THREE.InstancedMesh(geometry, material, this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      this.dummy.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      this.dummy.updateMatrix();
      this.particles.setMatrixAt(i, this.dummy.matrix);
    }

    this.scene.add(this.particles);
  }

  public updateAudio(data: AnalyzedDataType): void {
    // Update particles based on audio data
    const { low, mid, high, amplitude } = data;

    // Example: Adjust particle colors based on frequency bands
    const color = new THREE.Color(
      low / 255,
      mid / 255,
      high / 255
    );
    (this.particles.material as THREE.MeshBasicMaterial).color = color;

    // Example: Scale particles based on amplitude
    const scale = THREE.MathUtils.clamp(amplitude * 2, 0.5, 2);
    this.particles.scale.set(scale, scale, scale);
  }

  public updateMidiNoteOn(data: MidiNoteOnType): void {
    // Trigger animations or effects based on MIDI Note On
    console.log('MIDI Note On:', data);
    // Implement specific visual responses
  }

  public updateMidiNoteOff(data: MidiNoteOffType): void {
    // Handle MIDI Note Off if needed
    console.log('MIDI Note Off:', data);
    // Implement specific visual responses
  }

  public render(): void {
    // Any per-frame updates
    this.particles.rotation.y += 0.001;
  }

  public dispose(): void {
    this.scene.remove(this.particles);
    this.particles.geometry.dispose();
    (this.particles.material as THREE.Material).dispose();
  }
}