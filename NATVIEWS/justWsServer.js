// http is core module 
const http = require('http');
// ws is 3rd party module 
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected!')
})

const wss = new websocket.WebSocketServer({server}) // will listen to the server 

wss.on('headers', (headers, req) => {
    console.log(headers); // when the headers is received from the client, you can accept or reject the connection
})

wss.on('connection', async (ws, req) => {
    // console.log(req); 
    ws.send('Welcome to the websocket server!!!')
    ws.on('message', (data) => {
        console.log(data.toString()); 
    })
})


server.listen(8000); 


