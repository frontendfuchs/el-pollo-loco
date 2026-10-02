import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { ChickenBaby } from "../models/chicken.baby.class.js";
import { Bottle } from "../models/bottle.class.js";
import { Coin } from "../models/coin.class.js";

/** Number of adult chickens in level 1. */
const CHICKEN_AMOUNT = 6;

/** Number of baby chickens in level 1. */
const CHICKEN_BABY_AMOUNT = 3;

/** X-positions for clouds in level 1. */
const CLOUDS_POSITION = [200, 800, 600, 1600, 2400, 2700, 2900, 3000];

/** X-positions for bottles in level 1. */
const BOTTLES_X_POSITION = [40, 260, 340, 500, 620, 760, 920, 1080, 1240];

/** Y-position for all bottles in level 1. */
const BOTTLES_Y_POSITION = 380;

/**
 * Creates an array of enemy instances.
 * @param {number} amount - Number of enemies to create.
 * @param {Function} EnemyClass - The enemy class constructor (e.g. Chicken, ChickenBaby).
 * @returns {Array} Array of enemy instances.
 */
function createEnemies(amount, EnemyClass) {
    const enemies = [];

    for (let i = 0; i < amount; i++) {
        enemies.push(new EnemyClass());
    }
    return enemies;
}

/**
 * Creates an array of cloud instances at given X-positions.
 * @param {number[]} positions - Array of X-positions for the clouds.
 * @returns {Cloud[]} Array of Cloud instances.
 */
function createClouds(positions) {
    const clouds = [];

    for (let i = 0; i < positions.length; i++) {
        const x = positions[i];
        clouds.push(new Cloud(x));
    }
    return clouds;
}

/**
 * Creates an array of bottle instances at given positions.
 * @param {number[]} positions_x - Array of X-positions for the bottles.
 * @param {number} position_y - Y-position for all bottles.
 * @returns {Bottle[]} Array of Bottle instances.
 */
function createBottles(positions_x, position_y) {
    const bottles = [];

    for (let i = 0; i < positions_x.length; i++) {
        const x = positions_x[i];
        bottles.push(new Bottle(x, position_y));
    }
    return bottles;
}

/**
 * Level 1 definition with enemies, clouds, background objects, bottles, and coins.
 * @type {Level}
 */
export const level1 = new Level([

    ...createEnemies(CHICKEN_AMOUNT, Chicken),
    ...createEnemies(CHICKEN_BABY_AMOUNT, ChickenBaby),
    new Endboss(),
],

    [
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