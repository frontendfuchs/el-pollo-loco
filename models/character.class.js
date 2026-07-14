import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 10;
    IMAGES_WALKING = ImageHelper.CHARACTER.IMAGES_WALKING;
    IMAGES_JUMPING = ImageHelper.CHARACTER.IMAGES_JUMPING;
    IMAGES_DEAD = ImageHelper.CHARACTER.IMAGES_DEAD;
    IMAGES_HURT = ImageHelper.CHARACTER.IMAGES_HURT;
    speed = 5;
    pepeIsDead = false;
    offset = {
        top: 110,
        right: 10,
        bottom: 10,
        left: 10,
    };
    rx;
    rY;
    rW;
    rH;


    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.getRealFrame();
    }

    //Das ist die funktion die das Bild austauscht
    animate() {

        // rightKey = this.world.keyboard.RIGHT;
        // leftKey = this.world.keyboard.LEFT;

        setInterval(() => {
            if (!this.isDead()) {

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
            }
        }, 1000 / 60);


        setInterval(() => {

            if (this.isDead() && !this.pepeIsDead) {
                this.playAnimationDead(this.IMAGES_DEAD);
                if (this.gameOver()) {
                    this.pepeIsDead = true;
                    console.log("Game Over");

                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (!this.isDead()) {


                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.img = this.imageCache[this.IMAGES_WALKING[5]];
                }
            }
        }, 50);
    }

}