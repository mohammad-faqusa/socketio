const joinNs = (namespace) => {
    const roomContainer = document.querySelector('.rooms .room-list');
        roomContainer.innerHTML = ``; 
        namespace.rooms.forEach(room => {
            roomContainer.innerHTML += `<li class="room" namespaceId=${room.namespaceId}><span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe' }"></span>${room.roomTitle}</li>`
        })

        
        localStorage.setItem('lastNs', namespace.ns);
}

const joinRoom = (roomTitle, namespaceId) => {
    console.log(`joined to ${roomTitle}`)
    const currentRoom = document.querySelector('.curr-room-num-users');
    sockets[namespaceId].emit('joinedRoom', roomTitle, (ackResp) => {
        console.log(ackResp)
        currentRoom.textContent = ackResp
    })
    console.log(sockets[namespaceId].id)
}

const addRoomListeners = () => {
    const roomNodes = document.getElementsByClassName('room')
    console.log(roomNodes)
        Array.from(roomNodes).forEach(elem => {
            
            elem.addEventListener('click', e => {
                const namespaceId = elem.getAttribute('namespaceId')
                joinRoom(elem.textContent, namespaceId)
                 
            })
        })

}

