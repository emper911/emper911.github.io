import * as THREE from 'three';
import Scene from '../Scene.js'; // Import the base Scene class

class OutroScene extends Scene {
  constructor() {
    super(); // Call the base Scene constructor

    // Set a dark background for the intro scene
    this.setBackgroundColor(0x000000);

    // Add lighting to the intro scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.addLight(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    this.addLight(directionalLight);

    // Create a rotating cube as an example object in the intro scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.addObject({ name: 'cube', model: this.cube }); // Add the cube to the scene
  }

  // Override the update function for custom behavior
  update(deltaTime, audioData) {
    super.update(deltaTime, audioData); // Call the base class update

    // Custom behavior: rotate the cube
    this.cube.rotation.x += deltaTime * 0.5;
    this.cube.rotation.y += deltaTime * 0.5;

    // Optionally: Add custom audio-reactive behavior (if audioData is provided)
    if (audioData) {
      const scaleFactor = 1 + (audioData[0] / 255) * 0.5;
      this.cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }
}

export default OutroScene;