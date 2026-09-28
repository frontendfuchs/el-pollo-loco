import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/intervalhub-helper.js";

export class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 200;

    constructor(x) {
        super().loadImage("assets/img/5_background/layers/4_clouds/1.png");
        this.x = x;
        this.animate();
    }


    animate() {
        IntervalHub.startInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
