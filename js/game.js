import { Keyboard } from '../models/keyboard.class.js';
import { World } from '../models/world.class.js';
import { IntervalHub } from '../helper_classes/intervalhub-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

/** @type {HTMLCanvasElement|null} */
let canvas;

/** @type {World|null} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/**
 * Cached references to frequently used DOM elements.
 */
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
    homeBtn: document.getElementById('home-btn'),
    winScreen: document.getElementById('win-screen'),
    restartBtnWin: document.getElementById('restart-btn-win'),
    homeBtnWin: document.getElementById('home-btn-win'),
    soundToggleBtn: document.getElementById('sound-toggle-btn')
};

/**
 * Initializes the game world and canvas.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, showGameOverScreen, showWinScreen);
}

/**
 * Starts the game: plays sounds, hides UI elements, and initializes the world.
 */
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
    document.body.classList.add('game-running');
    init();
}

/**
 * Restarts the game by stopping all sounds and intervals, then reloading the page.
 */
function restartGame() {
    SoundHelper.stopAll();
    IntervalHub.stopAllIntervals();
    location.reload();
}

/**
 * Shows the game over screen.
 */
function showGameOverScreen() {
    document.body.classList.remove('game-running');
    if (elements.gameOverScreen) {
        elements.gameOverScreen.classList.add('show');
    }
}

/**
 * Shows the win screen.
 */
function showWinScreen() {
    document.body.classList.remove('game-running');
    if (elements.winScreen) {
        elements.winScreen.classList.add('show');
    }
}

// --- Event Listeners for Start, Restart, Home ---
if (elements.startBtn) {
    elements.startBtn.addEventListener('click', startGame);
}
if (elements.restartBtn) {
    elements.restartBtn.addEventListener('click', restartGame);
}
if (elements.restartBtnWin) {
    elements.restartBtnWin.addEventListener('click', restartGame);
}
if (elements.homeBtn) {
    elements.homeBtn.addEventListener('click', restartGame);
}
if (elements.homeBtnWin) {
    elements.homeBtnWin.addEventListener('click', restartGame);
}

/**
 * Binds touch controls to a DOM element for a specific keyboard key.
 * @param {HTMLElement|null} el - The touch control element.
 * @param {string} key - The key name on the keyboard object (e.g. 'LEFT', 'SPACE').
 */
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

/**
 * Opens the info dialog.
 */
function openDialog() {
    if (elements.dialog) {
        elements.dialog.showModal();
    }
}

/**
 * Closes the info dialog.
 */
function closeDialog() {
    if (elements.dialog) {
        elements.dialog.close();
    }
}

/**
 * Checks if the start screen is currently visible.
 * @returns {boolean} True if the start screen is visible, false otherwise.
 */
function isStartScreenVisible() {
    return elements.startScreen && elements.startScreen.style.display !== 'none';
}

/**
 * Toggles the info dialog open/closed, but only when the start screen is visible.
 */
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

if (elements.infoBtn) {
    elements.infoBtn.addEventListener('click', toggleInfoDialog);
}
if (elements.closeBtn) {
    elements.closeBtn.addEventListener('click', closeDialog);
}

SoundHelper.init();
if (elements.soundToggleBtn) {
    elements.soundToggleBtn.addEventListener('click', () => SoundHelper.toggleSound());
}

// --- Keyboard Events ---
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
});