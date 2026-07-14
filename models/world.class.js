import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ChickenBaby } from "./chicken.baby.class.js";
import { Cloud } from "./cloud.class.js";
import { StatusBar } from "./status-bar.class.js";

export class World {
    statusBar = new StatusBar();
    character = new Character();
    level = level1;

    canvas;
    keyboard;
    ctx;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
            })
        }, 200);
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