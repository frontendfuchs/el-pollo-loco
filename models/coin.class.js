import { MovableObject } from "./movable-object.class.js";

/**
 * A collectible coin object.
 * Extends MovableObject with a fixed size and collision offsets.
 */
export class Coin extends MovableObject {
    /** Height of the coin in pixels. */
    height = 100;

    /** Width of the coin in pixels. */
    width = 100;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };

    /**
     * Creates a new Coin at the given position.
     * @param {number} x - X-position on the canvas.
     * @param {number} y - Y-position on the canvas.
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img/8_coin/coin_2.png');
        this.x = x;
        this.y = y;
    }
}