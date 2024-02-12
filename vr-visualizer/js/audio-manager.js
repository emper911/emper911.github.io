// AudioManager.js
let AudioManager;

AudioManager = (() => {
  let audioContext = null;
  let sourceNode = null;
  let analyser = null;

  const getAudioContext = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  };

  const getAnalyser = (audioEl) => {
    if (!analyser) {
      const context = getAudioContext();
      analyser = context.createAnalyser();
      if (!sourceNode) {
        sourceNode = context.createMediaElementSource(audioEl);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
      }
    }
    return analyser;
  };

  return { getAnalyser };
})();
