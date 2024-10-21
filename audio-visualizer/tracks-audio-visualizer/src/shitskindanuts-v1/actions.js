export let actions = {};

export function playAction(name) {
  const action = actions[name];
  if (action) action.reset().play();
}

export function fadeOutActions() {
  Object.values(actions).forEach((action) => action.fadeOut(2));
}