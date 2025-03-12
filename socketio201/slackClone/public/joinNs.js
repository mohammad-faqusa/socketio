// we could ask the server for fresh info on this NS. BAD!!
// we have socket.io/ws, and the server will tell us when something has happened 

const joinNs = (element,roomsContainer, Data) => {
    const nsElement = Data.find(ns => ns.endpoint === element.getAttribute('ns'))
    // display the rooms 
    roomsContainer.innerHTML = '' ; 
    nsElement.rooms.forEach(room => {
        roomsContainer.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
        <span class="fa-solid fa-${room.privateRoom ? 'lock' : 'global'}"></span>${room.roomTitle}
        </li>`
    })

    //add click listener to each room so the client can tell the server it wants to join! 
    const roomNodes = document.querySelectorAll('.room');

    Array.from(roomNodes).forEach(elem => {
        elem.addEventListener('click', e => {
            console.log("Someone clicked on " +e.target.innerText); 
            const namespaceId = elem.getAttribute('namespaceId')
            joinRoom(e.target.innerText,namespaceId)
        })
    })
}


