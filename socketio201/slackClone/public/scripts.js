
const socket = io(); 

const nsContainer = document.querySelector('.namespaces')

const namespaces = []; 
const sockets = []; 
let lasClickedNs = ''; 


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
        }
        
    });
    nsData.forEach(namespace => {
        if(!namespaces[namespace.id].clickEvent) {
            const nsElement = Array.from(document.querySelectorAll('.namespace')).find(nsdoc => nsdoc.getAttribute('ns') === namespace.ns) ;
            nsElement.addEventListener('click', (ev) => {
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