import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

/**
 * The final boss enemy.
 * Extends MovableObject with multiple animation states and energy system.
 */
export class Endboss extends MovableObject {

    /** Image frames for walking animation. */
    IMAGES_WALKING_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_WALKING;

    /** Image frames for alert state animation. */
    IMAGES_ALERT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ALERT;

    /** Image frames for attack animation. */
    IMAGES_ATTACK_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ATTACK;

    /** Image frames for hurt animation. */
    IMAGES_HURT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_HURT;

    /** Image frames for death animation. */
    IMAGES_DEAD_ENDBOSS = ImageHelper.ENDBOSS.IMAGEAS_DEAD;

    /** Height of the boss in pixels. */
    height = 400;

    /** Width of the boss in pixels. */
    width = 250;

    /** Y-position on the canvas. */
    y = 60;

    /** Horizontal movement speed. */
    speed = 2;

    /** Current energy of the boss. */
    energy = 25;

    /** Maximum energy of the boss. */
    maxEnergy = 25;

    /** Flag indicating if the first contact with the player has happened. */
    hasFirstContact = false;

    /** Flag indicating if the boss is in alert state. */
    isAlert = false;

    /** Flag indicating if the boss is currently attacking. */
    isAttacking = false;

    /** Flag indicating if the boss death animation is complete. */
    endBossIsDead = false;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 70,
        right: 10,
        bottom: 20,
        left: 35,
    };

    /**
     * Creates a new Endboss, loads all images, and starts animations.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.x = 2500;
        this.animate();
    }

    /**
     * Starts animation intervals for state-based frame updates and movement.
     * Handles death, hurt, attack, walking, and alert animations.
     */
    animate() {
        IntervalHub.startInterval(() => {
            if (this.isDead() && !this.endBossIsDead) {
                this.playAnimationDead(this.IMAGES_DEAD_ENDBOSS);
                if (this.checkGameStatus()) {
                    this.endBossIsDead = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_ENDBOSS);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK_ENDBOSS);
            } else if (this.hasFirstContact) {
                this.playAnimation(this.IMAGES_WALKING_ENDBOSS);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            }
        }, 200);

        IntervalHub.startInterval(() => {
            if (this.hasFirstContact && !this.isDead() && !this.isAttacking) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }
}