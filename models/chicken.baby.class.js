import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class ChickenBaby extends MovableObject {
    y = 390;
    height = 40;
    width = 40;
    IMAGES_WALKING = ImageHelper.CHICKEN_BABY.IMAGES_WALKING;
    

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x= 400 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {
    this.moveLeft();

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
}

}