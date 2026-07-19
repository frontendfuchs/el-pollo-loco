import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ChickenBaby } from "./chicken.baby.class.js";
import { Cloud } from "./cloud.class.js";
import { StatusBar } from "./status-bar.class.js";
import { StatusBarCoins } from "./status-bar-coins.class.js";
import { StatusBarBottle } from "./status-bar-bottles.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { StatusBarEndBoss } from "./status-bar-endbossclass.js";
import { Endboss } from "./endboss.class.js";


export class World {
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottle = new StatusBarBottle();
  statusBarEndBoss = new StatusBarEndBoss();
  character = new Character();
  level = level1;

  collectedCoins = 0;
  allCoins = this.level.coin.length;

  collectedBottles = 0;
  allBottles = this.level.bottles.length;

  canvas;
  keyboard;
  ctx;
  camera_x = 0;
  throwableObjects = [];
  onGameOver;
  gameOver = false;

  constructor(canvas, keyboard, onGameOver) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.onGameOver = onGameOver;
    this.allCoins = this.level.coin.length;
    this.allBottles = this.level.bottles.length;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkJumpOnEnemy();
      this.checkEnemyAttack();
      this.checkThrowObjects();
      this.checkBottleHits();
      this.collectCoin();
      this.collectBottle();
      this.removeDeadEnemy();
      this.checkEndbossContact();
      this.checkGameOver();
    }, 50);
  }

  checkGameOver() {
        if (this.character.isDead() && !this.gameOver) {
            this.gameOver = true;

            if (this.onGameOver) {
                this.onGameOver();
            }
        }
    }


  checkEndbossContact() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        
        // 1. ALERT:
        if (this.character.x > 1500 && this.character.x <= 2100 && !enemy.hasFirstContact) {
          enemy.isAlert = true;
        }
        // 2. WALKING:
        if (this.character.x > 2100) { 
          enemy.isAlert = false;
          enemy.hasFirstContact = true;
        }
        // 3. ATTACK:
        if (this.character.isColliding(enemy)) {
          enemy.isAttacking = true;
        } else {
          enemy.isAttacking = false;
        }
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
        let bottle = new ThrowableObject();
        bottle.throw(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);

        this.collectedBottles--;
        this.updateBottleStatusBar();

        this.keyboard.D = false;
    }
}

  checkJumpOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        return;
      }

      const characterJump = this.character.y < 160;
      const characterPos = this.character.y + this.character.height;
      const enemyPos = enemy.y;

      if (
        !this.character.isDead() &&
        this.character.isColliding(enemy) &&
        (enemy instanceof ChickenBaby ||
          (characterJump && characterPos > enemyPos))
      ) {
        enemy.die();
        this.character.speedY = 15;
      }
    });
  }

  checkEnemyAttack() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        return;
      }

      if (
        !this.character.isDead() &&
        !this.character.isHurt() &&
        this.character.isColliding(enemy)
      ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
          
        if (!enemy.isDead() && !bottle.hasHit && bottle.isColliding(enemy)) {
            enemy.hit(); 
            if (enemy instanceof Endboss) {
                this.statusBarEndBoss.setPercentage(enemy.energy);
            } else {
                enemy.die(); 
            }
        }
      });
    });
  }

  removeDeadEnemy() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (!enemy.isDead()) {
        return true;
      }

      let timePassed = new Date().getTime() - enemy.deathTime;
      timePassed = timePassed / 1000;

      return timePassed < 0.7;
    });
  }

  collectCoin() {
    this.level.coin = this.level.coin.filter((coin) => {
      const collision = this.character.isColliding(coin);

      if (collision) {
        this.collectedCoins++;
        this.updateCoinStatusBar();
      }

      return !collision;
    });
  }

  updateCoinStatusBar() {
    const percentage = (this.collectedCoins / this.allCoins) * 100;
    this.statusBarCoins.setPercentage(percentage);
  }

  collectBottle() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      const collision = this.character.isColliding(bottle);

      if (collision) {
        this.collectedBottles++;
        this.updateBottleStatusBar();
      }

      return !collision;
    });
  }

  updateBottleStatusBar() {
    const percentage = (this.collectedBottles / this.allBottles) * 100;
    this.statusBarBottle.setPercentage(percentage);
  }

  //ganz am anfang wird das canavs gelöscht, elemente werden schnell mit diese methode hinzugefügt dass du nicht sehen kannst das es leer ist
  //es wird schicht für schicht drüber gemalt
  //hintegrundobjekt als erstes weil alle andere objekte drüber liegen als schichten
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    // ----- space for fixed objects ------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndBoss);

    //Draw() wird immer wieder aufgerufen
    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (
      mo instanceof Character ||
      mo instanceof Chicken ||
      mo instanceof ChickenBaby
    ) {
      mo.drawFrame(this.ctx);
    }

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
