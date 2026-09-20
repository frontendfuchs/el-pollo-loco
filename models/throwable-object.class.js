import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = ImageHelper.BOTTLE.IMAGES_ROTATION;
    IMAGES_SPLASH = ImageHelper.BOTTLE.IMAGES_SPLASH;
    splashing = false;

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.isThrowable = true;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        this.animate();
        IntervalHub.startInterval(() => {
            if (!this.hasHit) {
                this.x += 10;
            }
        }, 25);
    }


    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 300);
    }


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