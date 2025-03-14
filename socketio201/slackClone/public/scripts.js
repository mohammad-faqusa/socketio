
const socket = io(); 

const nsContainer = document.querySelector('.namespaces')

const namespaces = []; 
let lasClickedNs = ''; 

socket.on('nsList', nsData => {
    nsData.forEach(namespace => {
        if(!namespaces[namespace.id]) {
            const nsDoc = `<div class="namespace" ns="${namespace.ns}"><img src="${namespace.image}"></div>`;
            nsContainer.innerHTML += nsDoc;
            namespaces[namespace.id] = namespace

            const thisNs = io(`http://localhost:3000${namespace.ns}`);
            thisNs.on('nsChange', (data) => {
                console.log(`Namespace ${data.ns} Changed!`)
                console.log(data); 
                namespaces[namespace.id] = data;
                
                if(lasClickedNs === namespace.ns) {
                    joinNs(namespaces[namespace.id]); 
                }
            
            })
        }
        
    });
    nsData.forEach(namespace => {
        if(!namespaces[namespace.id].clickEvent) {
            const nsElement = Array.from(document.querySelectorAll('.namespace')).find(nsdoc => nsdoc.getAttribute('ns') === namespace.ns) ;
            nsElement.addEventListener('click', (ev) => {
                joinNs(namespaces[namespace.id])
                lasClickedNs = namespace.ns; 
            })
            namespaces[namespace.id].clickEvent = true; 
        }
    });
    const lastEndpoint = localStorage.getItem('lastNs')
    if(lastEndpoint){
        joinNs(namespaces.find(namespace => namespace.ns === lastEndpoint))
    }

})

const socket2 = io('/wiki'); 
socket2.on('clientConnected', data => console.log(data))

socket2.on('change-ns', data => {
    namespaces.indexOf(namespaces.find(namespace => namespace.ns === data.ns)) = data; 
})