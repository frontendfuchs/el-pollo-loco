import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

/**
 * A normal adult chicken enemy.
 * Extends MovableObject with walking and death animations.
 */
export class Chicken extends MovableObject {
    /** Image frames for walking animation. */
    IMAGES_WALKING = ImageHelper.CHICKEN.IMAGES_WALKING;

    /** Image frames for death animation. */
    IMAGES_DEAD = ImageHelper.CHICKEN.IMAGES_CHICKEN_DEAD;

    /** Y-position on the canvas. */
    y = 370;

    /** Height of the chicken in pixels. */
    height = 70;

    /** Width of the chicken in pixels. */
    width = 60;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
    };

    /**
     * Creates a new Chicken at a random X-position with random speed.
     */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts animation intervals for movement and frame updates.
     * Moves the chicken left and switches between walking and death animations.
     */
    animate() {
        IntervalHub.startInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                this.playAnimationDead(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}