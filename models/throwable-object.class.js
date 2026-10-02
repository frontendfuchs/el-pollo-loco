import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

/**
 * A throwable object (e.g. salsa bottle).
 * Extends MovableObject with rotation, splash animation, and throw logic.
 */
export class ThrowableObject extends MovableObject {
    /** Image frames for rotating bottle animation. */
    IMAGES_ROTATION = ImageHelper.BOTTLE.IMAGES_ROTATION;

    /** Image frames for splash animation on impact. */
    IMAGES_SPLASH = ImageHelper.BOTTLE.IMAGES_SPLASH;

    /** Flag indicating if the splash animation is currently playing. */
    splashing = false;

    /**
     * Creates a new ThrowableObject at the given position.
     * @param {number} x - X-position on the canvas.
     * @param {number} y - Y-position on the canvas.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.isThrowable = true;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
    }

    /**
     * Throws the bottle from the given position with horizontal and vertical movement.
     * @param {number} x - Starting X-position.
     * @param {number} y - Starting Y-position.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        this.animate();
        IntervalHub.startInterval(() => {
            if (!this.hasHit) {
                this.x += 14;
            }
        }, 25);
    }

    /**
     * Starts the rotation animation interval for the thrown bottle.
     */
    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 300);
    }

    /**
     * Handles impact: stops movement, starts splash animation, and switches frames.
     */
    hit() {
        this.hasHit = true;
        this.splashing = true;
        this.speedY = 0;
        this.splashFrame = 0;
        this.splashInterval = IntervalHub.startInterval(() => {
            if (this.splashFrame < this.IMAGES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_SPLASH[this.splashFrame]];
                this.splashFrame++;
            } else {
                clearInterval(this.splashInterval);
                this.splashing = false;
            }
        }, 100);
    }
}