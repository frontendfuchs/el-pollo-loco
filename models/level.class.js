/**
 * Represents a game level with all its objects.
 * Holds enemies, clouds, background layers, bottles, and coins.
 */
export class Level {
    /** Array of enemy objects in this level. */
    enemies;

    /** Array of cloud objects in this level. */
    clouds;

    /** Array of background objects in this level. */
    backgroundObjects;

    /** Array of bottle objects in this level. */
    bottles;

    /** Array of coin objects in this level. */
    coin;

    /** X-position where the level ends. */
    level_end_x = 2200;

    /**
     * Creates a new Level with the given objects.
     * @param {Array} enemies - Array of enemy instances.
     * @param {Array} clouds - Array of cloud instances.
     * @param {Array} backgroundObjects - Array of background object instances.
     * @param {Array} bottles - Array of bottle instances.
     * @param {Array} coin - Array of coin instances.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coin = coin;
    }
}