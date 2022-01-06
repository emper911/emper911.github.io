class Root {
  constructor(x, y, context){
    this.x = x;
    this.y = y;
    this.context = context;
    this.speedX = Math.random() * 6 - 2;
    this.speedY = Math.random() * 3 - 2;
    this.maxSize = Math.random() * 9 + 5;
    this.size = Math.random() * 10 + 2;
    this.angle = Math.random() * 6.2;
    this.update = this.update.bind(this);
  }

  update() {
    this.x += this.speedX + Math.sin(this.angle + Math.PI / 4);
    this.y += this.speedY + Math.sin(this.angle + Math.PI / 4);
    this.size += 0.1;
    this.angle += 0.1;
    if (this.size < this.maxSize) {
      this.context.beginPath()
      // ctx.rect(this.x, this.y, this.size, Math.PI * 2);
      this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.context.fill();
      this.context.stroke();
      requestAnimationFrame(this.update);
    }
  }
}

class Particle {
  constructor(x, y, context){
    this.x = x;
    this.y = y;
    this.context = context;
    this.size = 10;
    this.update = this.update.bind(this);
  }

  update() {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x * 0.5 + this.x, this.y + this.y * 0.5);
      // ctx.rect(this.x, this.y, this.size, Math.PI * 2);
    // ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.stroke();
    }
}

class Lines {
  constructor(x, y, context, reflected = false){
    this.x = x;
    this.y = y;
    this.reflected = reflected;
    this.context = context;
    this.size = 10;
    this.update = this.update.bind(this);
    this.reflection = this.reflection.bind(this);
  }

  update() {
    this.context.beginPath();
    if (this.reflected) {
      const rX = this.reflection(this.x);
      const rY = this.reflection(this.y);
      const adjustedX = rX - rX * 0.5;
      const adjustedY = rY - rY * 0.5;
      this.context.moveTo(adjustedX, this.y - this.y * 0.5);
      this.context.lineTo(this.x - this.x * 0.5, this.y + this.y * 0.5);
    } else {
      this.context.moveTo(this.x - this.x * 0.5, this.y - this.y * 0.5);
      this.context.lineTo(this.x * 0.5 + this.x, this.y * 0.5 + this.y);
    }
    this.context.stroke();
  }

  reflection(v) {
    return v + (2 * v);
  }
}

class QuadLine {
  constructor(x, y, context, reflected = false){
    this.x = x;
    this.y = y;
    this.reflected = reflected;
    this.context = context;
    this.size = 1;
    this.update = this.update.bind(this);
    this.reflection = this.reflection.bind(this);
  }

  update() {
    this.context.beginPath();
    if (this.reflected) {
      const rX = this.reflection(this.x);
      const rY = this.reflection(this.y);
      const adjustedX = rX - rX * 0.5;
      const adjustedY = rY - rY * 0.5;
      this.context.moveTo(adjustedX, this.y - this.y * 0.5);
      ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else {
      this.context.moveTo(this.x - this.x * 0.5, this.y - this.y * 0.5);
      ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // this.context.quadraticCurveTo(this.x * 0.5 + this.x, this.y * 0.5 + this.y, this.x, this.y);
    }
    this.context.stroke();
  }

  reflection(v) {
    return v + (2 * v);
  }
}

const rotater = (x, y, r) => {
  const rX = (x * Math.cos(r)) - (y * Math.sin(r));
  const rY = (x * Math.sin(r)) + (y * Math.cos(r));
  return { rX , rY };
}

//event based

const onMouseMove = (e) => {
  if (draw) {
    const root = new Root(e.x, e.y, ctx);
    root.update();
  }
};

const onMouseDown = () => {
  colorPicker = (colorPicker + 1) % 4;
  ctx.fillStyle = fillColors[colorPicker];
  ctx.strokeStyle = strokeColors[colorPicker];
  draw = true;
};
const onMouseUp = () => {
  draw = false;
};

const onClearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};