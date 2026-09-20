import { DrawableObject } from "./drawable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

export class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLES_STATUS = ImageHelper.STATUSBAR.IMAGES_BOTTLES;
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES_STATUS);
        this.x = 20;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES_STATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}