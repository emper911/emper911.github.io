import * as THREE from 'three';
import { loadCharacterModel } from '../models.js';

export const mainSection = {
  scene: new THREE.Scene(),
  mixer: null,
  character: [],
  update(deltaTime) {
    if (this.mixer) this.mixer.update(deltaTime); // Update mixers
  },
};

loadCharacterModel(mainSection.scene, 'walker',  (mixer) => {
  mainSection.mixer = mixer;
});
