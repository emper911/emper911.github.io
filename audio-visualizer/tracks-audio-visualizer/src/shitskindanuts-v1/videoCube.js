import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function createVideoCube(scene, videoSrc) {
  loader.load('../media/models/tv.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.rotation.y = Math.PI;
    // Start the cube far away
    const video = document.createElement('video');
    video.src = videoSrc;
    video.id = scene; // Assign the scene as ID for easy reference
    video.load();
    video.muted = true;
    video.loop = true;

    // Play the video when loaded
    video.play().catch((error) => console.error('Video playback failed:', error));

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.rotation = Math.PI * 1.5;
    videoTexture.center.set(0.5, 0.5);  // Rotate around the center of the texture

    // Assuming the TV screen is a mesh called 'Screen'
    // console.log();
    model.children[0].children[1].material.map = videoTexture;
    model.children[0].children[1].material.needsUpdate = true;
      // screenMesh.material.needsUpdate = true;
      // screenMesh.material.map = videoTexture;


    // if (scene === 'intro') videoCube.position.set(0, 0, -100);

    // Store the rotation update logic inside the object
    // videoCube.updateIntro = function () {
    //   // videoCube.rotation.x += 0.01; // Adjust for desired spin speed
    //   // videoCube.rotation.y += 0.01;
    //   // Gradually move the cube closer to the origin (z = 0)
    //   if (videoCube.position.z < 0) {
    //     videoCube.position.z += 0.025; // Adjust speed as needed
    //   }
    // };

    // return videoCube;
  });
};