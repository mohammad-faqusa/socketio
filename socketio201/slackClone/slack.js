const express = require('express'); 
const socketio = require('socket.io')
const path = require('path')
const namespaces = require(path.join(__dirname, '/data/namespaces'))

const app = express(); 
const port = 9000; 

app.use(express.static(path.join(__dirname, 'public')))

const expressServer = app.listen(port, ()=> {
    console.log(`the server is listening on port ${port}`)
})

const io = new socketio.Server(expressServer); 

io.on('connection', socket => {
    console.log('a new client is connected!')
    socket.on('clientConnected', data => {
        console.log(data); 
    })
    socket.emit('nsList', namespaces)
})

// console.log(namespaces)
