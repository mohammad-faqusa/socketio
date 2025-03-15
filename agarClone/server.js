// Agar.io clone 

const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express(); 
const port = 3000; 

app.use(express.static(path.join(__dirname, 'public')))


const expressServer = app.listen(port , ()=> {
    console.log('the server is running on localhost:', port);
})

const io = socketio(expressServer)


module.exports = {
    app,
    io
}