
const socket = io(); 

// const socketAdmin = io('/admin')

socket.on('newMessageToClient', data => console.log(data) )

socket.emit('newMessageToServer', {data: 'a new message from Client.'})

socket.on('welcomeToChatRoom', data => {
    console.log("welcome to the main chat room")
})

