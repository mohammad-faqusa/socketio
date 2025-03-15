const socket = io();

const  init = async ()=> {
    const initData = await socket.emitWithAck('init', {
        playerName: player.name
    })
    setInterval(() => {
        socket.emit('tock', {
            xVector: player.xVector || .1,
            yVector: player.yVector || .1
        })
    },33);
    //init is called inside of start-game click listener 
    console.log(initData.orbs);
    orbs = initData.orbs;
    
    player.indexInPlayers = initData.indexInPlayers
    draw(); // draw function is in canvasStuf 
}

socket.on('tick', playersArray => {
    // console.log(players); 
    // players = playersArray; 
    // player.locX = playersArray[player.indexInPlayers].playerData.locX
    // player.locy = playersArray[player.indexInPlayers].playerData.locy
    // console.log(player.indexInPlayers); 
    players = playersArray; 
})


