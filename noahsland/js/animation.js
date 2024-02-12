
class AnimationManager {
  constructor() {
    this.schedRepeats = [];
    this.loops = [];

    this.start = this.start.bind(this);
    this._initializeLoops = this._initializeLoops.bind(this);
    this._initializeScheduleRepeats = this._initializeScheduleRepeats.bind(this);
    this.setLoops = this.setLoops.bind(this);
    this.setSchedRepeats = this.setSchedRepeats.bind(this);
  }

  start() {
    this._initializeLoops();
    this._initializeScheduleRepeats();
  }

  _initializeLoops() {
    this.loops.map(l => {
      const currLoop = new Tone.Loop(l.loopFunction, l.interval);
      currLoop.start(l.startTime);
    });
  }

  _initializeScheduleRepeats() {
    this.schedRepeats.map(sched => {
      Tone.Transport.scheduleRepeat(
        sched.scheduleRepeatFunction, sched.interval, sched.startTime, sched.endTime);
    });
  }

  setLoops(newLoops = []) {
    this.loops = this.loops.concat(newLoops);
  }
  
  setSchedRepeats(newSchedRepeats = []) {
    this.schedRepeats = this.schedRepeats.concat(newSchedRepeats);
  }
}

const startAnimation = () => {
  const animationManager = new AnimationManager();
  const loops = [
    new MainEqVisualLoop("0.01"),
    new CanvasColorsLoop("8n"),
  ];
  animationManager.setLoops(loops);
  const scheduleRepeats = [
    new BgScene1("0.01", "1:1:0", "16:0:0", ctx2),
    new BgScene2("0.01", "17:0:0", "27:0:0", ctx2),
    new BgScene3("0.01", "28:0:0", "38:0:0", ctx2),
    new BgScene4("0.01", "39:0:0", "60:0:0", ctx2),
    new BgScene5("0.01", "61:0:0", "75:0:0", ctx2),
  ];
  animationManager.setSchedRepeats(scheduleRepeats);

  animationManager.start();
}
