import IntroScene from './act/IntroScene';
import Intro2Scene from './act/Intro2Scene';
import Transition1Scene from './act/Transition1Scene';
import Transition2Scene from './act/Transition2Scene';
import Transition3Scene from './act/Transition3Scene';
import MainSectionScene from './act/MainSectionScene';
import OutroScene from './act/OutroScene.js';
import Scene from './Scene.js';
// Import other scene files as needed

export interface SceneObj {
  name: string,
  scheduledTime: string,
  transitionType: string,
  transitionSpeed?: number,
  scene: Scene,
}

const sceneList: SceneObj[] = [
  { name: 'intro', scheduledTime: '1', transitionType: 'abrupt', scene: new IntroScene() },
  { name: 'transition1', scheduledTime: '29.15', transitionType: 'abrupt', transitionSpeed: 1, scene: new Transition1Scene() },
  { name: 'transition2', scheduledTime: '36.27', transitionType: 'abrupt', transitionSpeed: 1, scene: new Transition2Scene() },
  { name: 'intro2', scheduledTime: '61', transitionType: 'smooth', transitionSpeed: 1, scene: new Intro2Scene() },
  { name: 'mainSection', scheduledTime: '79', transitionType: 'smooth', transitionSpeed: 1, scene: new MainSectionScene() },
  { name: 'transition3', scheduledTime: '115', transitionType: 'smooth', transitionSpeed: 1, scene: new Transition3Scene() },
  { name: 'outro', scheduledTime: '124', transitionType: 'smooth', transitionSpeed: 1, scene: new OutroScene() },
];

export default sceneList;
