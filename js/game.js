import { Keyboard } from '../models/keyboard.class.js';
import { World } from '../models/world.class.js';

let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    // 1. Startbildschirm ausblenden
    document.getElementById('start-screen').style.display = 'none';
    
    // 2. NEU: Titel-Bild holen und die Pop-up Klasse hinzufügen
    let titleImg = document.getElementById('title-img');
    if (titleImg) {
        titleImg.classList.add('show-title');
    }
    init(); 
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


// --- EVENT LISTENER ---

// Klick-Event für den Start-Button
const startBtn = document.querySelector('.start-btn');
if (startBtn) {
    startBtn.addEventListener('click', startGame);
}



// --- TASTATUR EVENTS ---

window.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    } 
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }  
    if (event.code == 'ArrowUp') {
        keyboard.UP = true;
    }  
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }  
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }  
    if (event.code =='KeyD'){
        keyboard.D = true;
    }
    // console.log(event.code);
    // console.log(keyboard.LEFT);
    
});

window.addEventListener('keyup', (event) => {
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    } 
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }  
    if (event.code == 'ArrowUp') {
        keyboard.UP = false;
    }  
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }  
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }  
    if (event.code =='KeyD'){
        keyboard.D = false;
    }
    // console.log(keyboard.LEFT);
    
});