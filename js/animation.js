
class AnimationManager {
  constructor() {
    this.schedRepeats = [];
    this.loops = [];

    this.start = this.start.bind(this);
    this.initializeLoops = this.initializeLoops.bind(this);
    this.initializeSchedRepeats = this.initializeScheduleRepeats.bind(this);
    this.setLoops = this.setLoops.bind(this);
    this.setSchedRepeats = this.setSchedRepeats.bind(this);
  }

  start() {
    this.initializeLoops();
    this.initializeScheduleRepeats();
  }

  initializeLoops() {
    this.loops.map(l => {
      const currLoop = new Tone.Loop(l.loopFunction, l.interval);
      currLoop.start(l.startTime);
    });
  }

  initializeScheduleRepeats() {
    this.schedRepeats.map(sched => {
      Tone.Transport.scheduleRepeat(
        sched.scheduleRepeatFunction, sched.interval, sched.startTime, sched.endTime)
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
    new BgScene2("0.01", "17:0:0", "26:0:0", ctx2),
    new BgScene3("0.01", "26:0:0", "100:0:0", ctx2),
  ];
  animationManager.setSchedRepeats(scheduleRepeats);

  animationManager.start();
}
