


player.locX = Math.floor(500 * Math.random() + 10); // h axis
player.locY = Math.floor(500 * Math.random() + 10); // v axis 


const draw = ()=> {
    console.log(players); 
    context.setTransform(1,0,0,1,0,0)
    
    // reset the context translate back to defualt 
    context.clearRect(0,0,canvas.width, canvas.height)

    //clamp the screen /vp to the players location (x,y);
    const camX = -player.locX + canvas.width/2;
    const camY = -player.locY + canvas.height/2;

    //translate moves the canvas/context to wherer the player is at 
    context.translate(camX, camY); 

    players.forEach(p=>{

        context.beginPath()
        context.fillStyle =p.color; 
        context.arc(p.locX, p.locY, p.raduis, 0, 2*Math.PI)// draw an arc/circle 
        // context.arc(200, 200, 10, 0, 2*Math.PI)// draw an arc/circle 
        //arg1 and arg2 are center x and cetnery of the arc 
        context.fill();
        context.lineWidth = 3; //how wide to draw a line in pixels 
        context.strokeStyle = 'rgb(0,255,0)'
        context.stroke()
    })


    orbs.forEach(orb => {
        context.beginPath();
        context.fillStyle = orb.color;
        // Adjust positions based on camera position
        context.arc(orb.locX - player.locX + canvas.width / 2, 
                    orb.locY - player.locY + canvas.height / 2, 
                    orb.radius, 0, 2 * Math.PI);
        context.fill();
    });

    
    console.log('done drawing orbs')
    window.requestAnimationFrame(draw); 

}

  

canvas.addEventListener('mousemove',(event)=>{
    console.log(event)
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
        console.log('fourth quertar ')
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
        console.log('third quertar ')
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
        console.log('second quertar ')
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
        console.log('first quertar ')
    }

    
    player.xVector = xVector; 
    player.yVector = yVector; 
})