import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

//wir haben eine Schablone erstellt wo wir sagen welche Felder dort drin sein sollen
export class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    hasDied = false;
    deathTime = 0;
    isThrowable = false;


    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this.isThrowable) {
            return true;
        } else {
            return this.y < 160;
        }
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 21;
    }


    //character.iscollifding(chicken)
    isColliding(mo) {
        this.getRealFrame();
        mo.getRealFrame();
        return this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH;
    }


    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }


    //new Date().getTime() = so speichert man Zeit in Zahlenform
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    die() {
        if (this.hasDied) {
            return;
        }
        this.hasDied = true;
        this.energy = 0;
        this.speed = 0;
        this.deathTime = new Date().getTime();
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diff in ms
        timepassed = timepassed / 1000; //Diff in s
        return timepassed < 1;
    }


    isDead() {
        return this.energy <= 0;
    }
}