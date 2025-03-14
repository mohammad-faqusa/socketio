const express = require('express')
const socketio = require('socket.io')
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({path: path.join(__dirname, './../.env')})


const app = express(); 
const port = process.env.PORT

app.use(express.static(path.join(__dirname, './public')))

const expressServer = app.listen(port, ()=>{
    console.log(`the server is running on localhost:${port}`)
})

const io = socketio(expressServer); 

io.on('connection', async socket => {
    socket.join('chat'); 
    io.of('/').to('chat').emit('welcomeToChatRoom', {})
    socket.on('newMessageToServer', (data) => {
        console.log(data); 
    })

    const sockets = [...await io.allSockets()];
    // const socketsIds = sockets.map(socket => socket.id); 
    // console.log(socketsIds)

    socket.emit('newMessageToClient', {data: 'a new message from server', sockets: sockets})
})


io.of('/admin').on('connection', socket => {
    console.log('a new admin client is connected', socket.id)
})

io.of('/').use((socket, next) => {
    console.log('a new client is shown from the middleware ', socket.id)
    next(); 
})

// server.in('room1').join('room2')