const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const dotenv = require('dotenv')

const Room = require('./classes/Room')
const namespaces = require('./data/namespaces')
const { on } = require('events')

dotenv.config({path: path.join(__dirname, './../.env')})

const app = express(); 
const port = process.env.PORT 

app.get('/change-ns', (req, res) => {
    //update namespaces array
    namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0)); 
    //let everyone know in THIS namespace, that it changes 
    io.of(namespaces[0].ns).emit('nsChange', namespaces[0])
    res.json("Page hit")
})

app.use(express.static(path.join(__dirname, 'public')))

const expressServer = app.listen(port , ()=> {
    console.log('the server is running on localhost:'+port)
})

const io = socketio(expressServer); 

io.on('connection', socket => {
    console.log(`a new client is connected ${socket.id}`)
    socket.emit('nsList', namespaces)
})

namespaces.forEach(namespace => {
    io.of(namespace.ns).on('connection', socket => {
        console.log(`A client ${socket.id} is connected to ${namespace.ns}`);
        io.of(namespace.ns).emit('clientConnected', {data: `you are connected to ${namespace.ns} namespace`})
    })
})