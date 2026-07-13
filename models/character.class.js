import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 10;
    IMAGES_WALKING = ImageHelper.CHARACTER.IMAGES_WALKING;
    IMAGES_JUMPING = ImageHelper.CHARACTER.IMAGES_JUMPING;
    IMAGES_DEAD = ImageHelper.CHARACTER.IMAGES_DEAD;
    speed = 5;

    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {

        // rightKey = this.world.keyboard.RIGHT;
        // leftKey = this.world.keyboard.LEFT;

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {

            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {


                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

}