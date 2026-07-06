import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height; //gesamtte Höhe Canvas 480 -höhe Bild 400
        this.x = x;

    }
}