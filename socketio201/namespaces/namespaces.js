const express = require('express')
const socketio = require('socket.io')
const path = require('path')



const app = express(); 

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9001, ()=> {
    console.log('the app is listining on port 9001')
})

const io = new socketio.Server(expressServer); 


io.of('/').on('connection', socket => {
    socket.join('chat');
    io.of('/').to('chat').emit('welcomeToChatRoom', {data:'this is chat room'}) 

    console.log('a new client is connected :', socket.id)

    socket.on('newMessageToServer', (dataFromClient) => {
        console.log("Data:", dataFromClient);
        io.of("/").emit('newMessageToClient', {text:dataFromClient})
    })

    socket.on('clientConnected', data => console.log(data))
})

io.of('/admin').on('connection', socket => {

    socket.join('chat');

    io.of('/admin').to('chat').emit('welcomeToChatRoom', {data:'hello from admin'})

    console.log('a new admin client is connected :', socket.id)

    socket.on('newMessageToServer', (dataFromClient) => {
        console.log("Data:", dataFromClient);
        io.of("/").emit('newMessageToClient', {text:dataFromClient})
    })

    socket.on('clientConnected', (dataFromClient) => {
        console.log(dataFromClient)
    })

    // socket.on('clientConnected', data => console.log(data))
})
