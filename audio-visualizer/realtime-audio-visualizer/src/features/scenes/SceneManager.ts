import * as THREE from 'three';

class SceneManager {
  clock: typeof THREE.Clock;
  
  constructor() {
    this.clock = THREE.Clock;
  }

  async setup(): Promise<void> {

  }
}

export default SceneManager;