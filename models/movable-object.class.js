import { DrawableObject } from "./drawable-object.class.js";

//wir haben eine Schablone erstellt wo wir sagen welche Felder dort drin sein sollen
export class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    hasDied = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 160;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    //character.iscollifding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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