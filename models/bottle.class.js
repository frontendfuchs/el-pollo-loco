import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * A throwable salsa bottle object.
 * Extends MovableObject with fixed size and collision offsets.
 */
export class Bottle extends MovableObject {

    /** Array of bottle images for animation (on ground state). */
    IMAGES_BOTTLE = ImageHelper.BOTTLE.ON_GROUND;

    /** Height of the bottle in pixels. */
    height = 60;

    /** Width of the bottle in pixels. */
    width = 60;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 15,
        left: 20,
        right: 20,
        bottom: 15
    };

    /**
     * Creates a new Bottle at the given position.
     * @param {number} x - X-position on the canvas.
     * @param {number} y - Y-position on the canvas.
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
    }
}