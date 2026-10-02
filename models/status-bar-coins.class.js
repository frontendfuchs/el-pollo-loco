import { DrawableObject } from "./drawable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

/**
 * Status bar showing the number of collected coins.
 * Extends DrawableObject and changes image based on percentage.
 */
export class StatusBarCoins extends DrawableObject {
    /** Image frames for the coin status bar. */
    IMAGES_COINS_STATUS = ImageHelper.STATUSBAR.IMAGES_COINS;

    /** Current percentage of coins collected (0–100). */
    percentage = 0;

    /**
     * Creates a new StatusBarCoins and sets initial position and size.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS_STATUS);
        this.x = 20;
        this.y = 70;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the percentage and sets the corresponding status bar image.
     * @param {number} percentage - Current percentage of coins collected (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS_STATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} Index of the image to display (0–5).
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}