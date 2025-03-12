const socket = io('http://localhost:9001')
const adminSocket = io('http://localhost:9001/admin')

const socket2 = io('http://localhost:9001/wiki')

socket.on('connect', ()=> {
    console.log('the client is connected');
    socket.emit('clientConnected', `hello from client ${socket.id}`);
    
})

adminSocket.on('connect', ()=> {
    console.log('the client is connected');
    adminSocket.emit('clientConnected', `hello from admin client ${adminSocket.id}`);
    
})

socket.on('welcomeToChatRoom', data => console.log(data))
adminSocket.on('welcomeToChatRoom', data => console.log(data))

