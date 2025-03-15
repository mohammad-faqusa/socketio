const io = require('./../server').io
const app = require('./../server').app; 
//===================CLASSES========================
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData')
//==================================================
const Orb = require('./classes/Orb')
// make an orbs array that will host all 500/500 NOT PLAYER orbs 
//every time one is absorb, the server will make a new one
const orbs = [] ; 
const players = []; 
const playersForUsers =[]; 
let tickTockInterval ; 
const settings = {
    defaultNumberOfOrbs : 500, // number of obs on the map 
    defaultSpeed: 6, //player speed 
    defualtSize: 6, // defualt player speed 
    defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out 
    worldWidth: 500,
    worldHeight: 500,
    defualtGenericOrbSize: 5 // smaller than player orbs 
}
//on server start, to make our initial 500 

initGame(); 


//tick-tock - issue an event to EVERY connected socket, that is playing the game, 30 times per second

io.on('connect', socket => {
    let player = {}; 
    socket.on('init', (data, ackCallBack) => {
        if(players.length === 0) {
            tickTockInterval = setInterval(()=>{
                io.to('game').emit('tick', playersForUsers) // send the event to the "game" room 
            },33)
        }
        socket.join('game');  //add this socket to "game" room 
        // ap layer has connected 
        // event that runs on jion that does init game stuff 
        // make a playerConfig object - the data specific to this player that only the player needs to know
        const playerName = data.playerName; 
        const playerConfig = new PlayerConfig(settings); 
        const playerData = new PlayerData(playerName, settings)
        player = new Player(socket.id, playerConfig, playerData)
        console.log(player); 
        players.push(player); 
        playersForUsers.push(playerData)
        const indexInPlayers = playersForUsers.length - 1;
        console.log('this is the index of player' , indexInPlayers); 
        console.log('this is orbs: ',  orbs); 
        ackCallBack({orbs, indexInPlayers})
        // make a playerData object - the data specific to this player that everyone needs to know 
        // a msteer player object to house both 
    })
    socket.on('tock', (data) => {
        if(!player.playerConfig) {
            return; 
        }
        const speed = player.playerConfig.speed; 
        const xV = player.playerConfig.xVector = data.xVector;
        const yV = player.playerConfig.yVector = data.yVector;

        if((player.playerData.locX < 5 && xV < 0) || (player.playerData.locX > 500) && (xV > 0)){
            player.playerData.locY -= speed * yV;
        }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
            player.playerData.locX += speed * xV;
        }else{
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })
    socket.on('disconnect', ()=> {
        console.log('player disconnected')
        console.log(player); 
        const indexOfPlayer = players.indexOf(players.find(p => p.socketId === socket.id)); 
        players.splice(indexOfPlayer, 1)
        playersForUsers.splice(indexOfPlayer, 1)
        console.log(players); 
        if(players.length === 0 ) {
            clearInterval(tickTockInterval)
        }
    })
})



function initGame(){
    //loop 500 times, and push a new Orb() onto our array
    for (let i = 0; i  < settings.defaultNumberOfOrbs ; i++ ) {
        orbs.push(new Orb(settings))

    }
}


