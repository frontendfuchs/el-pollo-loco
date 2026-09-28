import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class Bottle extends MovableObject {

    IMAGES_BOTTLE = ImageHelper.BOTTLE.ON_GROUND;
    height = 60;
    width = 60;
    offset = {
        top: 15,
        left: 20,
        right: 20,
        bottom: 15
    };

    constructor(x, y) {
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
    }
}