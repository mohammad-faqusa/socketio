const userName = 'mohammad';
const password = 'pass'
const jwt = 'dsfasdfasdfasdklfasdfsafsadfs'
const clientOptions = {
    query: {
        userName,password,jwt
    }
}

const socket = io('http://localhost:3000', clientOptions); 

const nsContainer = document.querySelector('.namespaces')

const namespaces = []; 
const sockets = []; 

let selectedNsId = 0 ; 

document.querySelector('#message-form').addEventListener('submit', e => {
    e.preventDefault(); 
    const newMessage = document.querySelector('#user-message').value;
    document.querySelector('#user-message').value = ''; 
    console.log(newMessage, selectedNsId)
    sockets[selectedNsId].emit('newMessageToRoom', {
        newMessage,
        date: Date.now(),
        username: 'mohammad',
        selectedNsId
    })
})
socket.on('nsList', nsData => {
    nsData.forEach(namespace => {
        if(!namespaces[namespace.id]) {
            const nsDoc = `<div class="namespace" ns="${namespace.ns}"><img src="${namespace.image}"></div>`;
            nsContainer.innerHTML += nsDoc;
            namespaces[namespace.id] = namespace

            sockets[namespace.id] = io(`http://localhost:3000${namespace.ns}`);
            sockets[namespace.id].on('nsChange', (data) => {
                console.log(`Namespace ${data.ns} Changed!`)
                console.log(data); 
                namespaces[namespace.id] = data;

                if(lasClickedNs === namespace.ns) {
                    joinNs(namespaces[namespace.id]); 
                    addRoomListeners(); 
                }
            
            })

            sockets[namespace.id].on('messageToRoom', data => {
                console.log(data);
                document.querySelector('#messages').innerHTML += addMessage(data)
            })
        }
        
    });
    nsData.forEach(namespace => {
        if(!namespaces[namespace.id].clickEvent) {
            const nsElement = Array.from(document.querySelectorAll('.namespace')).find(nsdoc => nsdoc.getAttribute('ns') === namespace.ns) ;
            nsElement.addEventListener('click', (ev) => {
                selectedNsId = namespace.id; 
                joinNs(namespaces[namespace.id])
                addRoomListeners();
                lasClickedNs = namespace.ns; 
            })
            namespaces[namespace.id].clickEvent = true; 
        }
    });
    const lastEndpoint = localStorage.getItem('lastNs')
    if(lastEndpoint){
        joinNs(namespaces.find(namespace => namespace.ns === lastEndpoint))
        addRoomListeners(); 
    }

})

