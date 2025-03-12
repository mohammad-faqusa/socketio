const express = require('express'); 
const socketio = require('socket.io')
const path = require('path')
const Room = require('./classes/Room')

const namespaces = require(path.join(__dirname, '/data/namespaces'))

const app = express(); 
const port = 9000; 

app.use(express.static(path.join(__dirname, 'public')))

const expressServer = app.listen(port, ()=> {
    console.log(`the server is listening on port ${port}`)
})

// manufatcured way to change an ns (without building a huge UI) 

const io = new socketio.Server(expressServer); 

// app.set('io', io)

app.get('/change-ns', (req, res) => {
    // namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0))
    // let everyone know if this name spaceis changed 
    // const io = app.get('io')

    io.of(namespaces[0].endpoint).emit('nsChanged', namespaces[0])

    res.json(namespaces[0]);
})

io.of("/").on('connection', socket => {
    console.log(socket.id, " has connected")
    socket.on('clientConnected', data => {
        console.log(data); 
    })
    socket.emit('nsList', namespaces)
})

// console.log(namespaces)

namespaces.forEach(ns => {
    io.of(ns.endpoint).on('connection', socket => {
        console.log(`${socket.id} has connected to ${ns.endpoint}`)

        socket.on('joinRoom', (data)=> {
            console.log(data); 
        })
    })
});