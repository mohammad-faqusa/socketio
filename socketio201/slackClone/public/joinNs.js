const addMessage = (messageObj) => `
    <li>
        <div class="user-image">
            <img src="https://via.placeholder.com/30" />
        </div>
        <div class="user-message">
            <div class="user-name-time">${messageObj.username}<span>${new Date(messageObj.date).toLocaleDateString()} pm</span></div>
            <div class="message-text">${messageObj.newMessage}</div>
        </div>
    </li>`


const joinNs = (namespace) => {
    
    const roomContainer = document.querySelector('.rooms .room-list');
        roomContainer.innerHTML = ``; 
        namespace.rooms.forEach(room => {
            roomContainer.innerHTML += `<li class="room" namespaceId=${room.namespaceId}><span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe' }"></span>${room.roomTitle}</li>`
        })
        localStorage.setItem('lastNs', namespace.ns);

}


const joinRoom = async (roomTitle, namespaceId) => {
    console.log(`joined to ${roomTitle}`)
    const currentRoom = document.querySelector('.curr-room-num-users');
    roomData = await sockets[namespaceId].emitWithAck('joinedRoom', roomTitle)
    currentRoom.textContent = roomData.socketsCount; 
    updateMessageHistory(roomData.roomObject)
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

const updateMessageHistory = (roomObject) => {
    const messageContainer = document.querySelector('#messages');
    messageContainer.innerHTML = '' ; 

    roomObject.history.forEach(message => {
        messageContainer.innerHTML += addMessage(message)
    })
}
