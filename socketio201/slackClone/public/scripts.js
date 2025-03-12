const socket = io('http://localhost:9000');
const socketLinux = io('http://localhost:9000/linux');

// sockets will be put inot this array, in the index of theri ns.id 
const nameSpacesSockets = [] ; 
const listeners = {
    nsChange: [],
}

const addListiners = (nsId)=> {
    // nameSpacesSockets[ns.id] = thisNs
    if(!listeners.nsChange[nsId]) {
        nameSpacesSockets[nsId].on('nsChanged', (data)=> {
            console.log("Namespace Changed!")
            console.log(data)
        })
        listeners.nsChange[nsId] = true; 
    } else {
        //nothing to do the listener has been added 
    }
    
}

socket.on('connect', ()=> {
    console.log('connected to the server')
    socket.emit('clientConnected', `hello from client ${socket.id}`); 
})

const nsContainer = document.querySelector('.namespaces');
const roomsContainer = document.querySelector('.main-rooms .room-list'); 
// listen for nslist to give namespaces 
socket.on('nsList', (nsData) => {
    console.log(nsData);

    // update the html 
    nsContainer.innerHTML = '' ; 
    nsData.forEach(ns => {
        const nsElement = `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
        nsContainer.innerHTML += nsElement; 

        // if the connection is new, this will be null
        // if the connection is already established, it iwll reconnect and remain in its spot 
        let thisNs = nameSpacesSockets[ns.id]

        if(!nameSpacesSockets[ns.id]){
            //There is no socket at this nsId. So make a new connection 
            //jion this namespace with io() 
            thisNs = io(`http://localhost:9000${ns.endpoint}`)
        }
        nameSpacesSockets[ns.id] = thisNs; 

        addListiners(ns.id); 
        
    });
    // document.addEventListener
    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        element.addEventListener('click', (ev)=> {
            joinNs(element, roomsContainer, nsData)
        })
    });
})

// add event listener to each name space 