import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class Endboss extends MovableObject {

    IMAGES_WALKING_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_WALKING;
    IMAGES_ALERT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ALERT;
    IMAGES_ATTACK_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ATTACK;
    IMAGES_HURT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_HURT;
    IMAGES_DEAD_ENDBOSS = ImageHelper.ENDBOSS.IMAGEAS_DEAD;
    height = 400;
    width = 250;
    y = 60;
    speed = 2;
    hasFirstContact = false;
    isAlert = false;
    isAttacking = false;
    endBossIsDead = false;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.x = 2500;
        this.animate();
    }


    animate() {

        IntervalHub.startInterval(() => {
            if (this.isDead() && !this.endBossIsDead) {
                this.playAnimationDead(this.IMAGES_DEAD_ENDBOSS);
                if (this.checkGameStatus()) {
                    this.endBossIsDead = true;
                    console.log("Game Win");
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_ENDBOSS);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK_ENDBOSS);
            } else if (this.hasFirstContact) {
                this.playAnimation(this.IMAGES_WALKING_ENDBOSS);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            }
        }, 200);


        IntervalHub.startInterval(() => {
            if (this.hasFirstContact && !this.isDead() && !this.isAttacking) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }
}