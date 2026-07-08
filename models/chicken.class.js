import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 60;
    CHICKEN_WALK = ImageHelper.CHICKEN.CHICKEN_WALKING;
    

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.CHICKEN_WALK);

        this.x= 200 + Math.random() * 500;
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.CHICKEN_WALK.length; // let i = 7 % 6; => 1 , Rest 1, das mathematische rest 
            //i = 0,1,2,3,4,5,6,0,1 
            let path = this.CHICKEN_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }

}