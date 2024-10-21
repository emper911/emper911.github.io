import * as THREE from 'three';
import { loadCharacterModel } from '../models.js';

export const intro2 = {
  scene: new THREE.Scene(),
  mixer: null,
  update(deltaTime) {
    if (this.mixer) this.mixer.update(deltaTime); // Update mixer
  },
};

loadCharacterModel(intro2.scene, 'dancedance', (mixer) => {
  intro2.mixer = mixer;
});
