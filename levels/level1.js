import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { ChickenBaby } from "../models/chicken.baby.class.js";
import { Bottle } from "../models/bottle.class.js";
import { Coin } from "../models/coin.class.js";

const CHICKEN_AMOUNT = 44;
const CHICKEN_BABY_AMOUNT = 18;
const CLOUDS_POSITION = [200,800,600,1600,2400,2700,2900,3000];
const BOTTLES_X_POSITION = [40, 260, 340, 500, 620, 760, 920, 1080, 1240];
const BOTTLES_Y_POSITION = 380;

function createEnemies(amount, EnemyClass) {
    const enemies = [];

    for (let i = 0; i < amount; i++) {
        enemies.push(new EnemyClass());
    }

    return enemies;
}


function createClouds(positions) {
    const clouds = [];

    for (let i = 0; i < positions.length; i++) {
        const x = positions[i];
        clouds.push(new Cloud(x));
    }

    return clouds;
}


function createBottles(positions_x, position_y) {
    const bottles = [];

    for (let i = 0; i < positions_x.length; i++) {
        const x = positions_x[i];
        bottles.push(new Bottle(x, position_y));
    }

    return bottles;
}


export const level1 = new Level([
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),

    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    // new ChickenBaby(),
    

    ...createEnemies(CHICKEN_AMOUNT, Chicken),
    ...createEnemies(CHICKEN_BABY_AMOUNT, ChickenBaby),
    new Endboss(),
],

    [

        // new Cloud(200),
        // new Cloud(800),
        // new Cloud(1600),
        // new Cloud(2400),

        ...createClouds(CLOUDS_POSITION)
    ],

    [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ],

    [
        // new Bottle(180, 380),
        // new Bottle(260, 380),
        // new Bottle(340, 380),
        // new Bottle(500, 380),
        // new Bottle(620, 380),
        // new Bottle(760, 380),
        // new Bottle(920, 380),
        // new Bottle(1080, 380),
        // new Bottle(1240, 380),

        ...createBottles(BOTTLES_X_POSITION, BOTTLES_Y_POSITION)
    ],

    [
        new Coin(250, 220),
        new Coin(320, 220),
        new Coin(390, 220),

        new Coin(520, 210),
        new Coin(560, 180),
        new Coin(600, 155),
        new Coin(640, 180),
        new Coin(680, 210),

        new Coin(850, 220),
        new Coin(920, 220),
        new Coin(990, 220),

        new Coin(1120, 205),
        new Coin(1160, 175),
        new Coin(1200, 145),
        new Coin(1240, 145),
        new Coin(1280, 175),
        new Coin(1320, 205),

        new Coin(1500, 220),
        new Coin(1570, 220),
        new Coin(1640, 220),
    ]
);