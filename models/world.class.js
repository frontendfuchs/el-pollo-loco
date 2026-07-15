import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ChickenBaby } from "./chicken.baby.class.js";
import { Cloud } from "./cloud.class.js";
import { StatusBar } from "./status-bar.class.js";
import { StatusBarCoins } from "./status-bar-coins.class.js";
import { StatusBarBottle } from "./status-bar-bottles.class.js";

export class World {

    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    character = new Character();
    level = level1;

    collectedCoins = 0;
    allCoins = this.level.coin.length;

    collectedBottles = 0;
    allBottles = this.level.bottles.length;


    canvas;
    keyboard;
    ctx;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.allCoins = this.level.coin.length;
        this.allBottles = this.level.bottles.length;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }



    setWorld() {
        this.character.world = this;
    }



    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (!this.character.isDead() && this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
            this.collectCoin();
            this.collectBottle();
        }, 200);
    }



    collectCoin() {
        this.level.coin = this.level.coin.filter((coin) => {
            const collision = this.character.isColliding(coin);

            if (collision) {
                this.collectedCoins++;
                this.updateCoinStatusBar();
            }

            return !collision;
        });
    }



    updateCoinStatusBar() {
        const percentage = (this.collectedCoins / this.allCoins) * 100;
        this.statusBarCoins.setPercentage(percentage);
    }

    collectBottle() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
        const collision = this.character.isColliding(bottle);

        if (collision) {
            this.collectedBottles++;
            this.updateBottleStatusBar();
        }

        return !collision;
    });
}

updateBottleStatusBar() {
    const percentage = (this.collectedBottles / this.allBottles) * 100;
    this.statusBarBottle.setPercentage(percentage);
}



    //ganz am anfang wird das canavs gelöscht, elemente werden schnell mit diese methode hinzugefügt dass du nicht sehen kannst das es leer ist
    //es wird schicht für schicht drüber gemalt
    //hintegrundobjekt als erstes weil alle andere objekte drüber liegen als schichten 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);


        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }



    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }



    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (
            mo instanceof Character ||
            mo instanceof Chicken ||
            mo instanceof ChickenBaby
        ) {
            mo.drawFrame(this.ctx);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }



    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }



    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}