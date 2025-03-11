

const userName = "Mohammad";
const password = "x"; 

const socket = io('http://localhost:9000');


socket.on('connect', ()=>{
    // alert('the client is connected')
    socket.emit('clientConnected', `hello from client ${socket.id}`)
})
// listen for the nsList event from the server which gives us the namespaces
socket.on('nsList', (nsData)=> {
    console.log(nsData); 
    const nameSpacesDiv = document.querySelector('.namespaces');
    nameSpacesDiv.innerHTML= '' 

    nsData.forEach(ns => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
    });

    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        console.log(element);
        element.addEventListener('click', (ev) => {
            const nsEndpoint = element.getAttribute('ns');
            console.log(nsEndpoint)

            const clickedNs = nsData.find( row => row.endpoint === nsEndpoint)
            const rooms = clickedNs.rooms; 
            console.log(rooms); 
            let roomList = document.querySelector('.room-list');
            roomList.innerHTML = "" ; 
            rooms.forEach(room => {
                roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
            })
        })
    })
})