/**
 * Base class for all drawable objects on the canvas.
 * Provides image loading, caching, drawing, and animation helpers.
 */
export class DrawableObject {
    /** X-position on the canvas. */
    x = 120;

    /** Y-position on the canvas. */
    y = 280;

    /** Current image to draw. */
    img;

    /** Height of the object in pixels. */
    height = 150;

    /** Width of the object in pixels. */
    width = 100;

    /** Cache for preloaded images by path. */
    imageCache = {};

    /** Current frame index for animations. */
    currentImage = 0;

    /** Currently playing animation array. */
    currentAnimation = '';

    /** Current frame index for death animation. */
    currentImageDead = 1;

    /** Counter for how many times the death animation has looped. */
    playAnimationDeadCount = 0;

    /** Collision offset in pixels for finer hit detection. */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * Loads a single image from the given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images and stores them in the image cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a red debug frame around the collision box.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = "red";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom,
        );
        ctx.stroke();
    }

    /**
     * Plays an animation by cycling through an array of image paths.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the death animation and loops it three times.
     * @param {string[]} images - Array of image paths for the death animation.
     */
    playAnimationDead(images) {
        let i = this.currentImageDead % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageDead++;
        if (i == 0) {
            this.currentImageDead = 1;
            this.playAnimationDeadCount++;
            return;
        }
    }

    /**
     * Checks if the death animation has completed three loops.
     * @returns {boolean} True if the death animation has played three times, false otherwise.
     */
    checkGameStatus() {
        return this.playAnimationDeadCount == 3;
    }
}