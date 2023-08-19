window.addEventListener('load', ()=> {
  const section = document.getElementsByTagName("section")[0];
  // console.log(discography)
  // Select all the social media links
  const socialLinks = document.querySelectorAll("#socialmedia a");
  // Define a base offset (can adjust as needed)
  const baseOffset = 2;
  
  // Iterate over each link and adjust its left style based on its index
  if (isMobile()) {
    mobileSpecificFunctionality();
  } else {
    desktopSpecificFunctionality();
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function mobileSpecificFunctionality() {
    console.log("mobile functionality included");
  }

  function desktopSpecificFunctionality() {
    socialLinks.forEach((link, index) => {
      link.style["margin-left"] = `${baseOffset * index}vw`;
    });

    section.addEventListener("scroll", function() {
      let scrollIndicator = document.querySelector(".scroll-indicator");
      if (section.scrollTop > 0) {  // Adjust this value as needed
          scrollIndicator.style.opacity = "0";
      } else {
          scrollIndicator.style.opacity = "0.7";
      }
    });
  }
});




let particles = [];
const num_particles = 15000;

function setup() {
    let cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('#container');
    for (let i = 0; i < num_particles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    fill(1, 21, 46, 25);  // Semi-transparent rectangle for echo effect
    rect(0, 0, width, height);
    for (let particle of particles) {
        particle.update();
        particle.show();
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 2;
    }

    attract(target) {
        let force = p5.Vector.sub(target, this.pos);
        force.setMag(0.8);  // Adjust this value to change the strength of attraction
        this.acc.add(force);
    }

    update() {
        this.attract(createVector(mouseX, mouseY));

        let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI * 4;
        this.acc.add(p5.Vector.fromAngle(angle));
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
        
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    show() {
      stroke(255, 255, 255, 10);
      strokeWeight(3);
      point(this.pos.x, this.pos.y);
    }
}