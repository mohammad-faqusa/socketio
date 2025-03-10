// // 3rd party module from npm 
// const express = require('express'); 
// const path = require('path')

// const app = express();

// const socketio = require('socket.io')

// app.use(express.static(path.join(__dirname, 'public')))

// const expressServer = app.listen(8000); 
// const io = socketio(expressServer); 

// io.on('connection', socket => {
//     console.log(socket.id, " has connected");
//     // in websocket, we use send method, but in socket io we use emit method 
//     socket.emit('messageFromServer', {data:"Welcome to the socket server!"})
//     socket.on('messageFromClient', (data) => {
//         console.log(data) ; 
//     })
// })

const express = require('express');
const socketio = require('socket.io')
const path = require('path')

const app = express(); 
const port = 3000; 

app.use(express.static(path.join(__dirname, 'public'))); 

const expressServer = app.listen(port, ()=> {
    console.log('The server is running on port:', port)
})

const io = new socketio.Server(expressServer); 


io.on('connection', socket => {
    console.log('a new client is connected ', socket.id)
    socket.emit('messageFromServer', {data: 'welcome from the server side socket io'});
    socket.on('clientSide', data=> {
        console.log(data); 
    } )
})