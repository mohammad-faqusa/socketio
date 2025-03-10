
const express = require('express');
const socketio = require('socket.io')
const path = require('path')

const app = express(); 
const port = 8000; 

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
    socket.emit('messageFromServer', {data: 'this is a message from a server'})
    socket.on('messageFromClientChat', (data)=> {
        console.log(data.data)
        socket.emit('ackMessage', {data: 'the messgae is received!'})
    })
})