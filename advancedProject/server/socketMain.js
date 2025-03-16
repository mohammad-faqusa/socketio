// wherer socket.io .isteners and (most) emitters 
const socketMain = (io)=> {
    io.on('connection', (socket) => {
        const auth = socket.handshake.auth; 
        console.log(auth.token); 
        if(auth.token === 'asdfasdfasdfasdfasdfasdf') {

            socket.join('nodeClient'); 

        } else if (auth.token === "asdfasdfasdfasdf") {
            socket.join('reactClient')
        } else {
            socket.disconnect();
            console.log('YOU HAVE BEEN DISCONNECTED')
        }
        console.log(`Someone connected on worker ${process.pid}`);
        socket.emit('welcome', 'welcome to our cluster driven socket.io server!')

        socket.on('perfData', (data) => {
            console.log('tik tok ... ')
            console.log(data); 
        })
    })

}

module.exports = socketMain; 