import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 160;
    IMAGES_WALK = ImageHelper.CHARACTER.IMAGES_WALKING;
    currentImage = 0;

    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALK);
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length; // let i = 7 % 6; => 1 , Rest 1, das mathematische rest 
            //i = 0,1,2,3,4,5,6,0,1 
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


    jump() {

    }
}