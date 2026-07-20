import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 60;
    offset = {
            top: 10,
            right: 5,
            bottom: 10,
            left: 5,
        }
    IMAGES_WALKING = ImageHelper.CHICKEN.IMAGES_WALKING;
    IMAGES_DEAD = ImageHelper.CHICKEN.IMAGES_CHICKEN_DEAD;

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 600 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
animate() {
    IntervalHub.startInterval(() => {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }, 1000 / 60);

    IntervalHub.startInterval(() => {
        if (this.isDead()) {
            this.playAnimationDead(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 200);
}

}