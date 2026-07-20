import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = ImageHelper.BOTTLE.IMAGES_ROTATION;

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
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
            this.x += 10;
        }, 25);
    }


    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 300);
    }


}