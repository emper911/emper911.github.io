import * as THREE from 'three';
import * as Tone from 'tone';
import { setupAudio } from './audio.js';
import { intro } from './scenes/intro.js';
import { transition1 } from './scenes/transition1.js';
import { transition2 } from './scenes/transition2.js';
import { intro2 } from './scenes/intro2.js';
import { mainSection } from './scenes/mainSection.js';
import { transition3 } from './scenes/transition3.js';
import { outro } from './scenes/outro.js';

// Initialize all scenes
const scenes = {
  intro,
  transition1,
  transition2,
  intro2,
  mainSection,
  transition3,
  outro,
};
let activeScene = scenes.intro;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
activeScene.scene.add(light);

let clock = new THREE.Clock(); // Track time for delta calculations

// Renderer, camera, and light setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Start with black background
document.getElementById('container').appendChild(renderer.domElement);


// Play button logic
document.getElementById('play-button').addEventListener('click', async () => {
  await setupAudio();
  animate();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta(); // Get the time since the last frame
  activeScene.update(deltaTime); // Call the update function of the active scene
  renderer.render(activeScene.scene, camera);
}

let crossfadeFactor = 0; // Controls crossfade (0 = start, 1 = complete)
let isTransitioning = false; // Track if a transition is in progress

// Crossfade between two scenes
function crossfadeScenes(sceneA, sceneB, duration = 1) {
  sceneB.add(light.clone())
  if (isTransitioning) return; // Prevent multiple transitions
  isTransitioning = true;

  let startTime = performance.now();

  function animateCrossfade() {
    let elapsed = (performance.now() - startTime) / 1000; // Time in seconds
    crossfadeFactor = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

    renderer.autoClear = false; // Allow rendering of both scenes
    renderer.clear();

    // Render Scene A (fading out)
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 1 - crossfadeFactor); // Adjust opacity
    renderer.render(sceneA, camera);

    // Render Scene B (fading in)
    renderer.setClearColor(0x000000, crossfadeFactor);
    renderer.render(sceneB, camera);

    if (crossfadeFactor < 1) {
      requestAnimationFrame(animateCrossfade); // Continue until complete
    } else {
      isTransitioning = false; // Transition complete
    }
  }

  animateCrossfade(); // Start crossfade
}

// Immediate switch without transition
function switchSceneAbruptly(scene) {
  activeScene = scene;
  renderer.clear(); // Clear previous frame
  renderer.render(activeScene, camera); // Render the new scene
}

// Switch scene with optional transition type
export function switchScene(name, transition = 'smooth', duration = 1) {
  const nextScene = scenes[name];
  nextScene.scene.add(light);
  if (!nextScene) {
    console.error(`Scene ${name} not found.`);
    return;
  }

  if (transition === 'smooth') {
    crossfadeScenes(activeScene.scene, nextScene.scene, duration);
  } else {
    switchSceneAbruptly(nextScene.scene);
  }

  activeScene = nextScene;
}