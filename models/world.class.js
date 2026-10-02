import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ChickenBaby } from "./chicken.baby.class.js";
import { Cloud } from "./cloud.class.js";
import { StatusBar } from "./status-bar.class.js";
import { StatusBarCoins } from "./status-bar-coins.class.js";
import { StatusBarBottle } from "./status-bar-bottles.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { StatusBarEndBoss } from "./status-bar-endbossclass.js";
import { Endboss } from "./endboss.class.js";
import { SoundHelper } from "../helper_classes/sound-helper.js";

/**
 * Main game world managing all objects, collisions, and game state.
 * Handles drawing, updates, and win/lose conditions.
 */
export class World {
    /** Status bar for player health. */
    statusBar = new StatusBar();

    /** Status bar for collected coins. */
    statusBarCoins = new StatusBarCoins();

    /** Status bar for collected bottles. */
    statusBarBottle = new StatusBarBottle();

    /** Status bar for Endboss health. */
    statusBarEndBoss = new StatusBarEndBoss();

    /** Main player character. */
    character = new Character();

    /** Current level data (enemies, coins, bottles, etc.). */
    level = level1;

    /** Number of coins collected so far. */
    collectedCoins = 0;

    /** Total number of coins in the level. */
    allCoins = this.level.coin.length;

    /** Number of bottles collected so far. */
    collectedBottles = 0;

    /** Total number of bottles in the level. */
    allBottles = this.level.bottles.length;

    /** Canvas element for rendering. */
    canvas;

    /** Keyboard input object. */
    keyboard;

    /** Canvas 2D rendering context. */
    ctx;

    /** Camera offset for horizontal scrolling. */
    camera_x = 0;

    /** Array of thrown bottle objects. */
    throwableObjects = [];

    /** Callback function triggered on game over. */
    onGameOver;

    /** Callback function triggered on game win. */
    onGameWin;

    /** Flag indicating if the game is over. */
    gameOver = false;

    /** Flag indicating if the game is won. */
    gameWin = false;

