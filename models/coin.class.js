import { MovableObject } from "./movable-object.class.js";

export class Coin extends MovableObject {
    height = 100;
    width = 100;
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };

    constructor(x, y) {
        super();
        this.loadImage('assets/img/8_coin/coin_2.png');
        this.x = x;
        this.y = y;
    }
}