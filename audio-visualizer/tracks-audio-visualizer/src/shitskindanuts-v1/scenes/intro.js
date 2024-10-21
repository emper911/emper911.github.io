import * as THREE from 'three';
import { createVideoCube } from '../videoCube.js';

export const intro = {
  scene: new THREE.Scene(),
  cube: null,
  update() {
    // No special updates for intro scene
  },
};

// Add content to the intro scene
createVideoCube(intro.scene, '../media/video/flushingHospital_reese.mov');
