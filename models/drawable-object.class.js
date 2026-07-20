export class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    currentImageDead = 1;
    playAnimationDeadCount = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = "red";
        ctx.rect(this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom,);
        ctx.stroke();
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playAnimationDead(images) {
        let i = this.currentImageDead % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageDead++;
        if (i == 0) {
            this.currentImageDead = 1;
            this.playAnimationDeadCount++;
            return;
        }
    }


    checkGameStatus() {
        return this.playAnimationDeadCount == 3;
    }
}