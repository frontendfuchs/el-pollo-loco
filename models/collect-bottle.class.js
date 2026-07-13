import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class CollectBottle extends DrawableObject {

    height = 60;
    width = 60;
    y = 380;
    IMAGES_BOTTLE = ImageHelper.BOTTLE.ON_GROUND;

    constructor(){
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = 200 + Math.random() * 1700;
    }
}