    /**
     * Creates a new World, initializes canvas, input, and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard input object.
     * @param {Function} onGameOver - Callback for game over event.
     * @param {Function} onGameWin - Callback for game win event.
     */
    constructor(canvas, keyboard, onGameOver, onGameWin) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.onGameOver = onGameOver;
        this.onGameWin = onGameWin;
        this.allCoins = this.level.coin.length;
        this.allBottles = this.level.bottles.length;
        this.setWorld();
        this.draw();
    }

    /**
     * Links the world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs all game logic checks (collisions, collectibles, win/lose).
     * Skips updates if the game is over or won.
     */
    update() {
        if (this.gameOver || this.gameWin) {
            return;
        }
        this.checkJumpOnEnemy();
        this.checkEnemyAttack();
        this.checkThrowObjects();
        this.checkBottleHits();
        this.collectCoin();
        this.collectBottle();
        this.checkEndbossContact();
        this.checkGameOver();
        this.checkGameWin();
        this.removeDeadEnemy();
        this.removeSplashedBottles();
    }

    /**
     * Checks if the character is dead and triggers game over.
     */
    checkGameOver() {
        if (this.character.isDead() && this.character.checkGameStatus()) {
            this.gameOver = true;
            SoundHelper.stopAll();
            SoundHelper.play(SoundHelper.characterDead, 0.7);
            IntervalHub.stopAllIntervals();
            if (this.onGameOver) {
                this.onGameOver();
            }
        }
    }

    /**
     * Checks if the Endboss is dead and triggers game win.
     */
    checkGameWin() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isDead() && enemy.checkGameStatus()) {
                this.gameWin = true;
                SoundHelper.stopAll();
                IntervalHub.stopAllIntervals();
                if (this.onGameWin) {
                    this.onGameWin();
                }
            }
        });
    }

    /**
     * Checks if the Endboss is currently visible on screen.
     * @returns {boolean} True if the Endboss is within the visible canvas area.
     */
    isEndbossVisible() {
        return this.level.enemies.some((enemy) => {
            if (!(enemy instanceof Endboss)) {
                return false;
            }
            const screenX = enemy.x + this.camera_x;
            return screenX + enemy.width > 0 && screenX < this.canvas.width;
        });
    }

    /**
     * Handles Endboss state transitions: alert, walking, and attacking.
     */
    checkEndbossContact() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                // 1. ALERT:
                if (this.character.x > 1500 && this.character.x <= 2100 && !enemy.hasFirstContact && !enemy.isAlert) {
                    enemy.isAlert = true;
                    SoundHelper.play(SoundHelper.endbossApproach, 0.5);
                }
                // 2. WALKING:
                if (this.character.x > 2100) {
                    enemy.isAlert = false;
                    enemy.hasFirstContact = true;
                }
                // 3. ATTACK:
                if (this.character.isColliding(enemy)) {
                    enemy.isAttacking = true;
                } else {
                    enemy.isAttacking = false;
                }
            }
        });
    }

    /**
     * Handles throwing a bottle when D is pressed and bottles are available.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject();
            let direction = this.character.otherDirection ? -1 : 1;
            let startX = direction === 1 ? this.character.x + 90 : this.character.x - 20;
            bottle.throw(startX, this.character.y + 120, direction);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            SoundHelper.play(SoundHelper.bottleBreak, 0.5);
            this.updateBottleStatusBar();
            this.keyboard.D = false;
        }
    }

    /**
     * Checks if the character jumps on enemies and kills them.
     */
    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) return;
            if (this.character.isDead()) return;
            if (!this.character.isColliding(enemy)) return;

            if (enemy instanceof ChickenBaby) {
                enemy.die();
                this.character.speedY = 3.5;
                SoundHelper.play(SoundHelper.babychick, 0.5);
            } else if (this.character.isAboveGround()) {
                enemy.die();
                this.character.speedY = 3.5;
                SoundHelper.play(SoundHelper.chickenDead, 0.5);
            }
        });
    }

    /**
     * Checks if enemies collide with the character and apply damage.
     */
    checkEnemyAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                return;
            }
            if (
                !this.character.isDead() &&
                !this.character.isHurt() &&
                !this.character.isAboveGround() &&
                this.character.isColliding(enemy)
            ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                SoundHelper.play(SoundHelper.characterDamage, 0.5);
            }
        });
    }

    /**
     * Checks if thrown bottles hit enemies and applies damage.
     */
    checkBottleHits() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (!enemy.isDead() && !bottle.hasHit && bottle.isColliding(enemy)) {
                    bottle.hit();
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        this.statusBarEndBoss.setPercentage(
                            (enemy.energy / enemy.maxEnergy) * 100
                        );
                    } else {
                        enemy.die();
                    }
                }
            });
        });
    }

    /**
     * Removes dead enemies from the level after a short delay.
     */
    removeDeadEnemy() {
        this.level.enemies = this.level.enemies.filter((enemy) => {
            if (enemy instanceof Endboss) {
                return true;
            }
            if (!enemy.isDead()) {
                return true;
            }
            let timePassed = new Date().getTime() - enemy.deathTime;
            timePassed = timePassed / 1000;
            return timePassed < 0.7;
        });
    }

    /**
     * Removes thrown bottles that have finished their splash animation.
     */
    removeSplashedBottles() {
        this.throwableObjects = this.throwableObjects.filter((bottle) => {
            return !bottle.hasHit || bottle.splashing;
        });
    }

    /**
     * Collects coins when the character collides with them.
     */
    collectCoin() {
        this.level.coin = this.level.coin.filter((coin) => {
            const collision = this.character.isColliding(coin);

            if (collision) {
                this.collectedCoins++;
                this.updateCoinStatusBar();
                SoundHelper.play(SoundHelper.collectCoin, 0.5);
            }
            return !collision;
        });
    }

    /**
     * Updates the coin status bar based on collected coins.
     */
    updateCoinStatusBar() {
        const percentage = (this.collectedCoins / this.allCoins) * 100;
        this.statusBarCoins.setPercentage(percentage);
    }

    /**
     * Collects bottles when the character collides with them.
     */
    collectBottle() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            const collision = this.character.isColliding(bottle);
            if (collision) {
                this.collectedBottles++;
                this.updateBottleStatusBar();
                SoundHelper.play(SoundHelper.bottleCollect, 0.5);
            }
            return !collision;
        });
    }

    /**
     * Updates the bottle status bar based on collected bottles.
     */
    updateBottleStatusBar() {
        const percentage = (this.collectedBottles / this.allBottles) * 100;
        this.statusBarBottle.setPercentage(percentage);
    }

    /**
     * Main render loop: clears canvas, draws all objects, and requests next frame.
     */
    draw() {
        this.update();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        // ----- space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        if (this.isEndbossVisible()) {
            this.addToMap(this.statusBarEndBoss);
        }
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all objects in an array.
     * @param {Array} objects - Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single movable object, handling direction flipping.
     * @param {MovableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the canvas context horizontally for left-facing objects.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after flipping.
     * @param {MovableObject} mo - The object that was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}