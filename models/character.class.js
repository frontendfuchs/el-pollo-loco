import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{

    height = 280;
    width = 120;
    y = 160;

    constructor(){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
    }

    jump(){

    }
}