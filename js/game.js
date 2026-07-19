import { Keyboard } from '../models/keyboard.class.js';
import { World } from '../models/world.class.js';

let canvas;
let world;
let keyboard = new Keyboard();

const elements = {
    startScreen: document.getElementById('start-screen'),
    gameDescription: document.querySelector('.game-description'),
    titleImg: document.getElementById('title-img'),
    canvas: document.getElementById('canvas'),
    startBtn: document.querySelector('.start-btn'),
    infoBtn: document.querySelector('.info-btn'),
    dialog: document.getElementById('info-dialog'),
    closeBtn: document.getElementById('close-btn'),
    gameOverScreen: document.getElementById('game-over-screen'),
    restartBtn: document.getElementById('restart-btn')
};

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, showGameOverScreen);
}

function startGame() {
    if (elements.startScreen) {
        elements.startScreen.style.display = 'none';
    }

    if (elements.gameDescription) {
        elements.gameDescription.style.display = 'none';
    }

    if (elements.titleImg) {
        elements.titleImg.classList.add('show-title');
    }

    init();
}

function restartGame() {
    location.reload();
}

function showGameOverScreen() {
    if (elements.gameOverScreen) {
        elements.gameOverScreen.classList.add('show');
    }
}


// Klick-Event für den Start-Button
if (elements.startBtn) {
    elements.startBtn.addEventListener('click', startGame);
}

// Restart-Button im Game-Over-Screen
if (elements.restartBtn) {
    elements.restartBtn.addEventListener('click', restartGame);
}


// --- INFO DIALOG ---
function openDialog() {
    if (elements.dialog) {
        elements.dialog.showModal();
    }
}

function closeDialog() {
    if (elements.dialog) {
        elements.dialog.close();
    }
}

// Listener für den Dialog
if (elements.infoBtn) {
    elements.infoBtn.addEventListener('click', openDialog);
}

if (elements.closeBtn) {
    elements.closeBtn.addEventListener('click', closeDialog);
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
    if (event.code == 'KeyD') {
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
    if (event.code == 'KeyD') {
        keyboard.D = false;
    }
    // console.log(keyboard.LEFT);

});