// set the hight and width of canvas = window
let wHeight = window.innerHeight
let wWidth = window.innerHeight

const canvas = document.querySelector('#the-canvas');
const context = canvas.getContext('2d')
canvas.height = wHeight;
canvas.width = wWidth;

const player = {} //This will be all things "this" player


const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const spawnModal = new bootstrap.Modal(document.getElementById('spawnModal'));

window.addEventListener('DOMContentLoaded', (event) => {
    
    loginModal.show(); // Show the modal
});

document.querySelector('.name-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    // console.log('submitted!')
    player.name = document.querySelector('#name-input').value
    loginModal.hide();
    spawnModal.show(); 
})