import * as THREE from 'three';
import Scene, { GLTFObj } from '../Scene.js'; // Import the base Scene class

class Transition2Scene extends Scene {
  ragdoll: GLTFObj | undefined;
  constructor() {
    super(); // Call the base Scene constructor

    // Set a dark background for the intro scene
    // Add lighting to the scene
    this.addLight(new THREE.DirectionalLight(0xffffff, 1));
    this.loadGLBModel('ragdolldude', '/models/ragdolldude2.glb', 'dancedance');
    
  }

  // Override the update function for custom behavior
  update(deltaTime: number, audioData: Float32Array | Float32Array[] | undefined) {

  }
}

export default Transition2Scene;