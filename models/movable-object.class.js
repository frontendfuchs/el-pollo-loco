//wir haben eine Schablone erstellt wo wir sagen welche Felder dort drin sein sollen
export class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementByID('image')
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    playAnimation(images){
        //WALK ANIMATION
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1 , Rest 1, das mathematische rest 
                //i = 0,1,2,3,4,5,6,0,1 
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}