import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
character = new Character();
enemies = level1.enemies;
clouds =level1.clouds;
backgroundObjects = level1.backgroundObjects;

canvas;
keyboard;
ctx;
camera_x = 0;


constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
}

setWorld() {
    this.character.world = this;
}

//ganz am anfang wird das canavs gelöscht, elemente werden schnell mit diese methode hinzugefügt dass du nicht sehen kannst das es leer ist
//es wird schicht für schicht drüber gemalt
//hintegrundobjekt als erstes weil alle andere objekte drüber liegen als schichten 
    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);


        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1,1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }

    }
}