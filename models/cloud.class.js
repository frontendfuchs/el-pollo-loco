import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

/**
 * A background cloud object that slowly moves left.
 * Extends MovableObject with a fixed size.
 */
export class Cloud extends MovableObject {
    /** Y-position on the canvas. */
    y = 30;

    /** Width of the cloud in pixels. */
    width = 500;

    /** Height of the cloud in pixels. */
    height = 200;

    /**
     * Creates a new Cloud at the given X-position.
     * @param {number} x - X-position on the canvas.
     */
    constructor(x) {
        super().loadImage("assets/img/5_background/layers/4_clouds/1.png");
        this.x = x;
        this.animate();
    }

    /**
     * Starts an interval to move the cloud left continuously.
     */
    animate() {
        IntervalHub.startInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}