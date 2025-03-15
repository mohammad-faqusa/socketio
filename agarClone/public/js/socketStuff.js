const socket = io();

socket.on('init', data => {
    // console.log(data); 
    orbs = data.orbs
    // console.log(orbs); 
})