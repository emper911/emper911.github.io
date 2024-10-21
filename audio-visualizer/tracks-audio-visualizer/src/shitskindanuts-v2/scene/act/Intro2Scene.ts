import * as THREE from 'three';
import Scene from '../Scene'; // Import the base Scene class

class Intro2Scene extends Scene {
  constructor() {
    super(); // Call the base Scene constructor


    // Add lighting to the scene
    this.addLight(new THREE.DirectionalLight(0xffffff, 1));

    // Load the GLB model and manage animations
    this.loadGLBModel('ragdolldude', '/models/ragdolldude2.glb', 'walker');
  }

  // Override the update function for custom behavior
  update(deltaTime: number, audioData: Float32Array | Float32Array[] | undefined) {

  }
}

export default Intro2Scene;