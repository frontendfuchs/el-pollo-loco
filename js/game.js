import { Keyboard } from '../models/keyboard.class.js';
import { World } from '../models/world.class.js';
import { IntervalHub } from '../helper_classes/intervalhub-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

let canvas;
let world;
let keyboard = new Keyboard();

const elements = {
    startScreen: document.getElementById('start-screen'),
    gameContainer: document.querySelector('.game-container'),
    gameDescription: document.querySelector('.game-description'),
    titleImg: document.getElementById('title-img'),
    canvas: document.getElementById('canvas'),
    startBtn: document.querySelector('.start-btn'),
    infoBtn: document.getElementById('info-btn'),
    dialog: document.getElementById('info-dialog'),
    closeBtn: document.getElementById('close-btn'),
    gameOverScreen: document.getElementById('game-over-screen'),
    restartBtn: document.getElementById('restart-btn'),
    winScreen: document.getElementById('win-screen'),
    restartBtnWin: document.getElementById('restart-btn-win'),
    soundToggleBtn: document.getElementById('sound-toggle-btn')
};


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, showGameOverScreen, showWinScreen);
}


function startGame() {
    SoundHelper.play(SoundHelper.gameStart, 0.5);
    SoundHelper.playBg();
    if (elements.startScreen) {
        elements.startScreen.style.display = 'none';
    }
    if (elements.infoBtn) {
        elements.infoBtn.style.display = 'none';
    }
    if (elements.gameDescription) {
        elements.gameDescription.style.display = 'none';
    }
    if (elements.titleImg) {
        elements.titleImg.classList.add('show-title');
    }
    if (elements.gameContainer) {
        elements.gameContainer.classList.add('game-running');
    }
    init();
}


function restartGame() {
    SoundHelper.stopAll();
    IntervalHub.stopAllIntervals();
    location.reload();
}


function showGameOverScreen() {
    if (elements.gameOverScreen) {
        elements.gameOverScreen.classList.add('show');
    }
}


function showWinScreen() {
    if (elements.winScreen) {
        elements.winScreen.classList.add('show');
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
//Restart-Button you Win Screen
if (elements.restartBtnWin) {
    elements.restartBtnWin.addEventListener('click', restartGame);
}


// --- TOUCH CONTROLS (mobile) ---
function bindTouchControl(el, key) {
    if (!el) {
        return;
    }
    const press = (event) => {
        event.preventDefault();
        keyboard[key] = true;
        el.classList.add('pressed');
    };
    const release = (event) => {
        event.preventDefault();
        keyboard[key] = false;
        el.classList.remove('pressed');
    };
    el.addEventListener('pointerdown', press);
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('pointerleave', release);
    el.addEventListener('contextmenu', (event) => event.preventDefault());
}

bindTouchControl(document.getElementById('touch-left'), 'LEFT');
bindTouchControl(document.getElementById('touch-right'), 'RIGHT');
bindTouchControl(document.getElementById('touch-jump'), 'SPACE');
bindTouchControl(document.getElementById('touch-throw'), 'D');


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


function isStartScreenVisible() {
    return elements.startScreen && elements.startScreen.style.display !== 'none';
}


function toggleInfoDialog() {
    if (!isStartScreenVisible() || !elements.dialog) {
        return;
    }
    if (elements.dialog.open) {
        closeDialog();
    } else {
        openDialog();
    }
}


// Listener für den Dialog
if (elements.infoBtn) {
    elements.infoBtn.addEventListener('click', toggleInfoDialog);
}
if (elements.closeBtn) {
    elements.closeBtn.addEventListener('click', closeDialog);
}
// Sound-Toggle-Button
SoundHelper.init();
if (elements.soundToggleBtn) {
    elements.soundToggleBtn.addEventListener('click', () => SoundHelper.toggleSound());
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
    if (event.code == 'KeyI') {
        toggleInfoDialog();
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