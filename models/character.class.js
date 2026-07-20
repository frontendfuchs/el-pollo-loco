import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class Character extends MovableObject {

    IMAGES_WALKING = ImageHelper.CHARACTER.IMAGES_WALKING;
    IMAGES_JUMPING = ImageHelper.CHARACTER.IMAGES_JUMPING;
    IMAGES_DEAD = ImageHelper.CHARACTER.IMAGES_DEAD;
    IMAGES_HURT = ImageHelper.CHARACTER.IMAGES_HURT;
    IMAGES_IDLE = ImageHelper.CHARACTER.IMAGES_IDLE;
    IMAGES_LONG_IDLE = ImageHelper.CHARACTER.IMAGES_LONG_IDLE;
    height = 280;
    width = 120;
    y = 50;
    speed = 5;
    pepeIsDead = false;
    lastMove = new Date().getTime();
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
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
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
        // 1. Intervall: BEWEGUNG
        IntervalHub.startInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {
                    this.lastMove = new Date().getTime();
                }
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


        // 2. Intervall: ANIMATIONEN (Walk, Jump, Hurt, Dead)
        IntervalHub.startInterval(() => {
            if (this.isDead() && !this.pepeIsDead) {
                this.playAnimationDead(this.IMAGES_DEAD);
                if (this.checkGameStatus()) {
                    this.pepeIsDead = true;
                    console.log("Game Over");
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (!this.isDead()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);


        // 3. Intervall: IDLE ANIMATIONEN
        IntervalHub.startInterval(() => {
            let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;

            if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !isMoving) {
                let timePassed = new Date().getTime() - this.lastMove;
                timePassed = timePassed / 1000;
                if (timePassed >= 5) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 200);
    }
}