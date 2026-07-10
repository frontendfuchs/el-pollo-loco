import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;

    IMAGES_WALKING = ImageHelper.ENDBOSS.IMAGES_WALKING;

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING)
        this.x = 2500;
        this.animate();
    }

    animate(){
        setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
    }

}