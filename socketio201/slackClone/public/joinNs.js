const joinNs = (namespace) => {
    const roomContainer = document.querySelector('.rooms .room-list');
        roomContainer.innerHTML = ``; 
        namespace.rooms.forEach(room => {
            roomContainer.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
        })
        localStorage.setItem('lastNs', namespace.ns);
}