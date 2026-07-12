
import { DrawableObject } from "./drawable-object.class.js";

export class Coin extends DrawableObject {

    height = 100;
    width = 100;


    constructor(x,y){
        super();
        this.loadImage('assets/img/8_coin/coin_2.png');
        this.x = x;
        this.y = y;
        

    }
}