const init = ()=> {
    draw(); 
}
let randomX = Math.floor(500 * Math.random() + 10); // h axis
let randomY = Math.floor(500 * Math.random() + 10); // v axis 

context.beginPath()
context.fillStyle ='rgb(255,0,0)' 
context.arc(randomX, randomY, 10, 0, 2*Math.PI)// draw an arc/circle 
//arg1 and arg2 are center x and cetnery of the arc 
context.fill();
context.lineWidth = 3; //how wide to draw a line in pixels 
context.strokeStyle = 'rgb(0,255,0)'


console.log(randomX, randomY)
const draw = ()=> {
}