

export class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    currentImageOnceAnimation = 1;

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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i = this.currentImageOnceAnimation % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageOnceAnimation++;
        if (i == 0){
            this.currentImageOnceAnimation = 0;
            return;
        }
    }

    gameOver() {
            return this.currentImageOnceAnimation == 0;

    }
}