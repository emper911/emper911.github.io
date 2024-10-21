import * as THREE from 'three';
import { loadCharacterModel } from '../models.js';

export const transition2 = {
  scene: new THREE.Scene(),
  mixer: null,
  update(deltaTime) {
    if (this.mixer) this.mixer.update(deltaTime); // Update mixer
  },
};

loadCharacterModel(transition2.scene, 'spongebobdance', (mixer) => {
  transition2.mixer = mixer;
});