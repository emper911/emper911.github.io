import * as THREE from 'three';

import Scene from '../Scene.js'; // Import the base Scene class

class MainSectionScene extends Scene {
  constructor() {
    super(); // Call the base Scene constructor

    // Add lighting to the scene
    this.addLight(new THREE.DirectionalLight(0xffffff, 1));

    // Load the GLB model and manage animations
    this.loadGLBModel('ragdolldude', '/models/ragdolldude2.glb', 'walker');

    // Schedule custom scene actions relative to the global transport
    // this.scheduleSceneActions();
  }

  // Load the .glb model and set up animation


  // Schedule actions to trigger at specific points in the audio
  scheduleSceneActions() {
    // Example: Start some custom action at 60 seconds
    // Tone.getTransport().schedule((time) => {
    //   console.log('Custom action triggered at 60 seconds');
    //   // Perform any custom logic (e.g., start a specific animation)
    //   if (this.mixer) {
    //     const action = this.mixer.clipAction(gltf.animations[1]); // Example of switching animations
    //     action.play();
    //   }
    // }, '60'); // Trigger action at 60 seconds

    // Example: Trigger another event at 90 seconds
    // Tone.Transport.schedule((time) => {
    //   console.log('Custom action triggered at 90 seconds');
    //   // Custom logic (e.g., stop animation)
    //   if (this.mixer) {
    //     const action = this.mixer.clipAction(gltf.animations[0]); // Go back to the first animation
    //     action.stop();
    //   }
    // }, '90');
  }

  // Override update method for custom behavior
  update(deltaTime: number, audioData: Float32Array | Float32Array[] | number[] | undefined) {

    // Example: Make the object respond to audio frequencies
    if (audioData) {
      const scaleFactor = 1 + (audioData[0] / 255) * 2;
      this.objects[0].model.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }
}

export default MainSectionScene;