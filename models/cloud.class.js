import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 200;

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 500;
        
    }
    

}