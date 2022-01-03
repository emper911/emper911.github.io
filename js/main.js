class Root {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 6 - 2;
    this.speedY = Math.random() * 6 - 2;
    this.maxSize = Math.random() * 4 + 5;
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
      ctx.beginPath()
      // ctx.rect(this.x, this.y, this.size, Math.PI * 2);
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update);
    }
  }
}
