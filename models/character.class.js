import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";
import { SoundHelper } from "../helper_classes/sound-helper.js";

/**
 * The main player character (Pepe).
 * Extends MovableObject with movement, animation, and idle behavior.
 */
export class Character extends MovableObject {

    /** Image frames for walking animation. */
    IMAGES_WALKING = ImageHelper.CHARACTER.IMAGES_WALKING;

    /** Image frames for jumping animation. */
    IMAGES_JUMPING = ImageHelper.CHARACTER.IMAGES_JUMPING;

    /** Image frames for death animation. */
    IMAGES_DEAD = ImageHelper.CHARACTER.IMAGES_DEAD;

    /** Image frames for hurt animation. */
    IMAGES_HURT = ImageHelper.CHARACTER.IMAGES_HURT;

    /** Image frames for idle animation. */
    IMAGES_IDLE = ImageHelper.CHARACTER.IMAGES_IDLE;

    /** Image frames for long idle (sleeping) animation. */
    IMAGES_LONG_IDLE = ImageHelper.CHARACTER.IMAGES_LONG_IDLE;

    /** Height of the character in pixels. */
    height = 280;

    /** Width of the character in pixels. */
    width = 120;

    /** Y-position on the canvas. */
    y = 50;

    /** Horizontal movement speed. */
    speed = 5;

    /** Flag indicating if Pepe is dead. */
    pepeIsDead = false;

    /** Timestamp of the last movement action (ms). */
    lastMove = new Date().getTime();

    /** Flag indicating if the character is currently moving. */
    isMoving = false;

    /** Flag indicating if the snoring sound has already started. */
    snoringStarted = false;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 110,
        right: 16,
        bottom: 10,
        left: 16,
    };

    /** Real frame X-coordinate for precise collision. */
    rx;

    /** Real frame Y-coordinate for precise collision. */
    rY;

    /** Real frame width for precise collision. */
    rW;

    /** Real frame height for precise collision. */
    rH;

    /**
     * Creates a new Character, loads images, and starts animations.
     */
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.getRealFrame();
    }

    /**
     * Starts all animation intervals for movement, frames, and idle behavior.
     */
    animate() {
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 50);
        IntervalHub.startInterval(() => this.updateIdle(), 200);
    }

    /**
     * Updates movement logic each frame.
     * Stops early if the character is dead.
     */
    updateMovement() {
        if (this.isDead()) {
            return;
        }
        this.updateMovementState();
        this.updateMovementInput();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Updates the moving state and plays/stops the running sound.
     */
    updateMovementState() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {
            this.lastMove = new Date().getTime();
        }
        const wasMoving = this.isMoving;
        this.isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
        if (this.isMoving && !wasMoving) {
            SoundHelper.play(SoundHelper.characterRun, 0.3);
        } else if (!this.isMoving && wasMoving) {
            SoundHelper.stop(SoundHelper.characterRun);
        }
    }

    /**
     * Handles keyboard input for left, right, jump, and throw.
     */
    updateMovementInput() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }

    /**
     * Updates the animation frames based on the current state.
     */
    updateAnimation() {
        if (this.isDead() && !this.pepeIsDead) {
            this.playAnimationDead(this.IMAGES_DEAD);
            if (this.checkGameStatus()) {
                this.pepeIsDead = true;
            }
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (!this.isDead()) {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Updates idle or long-idle (sleeping) animation when the character is not moving.
     */
    updateIdle() {
        const isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
        if (this.isDead() || this.isHurt() || this.isAboveGround() || isMoving) {
            this.snoringStarted = false;
            return;
        }
        this.playIdleAnimation();
    }

    /**
     * Plays idle or long-idle animation and starts snoring sound after 5 seconds of inactivity.
     */
    playIdleAnimation() {
        const timePassed = (new Date().getTime() - this.lastMove) / 1000;
        if (timePassed >= 5) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!this.snoringStarted) {
                SoundHelper.play(SoundHelper.characterSnoring, 0.3);
                this.snoringStarted = true;
            }
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}