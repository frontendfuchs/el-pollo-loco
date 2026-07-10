import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 160;
    IMAGES_WALK = ImageHelper.CHARACTER.IMAGES_WALKING;
    speed = 5;

    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALK);
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {
        
        // rightKey = this.world.keyboard.RIGHT;
        // leftKey = this.world.keyboard.LEFT;
        
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if(this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x
        }, 1000 / 60);
        

        setInterval(() => {
            

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //WALK ANIMATION
                let i = this.currentImage % this.IMAGES_WALK.length; // let i = 7 % 6; => 1 , Rest 1, das mathematische rest 
                //i = 0,1,2,3,4,5,6,0,1 
                let path = this.IMAGES_WALK[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 60);
    }


    jump() {

    }
}