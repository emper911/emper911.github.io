AFRAME.registerComponent('hover-color-change', {
  schema: {
    hoverColor: {default: '#6c757d'}, // Default hover color, change as needed
    originalColor: {default: '#28a745'},
    hoverTextColor: {default: 'white' },
    originalTextColor: {default: 'black' },
  },
  init: function () {
    // Store the original color of the entity
    this.data.originalColor = this.el.getAttribute('material').color;
    this.data.originalText = this.el.getAttribute('text').color;
    
    this.el.addEventListener('mouseenter', () => {
      this.el.setAttribute('material', 'color', this.data.hoverColor);
      this.el.setAttribute('text', 'color', this.data.hoverTextColor);
    });
    
    this.el.addEventListener('mouseleave', () => {
      this.el.setAttribute('material', 'color', this.data.originalColor);
      this.el.setAttribute('text', 'color', this.data.originalTextColor);
    });
  }
});

// AFRAME.registerComponent('play-audio', {
//   init: function () {
//     this.el.addEventListener('click', (e) => {
//       const audioEl = document.querySelector('#signal_loss_audio');

//       audioEl.play();
//       console.log("Playing music");
//     });
//   },
// });

AFRAME.registerComponent('play-audio', {
  init: function() {
    this.setupAudioContext = this.setupAudioContext.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.el.addEventListener('click', this.playAudio);
  },
  setupAudioContext: function(audioEl) {
    // Create AudioContext and AnalyserNode
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    
    // Connect the audio element source to the analyser
    const source = audioContext.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Return the analyser for further use
    return analyser;
  },
  playAudio: function() {
    const audioEl = document.querySelector('#signal_loss_audio');
    
    // Check if AudioContext needs to be (re)initialized
    if (!this.analyser) {
      this.analyser = this.setupAudioContext(audioEl);
      this.applyAudioReactiveBehavior(this.analyser);
    }
    
    // Play the audio
    audioEl.play();
  },
  applyAudioReactiveBehavior: function(analyser) {
    // Define how to react to the audio data here
    // For example, set up frequency bins and modify entities based on the audio data
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const binSize = analyser.frequencyBinCount / 8;
    const mushrooms = document.querySelectorAll('[audio-reactive]');

    
    const update = () => {
      requestAnimationFrame(update);
      analyser.getByteFrequencyData(dataArray);

      // Iterate over each mushroom and apply behavior based on its bin
      mushrooms.forEach((mushroom) => {
        const binIndex = parseInt(mushroom.getAttribute('data-bin'), 10);
        const start = (binIndex) * binSize;
        const end = start + binSize;
        let sum = 0;
        for (let i = start; i < end; i++) {
          sum += dataArray[i];
        }
        const avg = sum / binSize; // Average amplitude for the bin

        // Scale and color the mushroom based on the average amplitude
        const scale = Math.max(avg / 128, 0.5); // Ensure minimum scale
        mushroom.setAttribute('scale', `${scale} ${scale} ${scale}`);
        const hue = Math.floor((avg / 255) * 360);
        const color = `hsl(${hue}, 100%, 50%)`;
        // mushroom.setAttribute('material', 'color', );
        if (mushroom.object3D) {
          mushroom.object3D.traverse((obj) => {
            if (obj.isMesh) {
              obj.material.color.set(color);
            }
          });
        }
      });
    };
    
    update();
  }
});


AFRAME.registerComponent('stop-audio', {
  init: function () {
    this.el.addEventListener('click', (e) => {
      var audioEl = document.querySelector('#signal_loss_audio');
      audioEl.pause();
      console.log("Paused music");
    });
  }
});
