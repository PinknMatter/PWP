/**
Noah Kornberg
CART 263
Particle in motion
*/

"use strict";

//initiate variables
//array of particle 
let particles = [];

//resolution of the particles
let res = 6;


function preload() {

}

function setup() {
  //Create the canvas place the particles with no stroke
  createCanvas(400, 400);

  placeParticles();
  noStroke();
}


function draw() {
  //draw background then mouse function
  background(25, 10, 100);
  mouse();
  
  //loops through array and draw and update particles
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
   // particles[i].connect(particles);
   
  }
  
  

}


//array to fill up the canvas with particles
function placeParticles() {
  for(let i = 0; i < width; i += res) {
    for(let j = 0; j < height; j += res) {
      
      //generate a random color value
      let c = [random(255)];
      
      
      //push position of each particle as well as a random color value
        particles.push(new Particle(i, j, c))
      
      
    }
  }
}


class Particle {
  //constructor 
  constructor(x, y, c) {
    //particles positions 
    this.x = x;
    this.y = y;
   
    // color value
    this.c = c;
    
    //home values (values that the particles should return to)
    this.homeX = x;
    this.homeY = y;
  }
  
  update() {
    
    // calculates the distance between particles and the mouse
    let mouseD = dist(this.x, this.y, mouseX, mouseY);
    let mouseA = atan2(this.y - mouseY, this.x - mouseX);
    
    // calculates the distance between the particle and where its home value is
    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);
    
    //onstrains the amount the particles disperse as well as the velocity and force 
    let mouseF = constrain(map(mouseD, 0, 70, 10, 0), 0, 20);
    let homeF = map(homeD, 0, 100, 0, 4);
    
    //velocity of the particles
    let vx = cos(mouseA) * mouseF;
    vx += cos(homeA) * homeF;
    
    let vy = sin(mouseA) * mouseF;
    vy += sin(homeA) * homeF;
    
    //add the particles position to the velocity
    this.x += vx;
    this.y += vy;
  }
  
  draw() {
    // fill('white');
    // stroke(0, 20);
    
    //line(this.x, this.y, this.homeX, this.homeY);
    // noStroke();
    //drawingContext.filter = 'blur(5px)';

    //draws the particles
    fill(110, this.c, 200);
    rect(this.x, this.y, res, res);
  // ellipse(this.homeX, this.homeY, 5, 5);
  }

 
}

function mouse(){
  //function to remove the mouse and replace it with a fake particle
  noCursor();
  fill(110, 200, 200);
  rect(mouseX, mouseY, res, res);
}

