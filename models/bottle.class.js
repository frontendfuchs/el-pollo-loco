import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Bottle extends DrawableObject {

    height = 60;
    width = 60;
    y = 380;
    offset = {
        top: 15,
        left: 20,
        right: 20,
        bottom: 15
    };
    IMAGES_BOTTLE = ImageHelper.BOTTLE.ON_GROUND;

    constructor(){
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = 200 + Math.random() * 1700;
    }
}