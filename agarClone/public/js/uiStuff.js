// set the hight and width of canvas = window
let wHeight = window.innerHeight
let wWidth = window.innerHeight

const canvas = document.querySelector('#the-canvas');
const context = canvas.getContext('2d')
canvas.height = wHeight;
canvas.width = wWidth;

let player = {} //This will be all things "this" player
let orbs = [] ; //This is global fro all non-player orbs 
let players = []; 

const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const spawnModal = new bootstrap.Modal(document.getElementById('spawnModal'));

window.addEventListener('DOMContentLoaded', (event) => {
    
    loginModal.show(); // Show the modal
});

document.querySelector('.name-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    // console.log('submitted!')
    player.name = document.querySelector('#name-input').value
    document.querySelector('.player-name').textContent = player.name 
    loginModal.hide();
    spawnModal.show(); 
    init(); 
})

document.querySelector('.start-game').addEventListener('click', (ev)=> {
    spawnModal.hide(); 
    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'))
    elArray.forEach(el => el.removeAttribute('hidden'))
})
