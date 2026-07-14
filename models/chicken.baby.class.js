import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class ChickenBaby extends MovableObject {
    y = 390;
    height = 40;
    width = 40;
    offset = {
            top: 10,
            right: 5,
            bottom: 10,
            left: 5,
        }
    IMAGES_WALKING = ImageHelper.CHICKEN_BABY.IMAGES_WALKING;
    

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        
        this.x= 500 + Math.random() * 2700;
        this.speed = 0.40 + Math.random() * 0.45;
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
}

}