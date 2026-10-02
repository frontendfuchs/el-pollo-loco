import { DrawableObject } from "./drawable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

/**
 * Status bar showing the player's health/energy.
 * Extends DrawableObject and changes image based on percentage.
 */
export class StatusBar extends DrawableObject {
    /** Image frames for the health status bar. */
    STATUSBAR = ImageHelper.STATUSBAR.IMAGES_HEALTH;

    /** Current percentage of health/energy (0–100). */
    percentage = 100;

    /**
     * Creates a new StatusBar and sets initial position and size.
     */
    constructor() {
        super();
        this.loadImages(this.STATUSBAR);
        this.x = 20;
        this.y = 15;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Updates the percentage and sets the corresponding status bar image.
     * @param {number} percentage - Current percentage of health/energy (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} Index of the image to display (0–5).
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}