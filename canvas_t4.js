/*
Title: Animating the Canvas | HTML5 Canvas Tutorial for Beginners 
Start Date: 2022-11-25
Finish Date: 2022-11-25
*/

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined, y: undefined
}

var maxRadius = 50;
var minRadius = 2;

var colorArray = [
    //'#001542', '#085454', '#7A7A7A', '#FFB30D', '#EE6C4D' //Cozy Mood
    //'#3D5A80', '#98C1D9', '#E0FBFC', '#EE6C4D', '#293241'
    '#050652', '#5F6EA6', '#000236', '#2B388B', '#FFEE88' //Moon
    //'#D90404', '#FFB30D', '#88A34F', '#224732', '#132326' //Chirstmas
    // look up 'kuler' on internet.
];
console.log(colorArray.length);

window.addEventListener('mousemove', function(event){
        // console.log('aaa'); // Whenever i click the window, log keeps count.
        // console.log(event); // And i can see the event of log.
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse);
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if ( this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
            this.dx = -this.dx;
        }
        if ( this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];

function init(){

    circleArray = [];

    for(var i = 0; i < 800; i++){    
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = Math.random() - 0.2;
        var dy = Math.random() - 0.2;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x,y,dx,dy,radius)); //var circle = new Cirle(200, 200, 3, 3, 30);
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight); // remove the all of the canvas

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();        
    }
}
animate();
