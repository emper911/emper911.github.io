import * as THREE from 'three';
import { createVideoCube } from '../videoCube.js';

export const transition1 = {
  scene: new THREE.Scene(),
  update() {
    // No special updates for transition 1
  },
};

createVideoCube(transition1.scene, '../media/video/kickflip_gap2_riki.mov');
