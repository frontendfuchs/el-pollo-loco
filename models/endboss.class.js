import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 2;
    hasFirstContact = false;
    isAlert = false;
    isAttacking = false;

    IMAGES_WALKING_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_WALKING;
    IMAGES_ALERT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ALERT;
    IMAGES_ATTACK_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_ATTACK;
    IMAGES_HURT_ENDBOSS = ImageHelper.ENDBOSS.IMAGES_HURT;
    IMAGES_DEAD_ENDBOSS = ImageHelper.ENDBOSS.IMAGEAS_DEAD;

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

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
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

        setInterval(() => {
            if (this.hasFirstContact && !this.isDead() && !this.isAttacking) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }


}