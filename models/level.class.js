export class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coin;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, bottles, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coin = coin;
    }
}