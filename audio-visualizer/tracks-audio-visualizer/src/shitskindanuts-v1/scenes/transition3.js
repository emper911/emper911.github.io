import * as THREE from 'three';
import { fadeOutActions } from '../actions.js';

export const transition3 = {
  scene: new THREE.Scene(),
  update() {
    fadeOutActions(); // Slowly fade out character actions
  },
};