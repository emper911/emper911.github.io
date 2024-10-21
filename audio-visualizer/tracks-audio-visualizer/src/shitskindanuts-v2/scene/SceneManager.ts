import * as THREE from 'three';
import * as Tone from 'tone';
import { SceneObj } from './SceneList';
import Scene from './Scene';

class SceneManager {
  clock: THREE.Clock;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scenes: { [key: string]: Scene};
  activeScene: Scene;
  sceneList: SceneObj[];
  crossfadeActive: any;
  crossfadeFactor!: number | 1;
  currentScene: any;
  nextScene: Scene;
  transitionSpeed!: number | 1;

  constructor(sceneList: SceneObj[]) {
    this.clock = new THREE.Clock(); // For deltaTime calculation
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 20);
    this.camera.lookAt(0, 5, 0);
    // Renderer, camera, and light setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000); // Start with black background
    document.getElementById('container')?.appendChild(this.renderer.domElement);
    this.scenes = {}; // Map scene names to Scene objects
    this.sceneList = sceneList;
    this.activeScene = this.sceneList[0].scene;
    this.nextScene = this.sceneList[1].scene;
    // Initialize scenes from the scenesList
    sceneList.forEach(({ name, scene }: SceneObj) => {
      this.scenes[name] = scene;
      scene.setCamera(this.camera);
    });
  }

  async setup() {
    // Schedule scene transitions based on the audio timeline
    this.sceneList.forEach(async (scene: SceneObj) => {
      await scene.scene.setup();
      Tone.getTransport().schedule(() => this.switchScene(scene.name, scene.transitionType), scene.scheduledTime);
    });
  }

  // Update the currently active scene
  update(deltaTime: number, audioData: Float32Array[] | Float32Array | undefined) {
    if (this.crossfadeActive) {
      this.updateCrossfade(deltaTime);
    } else if (this.activeScene) {
      this.activeScene.update(deltaTime, audioData); // Delegate the update to the active Scene
    }
    this.renderer.render(this.activeScene.getThreeScene(), this.camera)

  }

  getDeltaTime(): number {
    return this.clock.getDelta();
  }
  
  // Crossfade between two scenes over time
  crossfadeScenes(currentScene: Scene, newScene: Scene, transitionSpeed = 1) {
    this.crossfadeActive = true; // Start crossfade process
    this.crossfadeFactor = 0; // Reset crossfade factor
    this.currentScene = currentScene; // Scene we are transitioning from
    this.nextScene = newScene; // Scene we are transitioning to
    this.transitionSpeed = transitionSpeed; // Set transition speed
  }

  // Update crossfade effect in the main update loop
  updateCrossfade(deltaTime: number) {
    // Increase the crossfade factor based on the transition speed
    this.crossfadeFactor += deltaTime / this.transitionSpeed;
    this.crossfadeFactor = Math.min(this.crossfadeFactor, 1); // Clamp it to 1 (100% crossfade)

    // Render the current scene fading out and the new scene fading in
    this.renderer.autoClear = false;
    this.renderer.clear();

    // Fade out the current scene
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(0x000000, 1 - this.crossfadeFactor); // Fade out current scene
    this.renderer.render(this.currentScene.getThreeScene(), this.camera);

    // Fade in the new scene
    this.renderer.setClearColor(0x000000, this.crossfadeFactor); // Fade in new scene
    this.renderer.render(this.nextScene.getThreeScene(), this.camera);

    // If the crossfade is complete, switch to the new scene and stop the crossfade process
    if (this.crossfadeFactor >= 1) {
      this.activeScene = this.nextScene;
      this.crossfadeActive = false; // End crossfade
      this.currentScene = null;
      this.nextScene = this.activeScene;
    }
  }

  // Switch scenes
  switchScene(sceneName: string, transitionType = 'abrupt', transitionSpeed = 1) {
    console.log(sceneName);
    const newScene = this.scenes[sceneName];
    if (!newScene) {
      console.error(`Scene ${sceneName} not found`);
      return;
    }

    if (transitionType === 'smooth') {
      this.crossfadeScenes(this.activeScene, newScene, transitionSpeed);
    } else {
      this.abruptSwitch(newScene);
    }
  }

  // Handle abrupt scene switch (instant transition)
  abruptSwitch(newScene: Scene) {
    this.activeScene = newScene;
  }

  // Reset scenes (if needed)
  async resetScenes() {
    this.activeScene = this.sceneList[0].scene; // Reset to the initial scene
    await this.activeScene.setup();
  }

  // Get the currently active scene for rendering
  getActiveScene() {
    return this.activeScene ? this.activeScene : null;
  }
}

export default SceneManager;