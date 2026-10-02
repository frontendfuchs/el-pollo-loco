import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

/**
 * Base class for all moving objects in the game.
 * Extends DrawableObject with physics, collision, and health logic.
 */
//wir haben eine Schablone erstellt wo wir sagen welche Felder dort drin sein sollen
export class MovableObject extends DrawableObject {
    /** Horizontal movement speed. */
    speed = 0.15;

    /** Flag for facing direction (true = left). */
    otherDirection = false;

    /** Vertical velocity for jumping and gravity. */
    speedY = 0;

    /** Gravity acceleration applied to speedY. */
    acceleration = 0.64;

    /** Current energy/health of the object. */
    energy = 100;

    /** Timestamp of the last hit (ms). */
    lastHit = 0;

    /** Flag indicating if the object has already died. */
    hasDied = false;

    /** Timestamp when the object died (ms). */
    deathTime = 0;

    /** Flag indicating if the object can be thrown (e.g. bottle). */
    isThrowable = false;

    /**
     * Starts a gravity interval that updates vertical position and velocity.
     */
    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above ground (in the air).
     * @returns {boolean} True if the object is above ground or throwable.
     */
    isAboveGround() {
        if (this.isThrowable) {
            return true;
        } else {
            return this.y < 160;
        }
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting vertical velocity.
     */
    jump() {
        this.speedY = 14;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * Uses the real frame (with offsets) for collision detection.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} True if the objects are colliding.
     */
    //character.iscollifding(chicken)
    isColliding(mo) {
        this.getRealFrame();
        mo.getRealFrame();
        return this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH;
    }

    /**
     * Calculates the real collision frame using offsets.
     * Sets rX, rY, rW, rH for precise collision detection.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Reduces energy by 5 and marks the object as hurt or dead.
     * Stores the last hit time for hurt animation timing.
     */
    //new Date().getTime() = so speichert man Zeit in Zahlenform
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Marks the object as dead, stops movement, and records death time.
     * Prevents multiple death triggers via hasDied flag.
     */
    die() {
        if (this.hasDied) {
            return;
        }
        this.hasDied = true;
        this.energy = 0;
        this.speed = 0;
        this.deathTime = new Date().getTime();
    }

    /**
     * Checks if the object is currently in hurt state (within 1 second of last hit).
     * @returns {boolean} True if the object was hit less than 1 second ago.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diff in ms
        timepassed = timepassed / 1000; // Diff in s
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (energy <= 0).
     * @returns {boolean} True if the object's energy is 0 or less.
     */
    isDead() {
        return this.energy <= 0;
    }
}