import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 2; 
    hasFirstContact = false;

    IMAGES_WALKING_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_WALKING;

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING_ENDBOSS[0]);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.x = 2500;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.hasFirstContact) {
                this.playAnimation(this.IMAGES_WALKING_ENDBOSS);
            }
        }, 200);


        setInterval(() => {
            if (this.hasFirstContact) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }

}