import { DrawableObject } from "./drawable-object.class.js";

/**
 * A scrollable background layer object.
 * Extends DrawableObject with a fixed size of 720x480.
 */
export class BackgroundObject extends DrawableObject {
    /** Width of the background object in pixels. */
    width = 720;

    /** Height of the background object in pixels. */
    height = 480;

    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X-position for horizontal scrolling.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}