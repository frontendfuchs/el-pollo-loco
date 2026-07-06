//wir haben eine Schablone erstellt wo wir sagen welche Felder dort drin sein sollen
export class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;

// loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementByID('image')
        this.img.src = path; 
    }

     moveRight() {
        console.log('Moving right');
    }

    moveLeft(){

    }
}