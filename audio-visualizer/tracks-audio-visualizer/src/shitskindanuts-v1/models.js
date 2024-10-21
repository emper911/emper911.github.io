import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { actions } from './actions.js';

const loader = new GLTFLoader();

export function loadCharacterModel(scene, actionName, callback) {
  loader.load('../media/models/ragdolldude2.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(-0.1, -2, -1);
    scene.add(model);

    const mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });
    if (actions[actionName]) actions[actionName].play();
    else console.error(`action not found ${actionName}`)

    if (callback) callback(mixer); // Pass back the mixer to be updated

    return model;
  });
}