window.addEventListener('load', ()=> {
  var audioEl = document.querySelector('#signal_loss_audio');
  var playButton = document.querySelector('#playButton');
  var stopButton = document.querySelector('#stopButton');

  // Play audio
  playButton.addEventListener('click', function () {
    audioEl.play();
  });

  // Stop audio and reset its time
  stopButton.addEventListener('click', function () {
    audioEl.pause();
    audioEl.currentTime = 0;
  });



});
