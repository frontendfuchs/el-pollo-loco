import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { ChickenBaby } from "../models/chicken.baby.class.js";
import { Bottle } from "../models/bottle.class.js";
import { Coin } from "../models/coin.class.js";

export const level1 = new Level([
new Chicken(),
new Chicken(),
new Chicken(),
new Chicken(),
new Chicken(),
new Chicken(),


new ChickenBaby(),
new ChickenBaby(),
new ChickenBaby(),

new Endboss(),
],

[

new Cloud(200),
new Cloud(800),
new Cloud(1600),
new Cloud(2400)
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

new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),
new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3),
],

[
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
new Bottle(),
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